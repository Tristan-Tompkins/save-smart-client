import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Row, Col, Table } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

const IndexExpenses = props => {
  const [expenses, indexExpenses] = useState([])

  useEffect(() => {
    console.log(props)
    axios({
      method: 'get',
      url: `${apiUrl}/expenses`,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => indexExpenses(res.data.expenses))
      .catch(console.error)
  }, [])

  const expensesJSX = expenses.map(expense => (
    <tr key={expense._id} className="clickable-row">
      <Link to={`/expenses/${expense._id}`}>
        <td>✏️</td>
      </Link>
      <td>${expense.amount}</td>
      <td>{expense.item}</td>
    </tr>
  ))

  return (
    <div>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Edit</th>
            <th scope="col">Amount</th>
            <th scope="col">Item</th>
          </tr>
        </thead>
        <tbody>
          {expensesJSX}
        </tbody>
      </table>
    </div>
  )
}

export default IndexExpenses
