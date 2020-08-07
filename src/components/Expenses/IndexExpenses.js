import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const IndexExpenses = (props) => {
  const [expenses, indexExpenses] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/expenses`,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => indexExpenses(res.data.expenses))
      .catch(console.error)
  }, [props])

  const expensesJSX = expenses.map(expense => (
    <tr key={expense._id} className="clickable-row">
      <td><Link to={`/expenses/${expense._id}`}>✏️</Link></td>
      <td>${expense.amount}</td>
      <td>{expense.item}</td>
    </tr>
  ))

  return (
    <div>
      <Button>Add an Expense</Button>
      <table className="table table-hover table-dark" size="sm">
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
