import React from 'react';
import ReactDom from "react-dom";
import Observer from "./Observer";

export default class ClockElement extends Observer {

    componentDidMount() {
        console.debug("ClockElement.componentDidMount");
        this.props.WorldClock.subscribe(this, 'wc-mount');
    }

    onMessage(message) {
        console.debug("ClockElement.notify");
        const element = ReactDom.findDOMNode(this);

    }

    render() {
        const options = this.props.skin;

        return (
            <canvas
                width='30%'
                height='auto'
                className={`CoolClock:${options} clock-element`} />
        );
    }
}