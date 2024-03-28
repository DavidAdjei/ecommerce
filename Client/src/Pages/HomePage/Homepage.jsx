import React from 'react'
import Logo from '../../assets/images/Logo.jpeg'
import './homepage.css'
import { Link } from 'react-router-dom'

export default function Homepage({user, logout}) {
  return (
    <div className='homepage'>
        <div className='homepage__left'>
            <h1 className='home_message'> Welcome{user && `, ${user.name}`} to the best super mart in town</h1>
            <p className='home_desc'>
                We sell almost every grocery you can think of at very affordable prices
            </p>
            <div className="home__button-div">
                <Link to='/products'>Shop Now</Link>
            </div>
        </div>
        <div className='homepage__right'>
            <img src={Logo} alt="" />
        </div>
    </div>
  )
}
