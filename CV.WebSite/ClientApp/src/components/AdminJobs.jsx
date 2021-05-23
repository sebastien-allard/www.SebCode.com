import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from '../services/authProvider';
import { Trans, Translation } from "react-i18next";
import { getCurrentLanguage } from '../i18n';
import Loading from './Loading';
import { PageTitle } from './PageTitle';
import { JobItem } from './JobItem';
import { JobItemEdit } from './JobItemEdit';
import Resume from '../data/Resume';
import CachedClient from '../services/CachedClient';
import { Job } from '../services/resumeApi';

export default class AdminJobs extends Component {
    static displayName = AdminJobs.name;
    static cacheKey = CachedClient.jobsCacheKey;

    constructor(props) {
        super(props);
        var cache = sessionStorage.getItem(AdminJobs.cacheKey);
        this.state = {
            error: null,
            isLoaded: cache !== null,
            jobs: cache ? JSON.parse(cache) : /*/ Resume[getCurrentLanguage()].jobs /*/ [] //*/
            , show: false,
            jobItemEdit: null
        };
    }

    handleAddClick = (event) => {
        const newJob = new Job();
        newJob.id = 0;
        newJob.achievements = [];
        newJob.company = "";
        newJob.description = "";
        newJob.endDate = "";
        newJob.startDate = "";
        newJob.technologies = "";
        newJob.title = "";

        this.setState({
            /*jobs: [new Job()].concat(this.state.jobs),*/
            jobItemEdit: newJob,
            show: true
        });
    }

    handleClose = (event) => {
        this.setState({
            show: false
        });
    }

    handleSaveClick = (event) => {
        const newJob = this.state.jobItemEdit;
        console.log(newJob);
        const client = new CachedClient();
        client.saveJob(newJob).then(
            (result) => {
                console.log(result);
                this.setState({
                    show: false,
                    isLoaded: false
                });

                this.getJobs();
            },
            (error) => {
                this.setState({
                    error
                });
            });
    }

    handleEditClick = (itemId) => {
        const client = new CachedClient();
        client.getJob(itemId).then(
            (result) => {
                console.log(result);
                this.setState({
                    jobItemEdit: result,
                    show: true,
                    isLoaded: false
                });

                this.getJobs();
            },
            (error) => {
                this.setState({
                    error
                });
            });
    }

    handleDeleteClick = (itemId) => {
        const client = new CachedClient();
        client.deleteJob(itemId).then(
            (result) => {
                console.log(result);
                this.setState({
                    show: false,
                    isLoaded: false
                });

                this.getJobs();
            },
            (error) => {
                this.setState({
                    error
                });
            });
    }

    handleEditorChange = (event, job) => {
        console.log(event);
        console.log(job);


        this.setState({
            jobItemEdit: job,
        });
    }

    getJobs = () => {
        const client = new CachedClient();
        client.getJobs()
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        jobs: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            this.getJobs();
        }
    }

    render() {
        return (
            <AzureAD provider={authProvider} forceLogin={true}>
                <div>
                    <Translation>
                        {
                            t =>
                                <Helmet>
                                    <title>{t('Expérience professionnelle')}</title>
                                </Helmet>
                        }
                    </Translation>

                    <PageTitle><Trans>Expérience professionnelle</Trans></PageTitle>

                    <SwitchTransition mode="out-in">
                        <CSSTransition key={this.state.isLoaded} timeout={300} classNames="page">
                            {
                                this.state.isLoaded ?
                                    (
                                        <div>
                                            <div className="d-flex justify-content-end">
                                                <Button variant="primary" onClick={this.handleAddClick}>
                                                    <i className="bi-file-earmark-plus"></i>
                                                </Button>
                                            </div>

                                            {this.state.jobs.map((item) => (
                                                <div key={item.id}>
                                                    <Button variant="primary" onClick={() => this.handleEditClick(item.id)}>
                                                        <i className="bi-pen"></i>
                                                    </Button>
                                                    <Button variant="danger" onClick={() => this.handleDeleteClick(item.id)}>
                                                        <i className="bi-trash"></i>
                                                    </Button>
                                                    <JobItem item={item} />
                                                </div>
                                            ))}

                                            <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" size="lg" keyboard={false}>
                                                <Modal.Header>
                                                    <Modal.Title>
                                                        {this.state.jobItemEdit && this.state.jobItemEdit.id === 0
                                                            ? (<Trans>Nouvelle expérience</Trans>)
                                                            : (<Trans>Modifier une expérience</Trans>)}
                                                        </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <JobItemEdit key={this.state.jobItemEdit ? this.state.jobItemEdit.id : 0} item={this.state.jobItemEdit} onChange={this.handleEditorChange} />
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="primary" onClick={this.handleSaveClick}>Save</Button>
                                                    <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    )
                                    : <Loading />
                            }
                        </CSSTransition>
                    </SwitchTransition>

                </div>
            </AzureAD>
        );
    }
}
