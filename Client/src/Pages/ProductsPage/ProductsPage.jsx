import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./products.css";
import { useAllProducts } from '../../context/productContext';
import { useCart } from '../../context/cartContext';
import Category from '../../component/Category';
import Back from '../../features/back'


export default function ProductsPage() {  
  const { products, getCategories, setCategory} = useAllProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    addToCart(item);
  }

  const sortProducts = (category) => {
    const sortedProducts = products.filter((product) => {
      const match = product.category.toLowerCase().includes(category.toLowerCase());
      return match;
    });

    return sortedProducts.slice(0, 5);
  }

  const hasMoreProducts = (category) => {
    const sortedProducts = products.filter((product) => {
      const match = product.category.toLowerCase().includes(category.toLowerCase());
      return match;
    });

    return sortedProducts.length > 5;
  }
  
  const handleSeeMore = (value) => {
    setCategory(value)
    navigate(`/products/:${value}`)
  }

  return (
    <div className='main_left'>
      <Category/>
      <div className="products_page">
        <Back/>
        {getCategories().map((category, index) => (
          <div key={index} className='sort'>
            <div><h3>{category}</h3></div>
            <div className='sort_content'>
              {sortProducts(category).map((product, index) => (
                <div key={index} className='products'>
                  <div className='product__image-container'>
                    <img src={product.image.url} alt={`${product.name}'s pic`} />
                  </div>
                  <p className='product_name'>{product.name}</p> 
                  <p className='product_price'>GH₵{product.price}</p>
                  <button className='add_button' onClick={() => handleAddToCart(product)}>Add to cart</button>
                </div>
              ))}
              {hasMoreProducts(category) && (
                <button className="see_more_button" onClick={() => handleSeeMore(category)}>See more</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}
