import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Row, Col, Table } from 'react-bootstrap'
import apiUrl from '../../apiConfig'

const IndexExpenses = props => {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    console.log(props)
    axios({
      method: 'get',
      url: `${apiUrl}/expenses`,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setExpenses(res.data.expenses))
      .catch(console.error)
  }, [])

  const expensesJSX = expenses.map(expense => (
    <tr key={expense._id}>
      <td>${expense.amount}</td>
      <td>{expense.item}</td>
    </tr>
  ))

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
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
