import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { TechnoItem } from './TechnoItem';

export class TechnoRootItem extends Component {
    static displayName = TechnoRootItem.name;

    render() {

        return (
            <Card>
                <Card.Header>
                    {this.props.technology.title}
                </Card.Header>
                <Card.Body>
                    <Card.Text as="div">
                        <TechnoItem key={this.props.technology.id} technology={this.props.technology} />
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
