const CoolClock = window.CoolClock;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import ClockElement from './ClockElement';


class WorldClock extends Component {

    constructor(props) {
        console.debug("WorldClock.constructor");
        super(props);
        this.observers = {};
        CoolClock.findAndCreateClocks();
        if(window.localStorage["WorldClockState"]){
            try {
                let state = JSON.parse(window.localStorage["WorldClockState"]);
                this.state = state;
                return;
            }catch(e){}
        }
        this.state = {};
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
                observer.onMessage(message);
            }
        }
    }

    componentDidMount() {
        console.debug("WorldClock.componentDidMount");
        this.notify('wc-mount');
    }

    render() {
        return (
            <div className="container-fluid" >
                <NavBar/>
                <div id='clock-holder' className='jumbotron'>
                    <ClockElement
                        WorldClock={this}
                        skin='swissRail' />
                    <ClockElement
                        WorldClock={this}
                        skin='swissRail' />
                    <ClockElement
                        WorldClock={this}
                        skin='swissRail' />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<WorldClock />, document.getElementById('react-container'));