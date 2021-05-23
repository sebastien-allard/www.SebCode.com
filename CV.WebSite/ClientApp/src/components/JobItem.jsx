import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import i18n from 'i18next';

export class JobItem extends Component {
    static displayName = JobItem.name;

    renderTechnologies(technologies) {
        if (technologies !== "")
            return (
                <Card.Text as="div">
                    <strong>{i18n.t("Technologies")} :</strong>
                    <p>{technologies}</p>
                </Card.Text>
            );
        return "";
    }

    renderAchievements(achievements) {
        if (achievements && achievements.length !== 0)
            return (
                <Card.Text as="div">
                    <strong>{i18n.t("Réalisations")} :</strong>
                    <ul>
                        {
                            achievements.map((item) => (
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
                    <Card.Title>{this.props.item.company}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.item.title}</Card.Subtitle>
                    <Card.Text>
                        {this.props.item.description}
                    </Card.Text>
                    {this.renderTechnologies(this.props.item.technologies)}
                    {this.renderAchievements(this.props.item.achievements)}

                </Card.Body>
            </Card>
        );
    }
}
