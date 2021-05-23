import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import i18n from 'i18next';

export class TrainingItem extends Component {
    static displayName = TrainingItem.name;

    renderFinalMark(mark) {
        if (mark !== "")
            return (
                <Card.Footer className="text-right">
                    {i18n.t("Résultat obtenu")} : <strong>{mark}</strong>
                </Card.Footer>
            );
        return "";
    }

    renderSessions(sessions) {
        if (sessions && sessions.length !== 0)
            return (
                <Card.Text as="div">
                    <strong>{i18n.t("Sessions")} :</strong>
                    <ul>
                        {
                            sessions.map((item) => (
                                <li className="mb-1" key={item.id}>
                                    <em>
                                        {item.title}
                                    </em>
                                    <br />
                                    {item.description}
                                </li>
                            ))
                        }
                    </ul>
                </Card.Text>
            );
        return "";
    }

    render() {
        return (
            <Card className="mb-5">
                <Card.Header>
                    {this.props.item.startDate}
                    {this.props.item.endDate !== "" ? " – " : ""}
                    {this.props.item.endDate}
                </Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.item.institution}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.item.title}</Card.Subtitle>
                    <Card.Text>
                        {this.props.item.description}
                    </Card.Text>
                    {this.renderSessions(this.props.item.sessions)}
                </Card.Body>
                {this.renderFinalMark(this.props.item.finalMark)}
            </Card>
        );
    }
}
