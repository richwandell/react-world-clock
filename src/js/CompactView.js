import React, {Component} from 'react';

export default class CompactView extends Component {

    constructor(props) {
        super(props);
        this.worldClock = props.WorldClock;
        this.state = {clocks: this.worldClock.state.clocks};
    }

    render () {
        let cols = [];
        let first = true;
        for(let clock of this.state.clocks) {
            let cl = "compact-col " + (first ? "col-lg-12 col-md-12 col-sm-12 col-xs-12" : "col-lg-6 col-md-6 col-sm-12 col-xs-12");
            cols.push(
                <div className={cl} >
                    <div className={"flag-icon flag-icon-us"} />
                    <div className={"compact-col-city"}>{clock.city}</div>
                </div>
            );
            first = false;
        }
        return (
            <div className={"row wc-view text-center"} >
                {cols}
            </div>
        );
    };
}