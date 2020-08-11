import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const CreateExepnse = (props) => {
  const [expense, createExepnse] = useState({ item: '', amount: '' })
  const { msgAlert } = props
  // const [route, setRoute] = useState(false)

  // modal show:
  // const [show, setShow] = useState(false)
  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

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
      .then(() => props.handleClose())
      // .then(() => setRoute(true))
      .catch(() => msgAlert({
        heading: 'Failiure',
        message: messages.expenseCreateFailiure,
        variant: 'danger'
      }))
  }
  // if (route) {
  //   return <Redirect to='/expenses' />
  // }

  return (
    <div className='createExepnse'>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateExepnse
