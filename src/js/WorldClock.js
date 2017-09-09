import ClockView from "./ClockView";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './Toolbar';
import Observer from "./Observer";

class WorldClock extends Observer {

    constructor(props) {
        console.debug("WorldClock.constructor");
        super(props);
        this.observers = {};
        this.subscribe(this, 'toolbar_state');
        if(window.localStorage["WorldClockState"]){
            try {
                let state = JSON.parse(window.localStorage["WorldClockState"]);
                this.state = state;
                return;
            }catch(e){}
        }
        this.state = {view: 0};
    }

    subscribe(observer: Component, event: string) {
        if(this.observers[event] === undefined){
            this.observers[event] = [];
        }
        this.observers[event].push(observer);
    }

    notify(event: string, message) {
        if(this.observers[event] !== undefined){
            for(let observer of this.observers[event]) {
                observer.onMessage(event, message);
            }
        }
    }

    onMessage(event, message) {
        console.log(event, message);
        switch(event) {
            case 'toolbar_state':
                if(this.state.view !== message) {
                    this.setState({view: message});
                }
                break;
        }
        window.localStorage['WorldClockState'] = JSON.stringify(this.state);
    }

    componentDidMount() {
        console.debug("WorldClock.componentDidMount");
        this.notify('wc_mount');
    }

    render() {
        let view = (
            ""
        );

        if (this.state.view === 0) {
            view = (
                <ClockView
                    WorldClock={this}/>
            );
        }

        return (
            <div className="container-fluid" >
                <div id='clock-holder' className='jumbotron'>
                    <Toolbar
                        WorldClock={this}/>
                    {view}
                </div>
            </div>
        );
    }
}


ReactDOM.render(<WorldClock />, document.getElementById('react-container'));