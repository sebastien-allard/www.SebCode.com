import React, { Component } from 'react';

export class LogoImg extends Component {
    static displayName = LogoImg.name;

    render() {
        return (
            <img src="/img/logos/logo.svg" loading="lazy" height="63" width="120" alt="Les lettres S et A"
                onError={() => { this.onerror = null; this.src = '/img/logos/logo-1200x627.png' }} />

        );
    }
}
