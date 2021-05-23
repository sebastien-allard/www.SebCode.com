import React, { Component } from 'react';
import { AzureAD } from 'react-aad-msal';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Trans, Translation } from "react-i18next";
import SortableTree, { addNodeUnderParent, changeNodeAtPath, removeNodeAtPath, walk } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { authProvider } from '../services/authProvider';
import CachedClient from '../services/CachedClient';
import { TechnologyClient } from '../services/resumeApi';
import './AdminTechnologies.css';
import Loading from './Loading';
import { PageTitle } from './PageTitle';

/**
 * React Sortable Tree Documentation:
 * https://react-sortable-tree.surge.sh/
 * https://github.com/frontend-collective/react-sortable-tree
 * */

export default class AdminTechnologies extends Component {
    static displayName = AdminTechnologies.name;
    static cacheKey = CachedClient.jobsCacheKey;
    static getNodeKey = ({ node }) => node.id;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            technologies: []
        };
    }

    expandNodesInternal(node) {
        node.expanded = true;
        if (node.children) {
            node.children.map(x => this.expandNodesInternal(x));
        }
    }

    expandNodes() {
        this.state.technologies.map(x => this.expandNodesInternal(x));
    }

    saveNodeOrderInternal(node, index) {
        node.order = index;
        if (node.children) {
            node.children.map((x, i) => this.saveNodeOrderInternal(x, i));
        }
    }

    saveNodesOrder() {
        this.state.technologies.map((x, i) => this.saveNodeOrderInternal(x, i));
    }

    handleTitleChange(event, node, path) {
        const title = event.target.value;

        this.setState(state => ({
            technologies: changeNodeAtPath({
                treeData: state.technologies,
                path,
                getNodeKey: AdminTechnologies.getNodeKey,
                newNode: { ...node, title },
            }),
        }));
    }

    handleSubtitleChange(event, node, path) {
        const subtitle = event.target.value;

        this.setState(state => ({
            technologies: changeNodeAtPath({
                treeData: state.technologies,
                path,
                getNodeKey: AdminTechnologies.getNodeKey,
                newNode: { ...node, subtitle },
            }),
        }));
    }

    getNodeOrder(node) {
        let nodeIndex = 0;
        let rootNodeCount = 0;
        var result = 0;

        walk({
            treeData: this.state.technologies,
            getNodeKey: AdminTechnologies.getNodeKey,
            callback: (nodeInfo) => {
                if (!nodeInfo.parentNode) {
                    nodeIndex = rootNodeCount;
                    rootNodeCount++;
                }
                else {
                    nodeIndex =
                        nodeInfo.parentNode.children.length -
                        nodeInfo.lowerSiblingCounts[nodeInfo.lowerSiblingCounts.length - 1];
                }

                if (node.id === nodeInfo.node.id) {
                    result = nodeIndex;
                    console.log("--- ORDER: NODE INFO ---");
                    console.log(nodeInfo);
                }
            },
        });

        return result;
    }

    save(node, path) {
        console.log("--- SAVING ---");
        node.order = this.getNodeOrder(node);
        console.log(node);
        console.log(path);
        //this.saveNodesOrder();
        const client = new TechnologyClient();
        client.put(node)
            .then(
                (result) => {
                    this.setState(state => ({
                        technologies: changeNodeAtPath({
                            treeData: state.technologies,
                            path,
                            getNodeKey: AdminTechnologies.getNodeKey,
                            newNode: node,
                        }),
                    }));
                },
                (error) => {
                    console.error(error);
                    this.setState({
                        error
                    });
                }
            );
    }

    handleTitleBlur(event, node, path) {
        const title = event.target.value;
        const parentId = path[path.length - 2];
        var newNode = { ...node, title, parentId };
        this.save(newNode, path);
    }

    handleSubtitleBlur(event, node, path) {
        const subtitle = event.target.value;
        const parentId = path[path.length - 2];
        var newNode = { ...node, subtitle, parentId };
        this.save(newNode, path);
    }

    handleMoveNode = (moveEvent) => {
        console.log("--- MOVING ---");
        console.log(moveEvent);
        const parentId = moveEvent.nextPath[moveEvent.nextPath.length - 2];
        const order = moveEvent.nextTreeIndex;
        const node = moveEvent.node;
        const path = moveEvent.path;
        var newNode = { ...node, order, parentId };
        this.save(newNode, path);
    }

    handleAddNode(path) {
        var newNode = {
            title: "",
            id: 0,
            parentId: path[path.length - 1]
        }

        const client = new TechnologyClient();
        client.post(newNode)
            .then(
                (result) => {
                    newNode.id = result;
                    this.setState(state => ({
                        technologies: addNodeUnderParent({
                            treeData: state.technologies,
                            parentKey: newNode.parentId,
                            expandParent: true,
                            getNodeKey: AdminTechnologies.getNodeKey,
                            newNode: newNode,
                            addAsFirstChild: false,
                        }).treeData,
                    }))
                },
                (error) => {
                    console.error(error);
                    this.setState({
                        error
                    });
                }
            );
    }

    handleDeleteNode(node, path) {
        const client = new TechnologyClient();
        client.delete(node.id)
            .then(
                (result) => {
                    this.setState(state => ({
                        technologies: removeNodeAtPath({
                            treeData: state.technologies,
                            path,
                            getNodeKey: AdminTechnologies.getNodeKey,
                        }),
                    }))
                },
                (error) => {
                    console.error(error);
                    this.setState({
                        error
                    });
                }
            );
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            const client = new TechnologyClient();
            client.get()
                .then(
                    (result) => {
                        result.map(x => this.expandNodesInternal(x));
                        this.setState({
                            isLoaded: true,
                            technologies: result
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
    }

    render() {
        const treeHeight = "1000px";
        const getNodeKey = AdminTechnologies.getNodeKey;
        return (
            <AzureAD provider={authProvider} forceLogin={true}>
                <div>
                    <Translation>
                        {
                            t =>
                                <Helmet>
                                    <title>{t('Technologies')}</title>
                                </Helmet>
                        }
                    </Translation>

                    <PageTitle><Trans>Technologies</Trans></PageTitle>

                    <SwitchTransition mode="out-in">
                        <CSSTransition key={this.state.isLoaded} timeout={300} classNames="page">
                            {
                                this.state.isLoaded ?
                                    (
                                        <div className="mb-1" style={{ height: treeHeight }}>
                                            <SortableTree
                                                rowHeight={80}
                                                maxDepth={3}
                                                treeData={this.state.technologies}
                                                onChange={technologies => this.setState({ technologies })}
                                                onMoveNode={this.handleMoveNode}
                                                getNodeKey={getNodeKey}
                                                generateNodeProps={({ node, path }) => ({
                                                    title: (
                                                        <input
                                                            style={{ fontSize: '1.1rem', border: 'none' }}
                                                            value={node.title}
                                                            onChange={event => this.handleTitleChange(event, node, path)}
                                                            onBlur={event => this.handleTitleBlur(event, node, path)}
                                                        />
                                                    ),
                                                    subtitle: (
                                                        <input
                                                            style={{ fontSize: '1.1rem', border: 'none' }}
                                                            value={node.subtitle ? node.subtitle : ""}
                                                            onChange={event => this.handleSubtitleChange(event, node, path)}
                                                            onBlur={event => this.handleSubtitleBlur(event, node, path)}
                                                        />
                                                    ),
                                                    buttons: [
                                                        <Button variant="outline-secondary" className="mr-1"
                                                            onClick={() => this.handleAddNode(path)} >
                                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <title><Trans>Ajouter</Trans></title>
                                                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                            </svg>
                                                        </Button>,
                                                        <Button variant="outline-danger"
                                                            onClick={() => this.handleDeleteNode(node, path)}>
                                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <title><Trans>Effacer</Trans></title>
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </Button>,
                                                    ],
                                                })}
                                            />
                                        </div>
                                    )
                                    : <Loading height={treeHeight} />
                            }
                        </CSSTransition>
                    </SwitchTransition>
                </div>
            </AzureAD>
        );
    }
}
