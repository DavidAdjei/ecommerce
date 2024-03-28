import React from 'react'
import "./features.css"

export default function UserInput({ placeholder, name, type, value, setValue, error }) {
    const handleChange = (e) => {
        setValue(e.target.value)
    }
  return (
    <div className='user_input'>
      <p className='label'>{placeholder}</p>
        <input className='input_field'
                  type={type}
                  value={value}
                  name={name}
                  onChange={handleChange}
              />
    </div>
  )
}
