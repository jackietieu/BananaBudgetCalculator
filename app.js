const express = require('express');
const app = express();

app.get('/api/budgetCalculator', (req, res) => {
  // req.query = {startDate, numberOfDays}
  // query is already validated on the frontend
  if (req.query.startDate && req.query.numberOfDays) {
    let totalCost = 0;
    let duration = req.query.numberOfDays;
    let date = new Date(+req.query.startDate);

    while (duration > 0) {
      let currentDay = date.getDay(); //0 or 6 is a weekend, 1-6 weekday
      let currentDate = date.getDate(); //1-31

      if (currentDay !== 0 && currentDay !== 6) {
        let currentCost = 0;

        if (currentDate > 28) {
          currentCost = 0.25;
        } else if (currentDate > 21) {
          currentCost = 0.2;
        } else if (currentDate > 14) {
          currentCost = 0.15;
        } else if (currentDate > 7) {
          currentCost = 0.1;
        } else if (currentDate > 0) {
          currentCost = 0.05;
        }

        totalCost += currentCost;
      }
      
      date.setDate(date.getDate() + 1);
      duration--;
    }

    let startDate = new Date(+req.query.startDate);

    res.status(200).json({
      totalCost: totalCost.toFixed(2),
      startDate: `${startDate.getMonth() + 1}-${startDate.getDate()}-${startDate.getFullYear()}`,
      numberOfDays: req.query.numberOfDays
    })
  } else {
    res.status(404).json({
      message: 'Unable to calculate'
    })
  }
})

// default to React app for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

// if no routes can handle the req, it goes to this
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  // forwards the error instead of original request
  next(error);
})

// this will handle the previous error created, or
// handle all other errors created in the app (i.e. DB errors)
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
})

module.exports = app;