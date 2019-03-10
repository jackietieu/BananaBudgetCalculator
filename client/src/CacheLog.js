import React from 'react';

export default function CacheLog(props) {
    let cache = props.cache;
    let rows = [];
    
    if (cache) {
      for (let i = 0; i < cache.length; i++) {
        let dateCreated = new Date(cache[i].key);
        dateCreated = `${dateCreated.getHours()}:${dateCreated.getMinutes()} | ${dateCreated.getMonth() + 1}-${dateCreated.getDate()}-${dateCreated.getFullYear()}`
        rows = rows.concat(
          <tr key={cache[i].key}>
            <td key={cache[i].key + 'startDate'}>{cache[i].startDate}</td>
            <td key={cache[i].key + 'numberOfDays'}>{cache[i].numberOfDays}</td>
            <td key={cache[i].key + 'totalCost'}>{cache[i].totalCost}</td>
            <td key={cache[i].key + 'bananas'}>{cache[i].bananas}</td>
            <td key={cache[i].key + 'dateCreated'}>{dateCreated}</td>
          </tr>
        )
      }

      rows.reverse();
    }

    return (
      <div className='cache-container'>
        <h5>10 Most Recent Calculations via Local Storage:</h5>
        <table className="striped centered">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>Number of Days</th>
              <th>Total Cost</th>
              <th>Bananas</th>
              <th>Calculated at</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  } 