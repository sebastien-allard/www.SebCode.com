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
import { TrainingItem } from './TrainingItem';
import { TrainingItemEdit } from './TrainingItemEdit';
import Resume from '../data/Resume';
import CachedClient from '../services/CachedClient';
import { Training } from '../services/resumeApi';

export default class AdminTrainings extends Component {
    static displayName = AdminTrainings.name;
    static cacheKey = CachedClient.trainingsCacheKey;

    constructor(props) {
        super(props);
        var cache = sessionStorage.getItem(AdminTrainings.cacheKey);
        this.state = {
            error: null,
            isLoaded: cache !== null,
            trainings: cache ? JSON.parse(cache) : /*/ Resume[getCurrentLanguage()].jobs /*/ [] //*/
            , show: false,
            trainingItemEdit: null
        };
    }

    handleAddClick = (event) => {
        const newItem = new Training();
        newItem.id = 0;
        newItem.sessions = [];
        newItem.description = "";
        newItem.endDate = "";
        newItem.finalMark = "";
        newItem.institution = "";
        newItem.startDate = "";
        newItem.title = "";

        this.setState({
            trainingItemEdit: newItem,
            show: true
        });
    }

    handleClose = (event) => {
        this.setState({
            show: false
        });
    }

    handleSaveClick = (event) => {
        const editedItem = this.state.trainingItemEdit;
        console.log(editedItem);
        const client = new CachedClient();
        client.saveTraining(editedItem).then(
            (result) => {
                console.log(result);
                this.setState({
                    show: false,
                    isLoaded: false
                });

                this.getTrainings();
            },
            (error) => {
                this.setState({
                    error
                });
            });
    }

    handleEditClick = (itemId) => {
        const client = new CachedClient();
        client.getTraining(itemId).then(
            (result) => {
                console.log(result);
                this.setState({
                    trainingItemEdit: result,
                    show: true,
                    isLoaded: false
                });

                this.getTrainings();
            },
            (error) => {
                this.setState({
                    error
                });
            });
    }

    handleDeleteClick = (itemId) => {
        const client = new CachedClient();
        client.deleteTraining(itemId).then(
            (result) => {
                console.log(result);
                this.setState({
                    show: false,
                    isLoaded: false
                });

                this.getTrainings();
            },
            (error) => {
                this.setState({
                    error
                });
            });
    }

    handleEditorChange = (event, training) => {
        console.log(event);
        console.log(training);


        this.setState({
            trainingItemEdit: training,
        });
    }

    getTrainings = () => {
        const client = new CachedClient();
        client.getTrainings()
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        trainings: result
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
            this.getTrainings();
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
                                    <title>{t('Formation')}</title>
                                </Helmet>
                        }
                    </Translation>

                    <PageTitle><Trans>Formation</Trans></PageTitle>

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

                                            {this.state.trainings.map((item) => (
                                                <div key={item.id}>
                                                    <Button variant="primary" onClick={() => this.handleEditClick(item.id)}>
                                                        <i className="bi-pen"></i>
                                                    </Button>
                                                    <Button variant="danger" onClick={() => this.handleDeleteClick(item.id)}>
                                                        <i className="bi-trash"></i>
                                                    </Button>
                                                    <TrainingItem item={item} />
                                                </div>
                                            ))}

                                            <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" size="lg" keyboard={false}>
                                                <Modal.Header>
                                                    <Modal.Title>
                                                        {this.state.trainingItemEdit && this.state.trainingItemEdit.id === 0
                                                            ? (<Trans>Nouvelle expérience</Trans>)
                                                            : (<Trans>Modifier une expérience</Trans>)}
                                                        </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <TrainingItemEdit key={this.state.trainingItemEdit ? this.state.trainingItemEdit.id : 0} item={this.state.trainingItemEdit} onChange={this.handleEditorChange} />
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
