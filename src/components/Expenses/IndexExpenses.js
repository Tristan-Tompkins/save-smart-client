import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const IndexExpenses = (props) => {
  const [expenses, indexExpenses] = useState([])
  const [deleted, setDeleted] = useState(false)

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

  const deleteExpense = (expense) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/expenses/` + expense._id,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (deleted) {
    // add msgAlert for succesful delete
  }
  const expensesJSX = expenses.map(expense => (
    <tr key={expense._id} className="clickable-row">
      <Link to={`/expenses/${expense._id}`}><td>✏️</td></Link>
      <td>${expense.amount}</td>
      <td>{expense.item}</td>
      <td><Button onClick={deleteExpense}>🗑️</Button></td>
    </tr>
  ))

  return (
    <div>
      <table className="table table-hover table-dark" responsive size="sm">
        <thead>
          <tr>
            <th scope="col">Edit</th>
            <th scope="col">Amount</th>
            <th scope="col">Item</th>
            <th scope="col">Delete</th>
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
