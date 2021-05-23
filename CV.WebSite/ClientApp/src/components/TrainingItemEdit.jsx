import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Trans } from "react-i18next";
import { TrainingClient, Training } from "../services/resumeApi";
import { SessionsManager } from './SessionsManager';

export class TrainingItemEdit extends Component {
    static displayName = TrainingItemEdit.name;

    constructor(props) {
        super(props);

        const item = props.item || {};

        this.state = {
            item: item,
            id: item.id,
            description: item.description,
            endDate: item.endDate,
            finalMark: item.finalMark,
            institution: item.institution,
            startDate: item.startDate,
            title: item.title,
            sessions: item.sessions,
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        //this.validateInput(target, false);
        //this.validateForm();

        var formData = new FormData(event.target.form);
        var obj = Object.fromEntries(formData);
        var training = Training.fromJS(obj);

        training.id = Number.parseInt(training.id);
        training.sessions = this.state.item.sessions;

        this.props.onChange(event, training);
    }

    handleSessionsChange = (event, sessions) => {
        var formData = new FormData(event.target.form);
        var obj = Object.fromEntries(formData);
        var training = Training.fromJS(obj);

        training.id = Number.parseInt(training.id);
        training.sessions = sessions;

        this.props.onChange(event, training);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var client = new TrainingClient();
        var formData = new FormData(event.target);
        var obj = Object.fromEntries(formData);
        var training = Training.fromJS(obj);

        training.id = Number.parseInt(training.id);

        client.put(training.id, training)
            .then(response => response)
            .then(
                (result) => {
                    debugger;
                },
                (error) => {
                    debugger;
                }
            )
            .catch((error) => {
                debugger;
            });
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="mb-5">
                <div>
                    <Form.Control type="hidden" name="id" value={this.state.id} />
                    <Form.Group>
                        <Form.Label><Trans>Institution</Trans> : </Form.Label>
                        <Form.Control type="text" name="institution" value={this.state.institution} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-2 text-muted">
                        <Form.Label><Trans>Titre</Trans> : </Form.Label>
                        <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><Trans>Date de début</Trans> : </Form.Label>
                        <Form.Control type="text" id="startDate" name="startDate" value={this.state.startDate} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><Trans>Date de fin</Trans> : </Form.Label>
                        <Form.Control type="text" name="endDate" value={this.state.endDate} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><Trans>Description</Trans> : </Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={this.state.description} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group as="div">
                        <Form.Label><Trans>Note finale</Trans> : </Form.Label>
                        <Form.Control type="text" name="finalMark" value={this.state.finalMark} onChange={this.handleInputChange} />
                    </Form.Group>
                    <SessionsManager items={this.state.sessions} onChange={this.handleSessionsChange} />

                </div>
            </Form>
        );
    }
}
