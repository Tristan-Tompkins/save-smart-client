
import React, { useState, useEffect } from 'react'
// import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Expense = (props) => {
  const [expense, setExpense] = useState(null)
  console.log(props)

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

  return (
    <div>
      <p>{expense.item}</p>
      <p>Written by: {expense.amount}</p>
    </div>
  )
}

export default Expense
