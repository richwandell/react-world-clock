import {Component} from "react/lib/ReactBaseClasses";

export default class Observer extends Component{

    onMessage(event, message) {
        console.debug("Must override onMessage");
    }
}