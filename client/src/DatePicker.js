import React from 'react';

export default function DatePicker(props) {
  return (
    <label htmlFor="date-picker">
      <h3>Date picker</h3>
      <input 
        className="center datepicker" 
        id="date-picker"
        type="date" 
        onChange={props.onDateChange}
        value={props.startDate}
        required="required" />
    </label>
  )
}