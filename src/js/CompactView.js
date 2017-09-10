import React, {Component} from 'react';
import CompactElement from './CompactElement';

export default class CompactView extends Component {

    constructor(props) {
        super(props);
        this.worldClock = props.WorldClock;
        this.state = {clocks: this.worldClock.state.clocks};
        this.timer = null;
    }

    componentDidMount() {
        clearInterval(this.timer);
        this.timer = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.worldClock.notify('clock_tick');
    }

    render () {
        let cols = [];
        let first = true;
        for(let clock of this.state.clocks) {
            let cl = "compact-col " + (first ? "col-lg-12 col-md-12 col-sm-12 col-xs-12" : "col-lg-6 col-md-6 col-sm-12 col-xs-12");
            cols.push(
                <CompactElement
                    city={clock.city}
                    className={cl}
                    radius={clock.radius}
                    noseconds={clock.noseconds}
                    gmtOffset={clock.gmtOffset}
                    WorldClock={this.worldClock}/>
            );
            first = false;
        }
        return (
            <div className={"row wc-view text-center"} >
                {cols}
            </div>
        );
    }
}