import React, { Component } from 'react';
import Main from './components/main';
import Help from './components/help'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch location={this.props.location}>
                        <Route exact path='/' component={() => <Main />} />
                        <Route exact path='/help' component={() => <Help />} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;