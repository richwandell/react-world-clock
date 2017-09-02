import React, {Component} from 'react';

export default class NavBar extends Component {

    componentDidMount() {
        console.debug("NavBar.componentDidMount");
    }

    render() {
        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <div className='navbar-header'>

                    </div>
                </div>
            </nav>
        );
    }
}