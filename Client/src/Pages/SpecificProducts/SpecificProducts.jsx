import React from 'react';
import { useCart } from '../../context/cartContext';
import { useAllProducts } from '../../context/productContext';
import './specific.css';
import Category from '../../component/Category';
import Back from '../../features/back';


export default function SpecificProducts() {
    const { addToCart } = useCart();
    const { products, category} = useAllProducts();
    const handleAddToCart = (item) => {
        addToCart(item);
    }

    const filteredProducts = category === 'All categories' ? products :
     products.filter(product => product.category === category);

    return (
        <div className='main_left'>
            <Category />
            <div>
                <Back/>
                <div className='specific_cat'>
                    {filteredProducts.map((product, index) => (
                        <div key={index} className='products'>
                            <div className='product__image-container'>
                                <img src={product.image.url} alt={`${product.name}'s pic`} />
                            </div>
                            <p className='product_name'>{product.name}</p> 
                            <p className='product_price'>GH₵{product.price}</p>
                            <button className='add_button' onClick={() => handleAddToCart(product)}>Add to cart</button>
                        </div>
                    ))}
                </div> 
            </div>
      </div>
      
  )
}
