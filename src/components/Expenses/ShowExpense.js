
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'

const Expense = (props) => {
  const [expense, setExpense] = useState({ item: '', amount: '' })
  const [updated, setUpdated] = useState(false)
  const [route, setRoute] = useState(false)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/expenses/` + props.expenseprops.match.params.id,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        setExpense(res.data.expense)
      })
      .catch(error => {
        console.log(error)
      })
  }, [props])

  if (!expense) {
    return <p>Loading...</p>
  }

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedExpense = Object.assign({}, expense, updatedField)
    console.log('edited expense:', editedExpense)
    setExpense(editedExpense)
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/expenses/` + props.expenseprops.match.params.id,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: {
        expenses: {
          item: expense.item,
          amount: expense.amount
        }
      }
    })
      .then(() => setUpdated(true))
      .then(() => setRoute(true))
      .catch(console.error)
  }
  if (updated) {
    // add msg alert
  }
  if (route) {
    return <Redirect to='/expenses' />
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h3>Show up</h3>
        <Form.Group controlId="item">
          <Form.Label>Item</Form.Label>
          <Form.Control required type="item" name="item" value={expense.item} placeholder={expense.item} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control required type="amount" name="amount" value={expense.amount} placeholder={expense.amount} onChange={handleChange} />
        </Form.Group>
        <Button className="updateExpense" variant="primary" type="submit">Update</Button>
      </Form>
    </div>
  )
}

export default Expense
