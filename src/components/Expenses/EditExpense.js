import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import ExpenseForm from './ExpenseForm'

const EditExpense = (props) => {
  const [expense, editExpense] = useState({ item: '', amount: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/expenses/${props.match.params.id}`)
      .then(res => editExpense(res.data.expense))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedExpense = Object.assign({}, expense, updatedField)

    editExpense(editedExpense)
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/expenses/${props.match.params.id}`,
      method: 'PATCH',
      data: { expense }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    // add msg alert
  }

  return (
    <div>
      <ExpenseForm
        expense={expense}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        // cancelPath={`/expenses/${props.match.params.id}`}
      />
    </div>
  )
}

export default EditExpense
