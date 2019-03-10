import React, { Component } from 'react';
import './App.css';
import InputContainer from './InputContainer';

class App extends Component {
  render() {
    return (
      <div className="App row center">
        <div className="col s12 m4 title-container">
          <h2 className="title">Banana Budget Calculator</h2>
          <p className="col s8 m8 right">Select a date and the number of days you'd 
            like to budget for. The calculator will return the total 
            cost of the bananas within the specified duration.</p>
        </div>
        <div className="col s12 m8">
          <InputContainer/>
        </div>
      </div>
    );
  }
}

export default App;
