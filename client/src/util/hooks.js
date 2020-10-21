import React, { useState } from 'react'

export const useForm = (callback, initialState = {}) => {
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }  
}