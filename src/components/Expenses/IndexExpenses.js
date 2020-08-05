import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    <li key={expense._id}>
      {expense.item}
    </li>
  ))

  return (
    <div>
      <h4>Your expenses:</h4>
      <ul>
        {expensesJSX}
      </ul>
    </div>
  )
}

export default IndexExpenses
