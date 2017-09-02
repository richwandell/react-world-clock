import {Component} from "react/lib/ReactBaseClasses";

export default class Observer extends Component{

    onMessage(message) {
        console.debug("Must override notify");
    }
}