import React from 'react'
import { useAllProducts } from '../context/productContext'


export default function Category() {
  const { getCategories, handleCategoryClick } = useAllProducts();

  
  return (
    <div className='categories_menu'>
      <h2>Products</h2>
      <ul>
        {getCategories().map((category, index) => (
          <li key={index}><button onClick={() => handleCategoryClick(category)}>{category}</button></li>
        ))}
      </ul>
    </div>
  )
}
