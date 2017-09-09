import React, {Component} from 'react';

export default class Clear extends Component {

    constructor(props) {
        super(props);
        console.debug("Clear.constructor");
        this.worldClock = props.WorldClock;
    }

    componentDidMount() {
        console.debug("Clear.componentDidMount");
        this.worldClock.notify('clear_mounted');
    }

    render() {
        console.debug("Clear.render");
        return (<div />);
    }
}