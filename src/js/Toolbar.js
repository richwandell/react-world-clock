import React, {Component} from 'react';

export default class Toolbar extends Component {

    constructor(props) {
        console.debug("Toolbar.constructor");
        super(props);
        this.worldClock = props.WorldClock;
        this.state = {selected: this.worldClock.state.view};
    }

    buttonClicked(a, index) {
        console.debug("Toolbar.buttonClicked");
        this.setState({selected: index});
    }

    render() {
        console.debug("Toolbar.render");
        this.worldClock.notify('toolbar_state', this.state.selected);
        const button1Class = `waves-effect waves-light btn ${this.state.selected === 0 ? "btn-primary active" : "btn-default"}`;
        const button1 = (
            <button id="list" className={button1Class}
                    onClick={(e) => this.buttonClicked(e, 0)}
                    data-original-title="Refreshr">
                <i className={"fa fa-th-large fa-lg toolbar-icon"} aria-hidden="true"/>Clocks
            </button>
        );

        const button2Class = `waves-effect waves-light btn ${this.state.selected === 1 ? "btn-primary active" : "btn-default"}`;
        const button2 = (
            <button id="new" className={button2Class}
                    onClick={(e) => this.buttonClicked(e, 1)}
                    data-original-title="New">
                <i className={`fa fa-th fa-lg toolbar-icon`} aria-hidden="true"/>Compact
            </button>
        );

        const button3Class = `waves-effect waves-light btn ${this.state.selected === 2 ? "btn-primary active" : "btn-default"}`;
        const button3 = (
            <button id="passreset" className={button3Class}
                    onClick={(e) => this.buttonClicked(e, 2)}
                    data-original-title="Password Reset">
                <i className={`fa fa-table fa-lg toolbar-icon`} aria-hidden="true"/>Table
            </button>
        );

        return (
            <div className="row">
                <div className={`offset-xs-1 col-xs-11 offset-sm-2 col-sm-8 offset-md-3 col-md-6`}>
                    <div className={`btn-toolbar" role="toolbar`}>
                        <div className={`btn-group btn-group-justified`} role="group">
                            <div className="btn-group" role="group">
                                {button1}
                            </div>
                            <div className={`btn-group`} role="group">
                                {button2}
                            </div>
                            <div className={`btn-group`} role="group">
                                {button3}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}