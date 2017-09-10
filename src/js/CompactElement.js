import React from 'react';
import Observer from "./Observer";

export default class CompactElement extends Observer {

    constructor(props) {
        super(props);
        this.worldClock = props.WorldClock;
        this.state = props;
        this.worldClock.subscribe(this, 'wc_mount');
        this.worldClock.subscribe(this, 'clock_tick');
    }

    onMessage(event, message) {
        console.debug(event);
        console.log(this.props.gmtOffset);
        let d = new Date();
        let utc = d.getTime() - (d.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        let nd = new Date(utc + (3600000*this.props.gmtOffset));
        let options = {
            timeZone: 'Europe/London',
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
        };
        let formatter = new Intl.DateTimeFormat([], options)
        console.log(formatter.format(nd));
    }

    calcTime(offset) {
        // create Date object for current location
        let d = new Date();

        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        let utc = d.getTime() - (d.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        let nd = new Date(utc + (3600000*offset));

        // return time as a string
        return "The local time for city"+ city +" is "+ nd.toLocaleString();
    }

    render() {
        return (
            <div className={this.props.className} >
                <div className={"flag-icon flag-icon-us"} />
                <div className={"compact-col-city"}>{this.props.city}</div>
            </div>
        );
    }
}