import PropTypes from 'prop-types'
import React, { useEffect } from 'react';
import './ProductDetails.css'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { getSelectedProduct } from '../../redux/Actions/productActions'
import Button from '@mui/material/Button';
import { Rating } from '@mui/material';
import { addToCart } from '../../redux/Actions/cartActions';

const ProductDetails = ({ getSelectedProduct, selectedProduct, cart, addToCart }) => {
  const { id } = useParams();

  useEffect(() => {
    fetchProduct()
  }, []);

  const fetchProduct = () => {
    getSelectedProduct(id).catch((err) => console.log(err))
  }

  if (!selectedProduct) return <div>Loading...</div>;

  return (
    <div className="product-details">
      <div className='product-details-left'>
        <h2>{selectedProduct?.title}</h2>
        <img src={selectedProduct?.imgs[0]} alt={selectedProduct?.title} />
        <p className='details-price'>GHS{selectedProduct?.price}</p>
        <Rating readOnly value={selectedProduct.rating} size='large' precision={0.1}/>
        <Button onClick={() => { addToCart(selectedProduct); console.log(cart); }} variant='contained' color="secondary" sx={{alignSelf: "center"}}>
          Add to cart
        </Button>
      </div>
      <div className="product-details-right">
        <h3>Specifications</h3>
        <ul>
          {selectedProduct?.specs.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
        <h3>Reviews</h3>
        {selectedProduct?.reviews.map((review, index) => (
          <div key={index}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {review.title} <Rating size='small' value={review.rating} readOnly precision={0.1} />
            </h4>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  getSelectedProduct: PropTypes.func,
  addToCart: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.product.selectedProduct,
    cart: state.cart.cart
  };
}
  


export default connect(mapStateToProps, {getSelectedProduct, addToCart})(ProductDetails)