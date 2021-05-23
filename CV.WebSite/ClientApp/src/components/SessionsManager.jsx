import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import i18n from 'i18next';
import { Trans } from "react-i18next";
import { Session } from '../services/resumeApi';

export class SessionsManager extends Component {
    static displayName = SessionsManager.name;

    constructor(props) {
        super(props);

        const items = props.items || {};

        this.state = {
            items: items,
        };
    }

    handleInputChange = (event) => {
        const itemId = Number.parseInt(event.target.parentNode.parentNode.getAttribute("data-key"));
        var item = this.state.items.find(item => item.id === itemId);

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        switch (name) {
            case "order2":
                item.order = Number.parseInt(value);
                break;
            case "title2":
                item.title = value;
                break;
            case "description2":
                item.description = value;
                break;
            default:
        }

        this.props.onChange(event, this.props.items);
    }

    handleAddClick = (event) => {
        debugger;
        const newItem = new Session();
        newItem.id = this.state.items.length * -1;
        newItem.order = 0;
        newItem.description = "";
        newItem.title = "";

        const newItems = [newItem].concat(this.state.items);

        this.setState({
            items: newItems,
        });

        this.props.onChange(event, newItems);
    }

    handleDeleteClick = (event, itemId) => {
        const newItems = this.state.items.filter(item => item.id !== itemId);
        this.setState({
            items: newItems
        });

        this.props.onChange(event, newItems);
    }

    render() {
        return (
            <Card.Text as="div">
                <strong>{i18n.t("Sessions")} :</strong>
                <div className="d-flex justify-content-end">
                    <Button as="input" type="button" variant="primary" onClick={this.handleAddClick} value="Add"/>
                    {/*    <i className="bi-file-earmark-plus"></i>*/}
                    {/*</Button>*/}
                </div>

                <ul>
                    {
                        this.state.items.map((item) => (
                            <li className="mb-1" key={item.id} data-key={item.id}>
                                <Button as="input" type="button"  variant="danger" onClick={(event) => this.handleDeleteClick(event, item.id)} value="Delete"/>
                                {/*    <i className="bi-trash"></i>*/}
                                {/*</Button>*/}
                                <Form.Group>
                                    <Form.Label><Trans>Ordre</Trans> : </Form.Label>
                                    <Form.Control type="number" name="order2" value={item.order} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><Trans>Titre</Trans> : </Form.Label>
                                    <Form.Control type="text" name="title2" value={item.title} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><Trans>Description</Trans> : </Form.Label>
                                    <Form.Control as="textarea" name="description2" rows={3} value={item.description} onChange={this.handleInputChange} />
                                </Form.Group>
                            </li>
                        ))
                    }
                </ul>
            </Card.Text>
        );
    }
}
