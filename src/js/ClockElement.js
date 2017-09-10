import React from 'react';
import Observer from "./Observer";
import FloatingButtonGroup from "./FloatingButtonGroup";

export default class ClockElement extends Observer {

    static Skins = [
        "swissRail",
        "chunkySwiss",
        "fancy",
        "machine",
        "classic",
        "modern",
        "simple",
        "securephp",
        "Tes2",
        "Lev",
        "Sand",
        "Sun",
        "Tor",
        "Cold",
        "Babosa",
        "Tumb",
        "Stone",
        "Disc"
    ];

    constructor(props) {
        super(props);
        this.worldClock = props.WorldClock;
        this.state = props;
        this.worldClock.subscribe(this, 'wc_mount');
    }

    componentDidMount() {
        console.debug("ClockElement.componentDidMount");
    }

    onMessage(event, message) {
        console.debug("ClockElement.onMessage");
    }

    render() {
        const options = this.props.skin + ":" + this.props.radius + ":" + this.props.noseconds + ":"
            + this.props.gmtOffset;

        return (
            <div>
                <FloatingButtonGroup WorldClock={this.worldClock} />
                <canvas
                    width='30%'
                    height='auto'
                    className={`CoolClock:${options} clock-element`} />
                <div>
                    <span>{this.props.city}</span>
                </div>
            </div>
        );
    }
}