import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const CreateExepnse = (props) => {
  const [expense, createExepnse] = useState({ item: '', amount: '' })
  const { msgAlert } = props
  const [route, setRoute] = useState(false)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const createdExpense = Object.assign({}, expense, updatedField)

    createExepnse(createdExpense)
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/expenses`,
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
      .then(() => msgAlert({
        heading: 'Created',
        message: messages.expenseCreateSuccess,
        variant: 'success'
      }))
      .then(() => setRoute(true))
      .catch(() => msgAlert({
        heading: 'Failiure',
        message: messages.expenseCreateFailiure,
        variant: 'danger'
      }))
  }
  if (route) {
    return <Redirect to='/expenses' />
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h3>Create a new Expense:</h3>
        <Form.Group controlId="item">
          <Form.Label>Item</Form.Label>
          <Form.Control required type="item" name="item" value={expense.item} placeholder='Enter the item name' onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control required type="amount" name="amount" value={expense.amount} placeholder='Enter the amount' onChange={handleChange} />
        </Form.Group>
        <Button className="createExpense" variant="primary" type="submit">Create</Button>
      </Form>

    </div>
  )
}

export default CreateExepnse
