import React, {Component} from "react";

export default class FloatingButtonGroup extends Component {
    render() {
        return (
            <div className="floating-action-btn">
                <ul>
                    <li>
                        <a className="btn-floating red waves-effect waves-light">
                            <i className="fa fa-star" />
                        </a>
                    </li>
                    <li>
                        <a className="btn-floating yellow darken-1 waves-effect waves-light">
                            <i className="fa fa-user" />
                        </a>
                    </li>
                    <li>
                        <a className="btn-floating green waves-effect waves-light">
                            <i className="fa fa-envelope" />
                        </a>
                    </li>
                    <li>
                        <a className="btn-floating blue waves-effect waves-light">
                            <i className="fa fa-shopping-cart" />
                        </a>
                    </li>
                </ul>
                <a className="btn-floating btn-lg btn-default waves-effect waves-light">
                    <i className="fa fa-pencil" />
                </a>
            </div>
        );
    }
}