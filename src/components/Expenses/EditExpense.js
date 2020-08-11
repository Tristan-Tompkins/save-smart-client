import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Modal from 'react-bootstrap/Modal'

const EditExpense = (props) => {
  const [expense, setExpense] = useState({ item: '', amount: '' })
  const { msgAlert } = props
  const [showEdit, setShowEdit] = useState(false)

  // modal show and click for edit:
  const handleShowEdit = () => setShowEdit(true)
  const handleCloseEdit = () => setShowEdit(false)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/expenses/` + props.expense._id,
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
  }, [])

  if (!expense) {
    return <p>Loading...</p>
  }

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedExpense = Object.assign({}, expense, updatedField)
    setExpense(editedExpense)
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/expenses/` + props.expense._id,
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
      .then(() => handleCloseEdit())
      .then(() => msgAlert({
        heading: 'Updated',
        message: messages.expenseUpdateSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failiure',
        message: messages.expenseUpdateFailiure,
        variant: 'danger'
      }))
  }
  const deleteExpense = (expense) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/expenses/` + props.expense._id,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => handleCloseEdit())
      .then(() => msgAlert({
        heading: 'Deleted',
        message: messages.expenseDeleteSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failiure',
        message: messages.expenseDeleteFailiure,
        variant: 'danger'
      }))
  }

  return (
    <Fragment>
      <tr className="clickable-row">
        <td><Button type="button" className="btn btn-dark" onClick={handleShowEdit}>✏️</Button></td>
        <td>${expense.amount}</td>
        <td>{expense.item}</td>
      </tr>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="item">
              <Form.Label>Item</Form.Label>
              <Form.Control required type="item" name="item" value={expense.item} placeholder={expense.item} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control required type="amount" name="amount" value={expense.amount} placeholder={expense.amount} onChange={handleChange} />
            </Form.Group>
            <Button className="updateExpense btn btn-dark" variant="primary" type="submit">Update</Button>
          </Form>
          <Button className="btn btn-dark" onClick={(expense) => { deleteExpense(expense) }}>🗑️</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default EditExpense
