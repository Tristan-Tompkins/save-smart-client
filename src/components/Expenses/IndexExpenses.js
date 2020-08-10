import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Doughnut } from 'react-chartjs-2'

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

  const labels = []
  const data = []
  const indexItem = expenses.map(expense => {
    labels.push(`${expense.item}`)
    return labels
  })
  const indexAmount = expenses.map(expense => {
    data.push(Number(`${expense.amount}`))
    return data
  })
  console.log(data)
  console.log(labels)
  const index = {
    labels: indexItem,
    datasets: [
      {
        label: 'Expenses',
        data: indexAmount
      }
    ]
  }
  const expensesJSX = expenses.map(expense => (
    <tr key={expense._id} className="clickable-row">
      <td><Link to={`/expenses/${expense._id}`}>✏️</Link></td>
      <td>${expense.amount}</td>
      <td>{expense.item}</td>
    </tr>
  ))

  return (
    <div>
      <div>
        <Doughnut
          data={index}
          options={{
            title: {
              display: true,
              text: 'Expenses',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>
      <Link to='/expenses/create'><Button type="button" className="btn btn-dark">➕ Add an Expense</Button></Link>
      <table className="table table-hover table-dark" size="sm">
        <thead>
          <tr>
            <th className="editColumn" scope="col">Edit</th>
            <th className="itemColumn" scope="col">Amount</th>
            <th className="amountColumn" scope="col">Item</th>
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
