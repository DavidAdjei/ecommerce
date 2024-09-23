import PropTypes from 'prop-types'
import React, { useEffect } from 'react';
import './ProductDetails.css'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { getSelectedProduct } from '../../redux/Actions/productActions'

const ProductDetails = ({ getSelectedProduct, selectedProduct }) => {
  const { id } = useParams();

  useEffect(() => {
    fetchProduct()
  }, []);

  const fetchProduct = () => {
    getSelectedProduct(id).then((res) => {
      console.log(selectedProduct)
    }).catch((err) => console.log(err))
  }

  if (!selectedProduct) return <div>Loading...</div>;

  return (
    <div className="product-details">
      <h2>{selectedProduct?.title}</h2>
      <img src={selectedProduct?.imgs[0]} alt={selectedProduct?.title} />
      <p>Price: GHS{selectedProduct?.price}</p>
      <p>Rating: {selectedProduct?.rating}</p>
      <h3>Specifications</h3>
      <ul>
        {selectedProduct?.specs.map((spec, index) => (
          <li key={index}>{spec}</li>
        ))}
      </ul>
      <h3>Reviews</h3>
      {selectedProduct?.reviews.map((review, index) => (
        <div key={index}>
          <h4>{review.title} - {review.rating} ⭐</h4>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
};

ProductDetails.propTypes = {
  getSelectedProduct: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.product.selectedProduct
  };
}
  


export default connect(mapStateToProps, {getSelectedProduct})(ProductDetails)