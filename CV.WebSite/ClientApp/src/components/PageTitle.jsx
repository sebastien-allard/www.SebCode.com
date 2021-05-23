import React, { Component } from 'react';

export class PageTitle extends Component {
    static displayName = PageTitle.name;

    render() {
        return (
            <h1 className="my-5">{this.props.children}</h1>
        );
    }
}
