import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Trans } from "react-i18next";
import { JobClient, Job } from "../services/resumeApi";
import { AchievementsManager } from './AchievementsManager';

export class JobItemEdit extends Component {
    static displayName = JobItemEdit.name;

    constructor(props) {
        super(props);

        const item = props.item || {};

        this.state = {
            item: item,
            id: item.id,
            startDate: item.startDate,
            endDate: item.endDate,
            company: item.company,
            title: item.title,
            description: item.description,
            technologies: item.technologies,
            achievements: item.achievements,
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
        var job = Job.fromJS(obj);

        job.id = Number.parseInt(job.id);
        job.achievements = this.state.item.achievements;

        this.props.onChange(event, job);
    }

    handleAchievementsChange = (event, achievements) => {
        var formData = new FormData(event.target.form);
        var obj = Object.fromEntries(formData);
        var job = Job.fromJS(obj);

        job.id = Number.parseInt(job.id);
        job.achievements = achievements;

        this.props.onChange(event, job);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var client = new JobClient();
        var formData = new FormData(event.target);
        var obj = Object.fromEntries(formData);
        var job = Job.fromJS(obj);

        job.id = Number.parseInt(job.id);

        client.put(job.id, job)
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
                        <Form.Label><Trans>Compagnie</Trans> : </Form.Label>
                        <Form.Control type="text" name="company" value={this.state.company} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-2 text-muted">
                        <Form.Label><Trans>Poste</Trans> : </Form.Label>
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
                        <Form.Label><Trans>Technologies</Trans> : </Form.Label>
                        <Form.Control as="textarea" rows={3} name="technologies" value={this.state.technologies} onChange={this.handleInputChange} />
                    </Form.Group>
                    <AchievementsManager items={this.state.achievements} onChange={this.handleAchievementsChange} />

                </div>
            </Form>
        );
    }
}
