import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/header';
import Classifier from './components/Classifier/classifier';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Classifier></Classifier>
      </div>
    );
  }
}

export default App;