import React from 'react'
import AdminMenu from '../../component/AdminMenu'
import { useUser } from '../../context/userContext'

export default function Users() {
  const { users } = useUser();
  return (
    <div className='main_left'>
      <AdminMenu /> 
      <table className='all_products'>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Make Admin</th>
        </tr>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><button>Make Admin</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
