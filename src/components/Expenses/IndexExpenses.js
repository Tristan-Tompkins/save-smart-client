import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Button } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
import CreateExpense from './CreateExpense'
import EditExpense from './EditExpense'

const IndexExpenses = (props) => {
  const [expenses, indexExpenses] = useState([])
  const [show, setShow] = useState(false)

  // modal show and click for create:
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

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
    fontSize: 40,
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
  return (
    <div>
      <Button type="button" className="btn btn-dark" onClick={handleShow}>➕ Add an Expense</Button>
      <CreateExpense show={show} handleClose={handleClose} handleShow={handleShow} msgAlert={props.msgAlert} user={props.user} expenseprops={props.expenseprops}/>
      <table className="table table-hover table-dark" size="sm">
        <thead>
          <tr>
            <th className="editColumn" scope="col">Edit</th>
            <th className="itemColumn" scope="col">Amount</th>
            <th className="amountColumn" scope="col">Item</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <EditExpense msgAlert={props.msgAlert} user={props.user} expense={expense} key={expense._id}/>
          )
          )}
        </tbody>
      </table>
      <div className='graphExpense'>
        <Doughnut
          data={index}
          options={{
            title: {
              display: true,
              fontSize: 50,
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
    </div>
  )
}

export default IndexExpenses
