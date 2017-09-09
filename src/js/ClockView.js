import React, {Component} from 'react';
import ClockElement from "./ClockElement";
const CoolClock = window.CoolClock;

export default class ClockView extends Component {

    constructor(props) {
        super(props);
        this.worldClock = props.WorldClock;
    }

    componentDidMount() {
        CoolClock.findAndCreateClocks();
    }

    render() {
        return (
            <div className={"row wc-view"} >
                <div className={"col-md-4 text-center"}>
                    <ClockElement
                        WorldClock={this.worldClock}
                        skin='swissRail' />
                </div>
                <div className={"col-md-4 text-center"}>
                    <ClockElement
                        WorldClock={this.worldClock}
                        skin='swissRail' />
                </div>
                <div className={"col-md-4 text-center"}>
                    <ClockElement
                        WorldClock={this.worldClock}
                        skin='swissRail' />
                </div>
            </div>
        );
    }
}