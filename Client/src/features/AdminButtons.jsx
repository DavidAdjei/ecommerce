import React from 'react'

export default function AdminButtons({name, onClick, isActive}) {
  return (
    <div className={`admin_buttons ${isActive && 'active'}`}>
      <button onClick={onClick}>{name}</button>
    </div>
  )
}
