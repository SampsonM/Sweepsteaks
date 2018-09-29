import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './styles/App.css';
import * as C from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/home" component={C.Welcome} />
        <Route exact path="/login" component={C.Login} />
        <Route exact path="/create" component={C.Create} />
        <Route exact path="/group" component={C.Group} />
      </div>
    );
  } 
}

export default App;
