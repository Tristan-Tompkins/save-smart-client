import React from 'react'
import { Link } from 'react-router-dom'

const ExpenseForm = ({ expense, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Item</label>
    <input
      placeholder="Car Payment"
      value={expense.item}
      name="item"
      onChange={handleChange}
    />

    <label>Amount</label>
    <input
      placeholder="450"
      value={expense.amount}
      name="amount"
      onChange={handleChange}
    />

    <button type="submit">Enter</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ExpenseForm
