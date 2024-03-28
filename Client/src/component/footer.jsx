import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';

export default function Footer() {
    const { user, logout } = useUser();
  return (
    <div className='footer'>
            <div className="company_info">
                Company Info
            </div>
            <table className="footer_nav">
                <tbody>
                <tr>
                    <th className="footer_navs-title">Pages</th>
                    <th className="footer_navs-title">Information</th>
                    <th className="footer_navs-title">Get in touch</th>
                </tr>
                <tr>
                    <td><Link to="/">Home</Link></td>
                    <td><Link to="/about">About Us</Link></td>
                    <td>Company Location</td>
                </tr>
                <tr>
                    <td><Link to="/products">Product</Link></td>
                    <td>Testimonials</td>
                    <td>Company email and number</td>
                </tr>
                <tr>
                    {user ? (
                    <td><button onClick={logout}>Logout</button></td>
                    ) : (
                    <>
                        <td><Link to="/signup">Sign Up</Link></td>
                        <td><Link to='/signin'>Log In</Link></td>
                    </>
                    )}
                </tr>
                </tbody>
            </table>
        </div>
  )
}
