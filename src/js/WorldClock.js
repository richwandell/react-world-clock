import ClockView from "./ClockView";
import CompactView from "./CompactView";
import TableView from "./TableView";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './Toolbar';
import Observer from "./Observer";
import Clear from "./Clear";

class WorldClock extends Observer {

    constructor(props) {
        console.debug("WorldClock.constructor");
        super(props);
        this.observers = {};
        this.subscribe(this, 'toolbar_state');
        this.subscribe(this, 'clear_mounted');
        if(window.localStorage["WorldClockState"]){
            try {
                let state = JSON.parse(window.localStorage["WorldClockState"]);
                this.state = state;
                return;
            }catch(e){}
        }
        this.state = {
            view: 0,
            clocks: [
                {skin: "swissRail", radius: 85, noseconds: false, gmtOffset: -4, city: "New York"},
                {skin: "swissRail", radius: 85, noseconds: false, gmtOffset: 1, city: "London"},
                {skin: "swissRail", radius: 85, noseconds: false, gmtOffset: 8, city: "Taiwan"}
            ]
        };
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
        console.debug(event, message);
        switch(event) {
            case 'toolbar_state':
                if(this.state.view !== message) {
                    this.setState({view: message});
                }
                break;

            case 'clear_mounted':
                this.setState({view: this.oldView});
                break;
        }
        window.localStorage['WorldClockState'] = JSON.stringify(this.state);
    }

    componentDidMount() {
        console.debug("WorldClock.componentDidMount");
        this.notify('wc_mount');
    }

    getView(sView) {
        switch(sView) {
            case 1:
                return (
                    <CompactView WorldClock={this}/>
                );
                break;

            case 2:
                return (
                    <TableView WorldClock={this}/>
                );
                break;

            case 3:
                return (<Clear WorldClock={this}/>);
                break;

            default:
                return (
                    <ClockView WorldClock={this}/>
                );
                break;
        }
    }

    addCity() {
        this.oldView = this.state.view;
        this.setState({
            view: 3,
            clocks: this.state.clocks.concat([
                {skin: "swissRail", radius: 85, noseconds: false, gmtOffset: 8, city: "Taiwan"}
            ])
        });
        this.notify('city_added', this.state.clocks);
    }

    render() {
        return (
            <div className="container-fluid" >
                <div id='clock-holder' className='jumbotron'>
                    <Toolbar WorldClock={this}/>
                    {this.getView(this.state.view)}
                    <div className={"row"}>
                        <a href={"javascript:void(0)"}
                           onClick={() => this.addCity()}
                        >Add City</a>
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<WorldClock />, document.getElementById('react-container'));