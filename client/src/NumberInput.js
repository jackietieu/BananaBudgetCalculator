import React from 'react';

export default function NumberInput(props) {
  return (
    <label htmlFor="budget-days">
      <h3>Days to budget for:</h3>
      <input
        id="budget-days"
        type="number"
        onChange={props.onNumberOfDaysChange}
        value={props.numberOfDays}
        min="1"
        required="required" />
      {props.error}
    </label>
  )
}

