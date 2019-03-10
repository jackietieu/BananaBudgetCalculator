import React, { Component } from 'react';
import CacheLog from './CacheLog';
import DatePicker from './DatePicker';
import NumberInput from './NumberInput';

export default class InputContainer extends Component {
  setDate = () => {
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    return today;
  }

  state = {
    startDate: this.setDate(),
    numberOfDays: 1,
    totalCost: '',
    isLoading: false,
    cache: localStorage.getItem('recentCalculations') ? JSON.parse(localStorage.getItem('recentCalculations')) : []
  }

  onDateChange = (e) => {
    this.setState({
      startDate: e.target.value
    })
  }

  onNumberOfDaysChange = (e) => {
    this.setState({
      numberOfDays: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true
    }, () => {
      let dateArray = this.state.startDate.split('-');
      let date = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]).getTime();

      fetch(`/api/budgetCalculator?startDate=${date}&numberOfDays=${this.state.numberOfDays}`)
        .then(res => res.json())
        .then(data => {
          let recentCalculations = localStorage.getItem('recentCalculations');
          
          if (recentCalculations && JSON.parse(recentCalculations).length === 10) {
            localStorage.setItem('recentCalculations', JSON.stringify(JSON.parse(recentCalculations).concat(Object.assign(data, { key: Date.now() })).slice(1)));
          } else if (recentCalculations && recentCalculations.length > 0) {
            localStorage.setItem('recentCalculations', JSON.stringify(JSON.parse(recentCalculations).concat(Object.assign(data, { key: Date.now() }))));
          } else {
            localStorage.setItem('recentCalculations', JSON.stringify([Object.assign(data, { key: Date.now() })])); 
          }

          this.setState(state => ({
          totalCost: `Budget required for ${data.numberOfDays} day${data.numberOfDays > 1 ? 's' : ''} starting on ${data.startDate} is $${data.totalCost}`,
          isLoading: false,
          cache: JSON.parse(localStorage.getItem('recentCalculations'))
        }))
      })
      .catch(error => console.log('error is ', error));
    })
  }

  render() {
    let error = !this.state.numberOfDays || this.state.numberOfDays < 0 ? (
      <div className="budget-days-error">Please choose a value greater than 0</div>
    ) : '';
    let disabled = !this.state.numberOfDays || this.state.numberOfDays < 0 ? 'disabled' : '';
    let totalCostDisplay = this.state.totalCost ? (
      this.state.totalCost
    ) : '';
    let loading = this.state.isLoading ? (
      'Fetching data from server...'
    ) : '';

    return (
      <form onSubmit={this.onSubmit} className="budget-calculator-form">
        <div className="input-container">
          <DatePicker 
            onDateChange={this.onDateChange}
            startDate={this.state.startDate}
          />
          <NumberInput 
            onNumberOfDaysChange={this.onNumberOfDaysChange}
            numberOfDays={this.state.numberOfDays}
            error={error}
          />
        </div>
        <button 
          type="submit"
          value="Submit"
          className={"waves-effect waves-light btn-large " + disabled}>
          Submit
        </button>
        <div className="total-cost-loading-display">
          <h4 className="total-cost">
            {this.state.isLoading ? loading : totalCostDisplay}
          </h4>
        </div>
        <CacheLog cache={this.state.cache} />
      </form>
    )
  }
}