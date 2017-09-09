import React, {Component} from 'react';
import ClockElement from "./ClockElement";
import Observer from "./Observer";
const CoolClock = window.CoolClock;

export default class ClockView extends Observer {

    constructor(props) {
        super(props);
        this.worldClock = props.WorldClock;
        this.state = {clocks: this.worldClock.state.clocks};
        this.worldClock.subscribe(this, 'city_added');
    }

    onMessage(event, message) {
        console.debug("ClockView.onMessage", message);
        switch(event) {
            case 'city_added':
                this.setState({clocks: message});
                break;
        }
    }

    componentDidMount() {
        console.debug("ClockView.componentDidMount");
        CoolClock.findAndCreateClocks();
    }

    render() {
        let clocks = [];
        for(let clock of this.state.clocks){
            clocks.push(
                <div className={"clock-container text-center"}>
                    <ClockElement
                        WorldClock={this.worldClock}
                        radius={clock.radius}
                        noseconds={clock.noseconds}
                        gmtOffset={clock.gmtOffset}
                        city={clock.city}
                        skin={clock.skin} />
                </div>
            );
        }
        return (
            <div className={"row wc-view text-center"} >
                {clocks}
            </div>
        );
    }
}