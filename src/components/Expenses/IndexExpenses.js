import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
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

  const indexItem = expenses.map(expense => {
    return expense.item
  })
  const indexAmount = expenses.map(expense => {
    return expense.amount
  })
  const index = {
    labels: indexItem,
    datasets: [
      {
        label: 'Expenses',
        color: 'white',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#FC32CE',
          '#00A6B4',
          '#6800B4',
          '#FB0417',
          '#A963F9',
          '#FAB221',
          '#24BCF5'
        ],
        hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#7C1D67', '#003350', '#35014F', '#87050F', '#4E04A3', '#C48507', '#135C78'
        ],
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
      <div className='graphExpense'>
        <Doughnut
          data={index}
          options={{
            title: {
              display: true,
              text: 'Expenses',
              fontSize: 20,
              color: 'white'
            },
            legend: {
              display: true,
              position: 'right',
              color: 'white'
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
