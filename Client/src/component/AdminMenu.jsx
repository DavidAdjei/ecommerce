import React from 'react'
import AdminButtons from '../features/AdminButtons'
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (value) => {
        navigate(`/admin/${value}`)
    }

    const isActive = (pathname) => {
        return location.pathname === pathname;
    }

  return (
    <div className='categories_menu'>
      <AdminButtons name="DashBoard" onClick={() => navigate("/admin")} isActive={isActive('/admin')} />
      <hr />
      <div className='admin_nav'>
        <div>
          <h4>Products</h4>
          <AdminButtons name="All Products" onClick={() => handleClick("allProducts")} isActive={isActive('/admin/allProducts')} />
          <AdminButtons name="Add Products" onClick={() => handleClick("newProduct")} isActive={isActive('/admin/newProduct')}/>
        </div>
        <AdminButtons name="Orders" onClick={() => handleClick("orders")} isActive={isActive('/admin/orders')}/>
        <AdminButtons name="Users" onClick={() => handleClick("users")} isActive={isActive('/admin/users')} />
      </div>
    </div>
  )
}
