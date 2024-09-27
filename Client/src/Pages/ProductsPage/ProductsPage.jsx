import PropTypes from "prop-types";
import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../component/ProductCard";
import Pagination from "@mui/material/Pagination";
import "./products.css";
import Filter from "../../component/Filter";
import Button from "@mui/material/Button";
import { getCategories } from "../../redux/Actions/productActions";

const ProductsPage = ({ products, getCategories }) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("category");

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
    getCategories().catch((err) => console.log(err));
    if (!categoryFromQuery || !filtersFromQuery) {
      setFilteredProducts(products);
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
        console.log(filtersFromQuery);
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
    };
    filter();
  }, [
    products,
    categoryFromQuery,
    filtersFromQuery,
    getCategories,
    setFilteredProducts,
  ]);

  return (
    <div className="product_page">
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setVisible(!visible)}
        sx={{ alignSelf: "flex-start", m: "1rem 0 0 4rem" }}
      >
        Filter
      </Button>
      <div className="product_list">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
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
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps, { getCategories })(ProductsPage);
