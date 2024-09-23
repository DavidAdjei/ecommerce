import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

const ProductCard = ({product}) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.imgs[0]} alt={product.title} />
        <h3>{product.title}</h3>
        <p>Price: GHS{product.price}</p>
        <p>Rating: {product.rating}</p>
      </Link>
    </div>
  )
}

ProductCard.propTypes = {
    product: PropTypes.object
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {})(ProductCard)