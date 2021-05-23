import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Loading(props) {
    const containerStyle = props && props.height
        ? { opacity: "0.5", height: props.height }
        : { opacity: "0.5" };

    return (
        <CSSTransition key="loading" timeout={300} in={true} classNames="page">
            <div className='vertical-center' style={containerStyle}>
                <div className='text-center' style={{ width: "100%" }}>
                    <div className='spinner-grow spinner-grow-sm d-inline-block' />
                    <div className='spinner-grow spinner-grow-sm d-inline-block' />
                    <div className='spinner-grow spinner-grow-sm d-inline-block' />
                </div>
            </div>
        </CSSTransition>
    );
}