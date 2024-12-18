import PropTypes from "prop-types";
import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../../component/ProductCard";
import Pagination from "@mui/material/Pagination";
import "./products.css";
import Filter from "../../../component/Filter";
import {
  getCategories,
  setFilteredProducts,
} from "../../../redux/Actions/productActions";
import Loader from "../../../features/Loader";
import { BsFilterLeft } from "react-icons/bs";
import { getWishlist } from "../../../redux/Actions/authActions";

const ProductsPage = ({
  user,
  products,
  getCategories,
  setFilteredProducts,
  filteredProducts,
  getWishlist
}) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("category");
  const searchKeyword = searchParams.get("searchKeyword");

  const filtersFromQuery = useMemo(() => {
    const filters = searchParams.get("filters");
    return filters ? JSON.parse(filters) : {};
  }, [searchParams]);

  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(true);
    getCategories().catch((err) => console.log(err));
    if (!categoryFromQuery || !filtersFromQuery) {
      setFilteredProducts(products);
      setLoading(false);
      return;
    }
    const filter = () => {
      let filtered;
      if (categoryFromQuery) {
        if (categoryFromQuery === "") {
          filtered = products;
          return;
        }
        filtered = products.filter(
          (product) => product.category === categoryFromQuery
        );
      }
      if (categoryFromQuery && Object.values(filtersFromQuery).length < 1) {
        setFilteredProducts(filtered);
        return;
      }

      if (filtersFromQuery) {
        const newFiltered = [];
        Object.entries(filtersFromQuery).forEach(([key, value]) => {
          Object.entries(value).forEach(([k, v]) => {
            if (v) {
              filtered.forEach((product) => {
                console.log({ type: product[key], value: k });
                if (product[key] === k) {
                  console.log(product[key] === k);
                  newFiltered.push(product);
                }
              });
            }
          });
        });
        filtered = newFiltered;
      }
      setFilteredProducts(filtered);
      setLoading(false);
    };
    filter();
  }, [
    products,
    categoryFromQuery,
    filtersFromQuery,
    getCategories,
    setFilteredProducts,
  ]);

  useEffect(() => {
    setLoading(true);
    if (user) {
      getWishlist(user._id)
    }
    if (searchKeyword) {
      const newProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredProducts(newProducts);
      setLoading(false);
    }
    setLoading(false);
  }, [products, searchKeyword, setFilteredProducts, getWishlist, user]);

  return (
    <div className="product_page">
      <button className="filter-btn" onClick={() => setVisible(!visible)}>
        <BsFilterLeft size={30} /> Filter
      </button>
      <div className="product_list">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      {loading && <Loader />}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          className="pagination"
        />
      )}

      {visible && <Filter setVisible={setVisible} />}
    </div>
  );
};

ProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
  getCategories: PropTypes.func,
  setFilteredProducts: PropTypes.func,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  filteredProducts: state.product.filteredProducts,
  user: state.auth.user
});

export default connect(mapStateToProps, { getCategories, setFilteredProducts, getWishlist })(
  ProductsPage
);
