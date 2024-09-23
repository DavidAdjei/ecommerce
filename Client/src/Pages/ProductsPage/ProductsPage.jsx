import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../../component/ProductCard';
import Pagination from '@mui/material/Pagination';
import "./products.css";

const ProductsPage = ({ products }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className='product_page'>
      {currentProducts.length > 0 ? (
        currentProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))
      ) : (
        <p>No products available</p>
      )}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          className="pagination"
        />
      )}
    </div>
  );
}

ProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps)(ProductsPage);
