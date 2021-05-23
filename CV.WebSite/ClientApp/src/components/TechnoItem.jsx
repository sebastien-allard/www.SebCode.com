import React, { Component } from 'react';

export class TechnoItem extends Component {
    static displayName = TechnoItem.name;

    render() {
        if (this.props.technology === undefined || this.props.technology.children === undefined)
            return;

        return (
            <ul>
                {
                    this.props.technology.children.map((subItem, index) => (
                        <li key={index}>
                            
                            {
                                subItem.children === undefined
                                    ? (subItem.title)
                                    : (
                                        <span>
                                            <div>{subItem.title} <span className="text-muted">{subItem.subtitle}</span></div>
                                            <TechnoItem key={subItem.id} technology={subItem} />
                                        </span>
                                    )
                            }
                        </li>
                    ))
                }
            </ul>
        );
    }
}
