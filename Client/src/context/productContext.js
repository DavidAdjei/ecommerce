import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ProductsContext = createContext();

export const useAllProducts = () => {
    return useContext(ProductsContext);
}

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("All categories");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = () => {
            axios.get("http://localhost:8000/products")
                .then(response => {
                    setProducts(response.data.products);
                })
                .catch(error => {
                    console.error("Error fetching products:", error);
                });
        }

        fetchProducts();
    }, []);

    const setAllProducts = (data) => {
        setProducts(data);
    }

    const handleCategoryClick = (value) => {
        setCategory(value);
        navigate(`/products/:${value}`)
  }

    const getCategories = () => {
        const categories = new Set();
        products.forEach(product => {
        categories.add(product.category);
    });
    return [...Array.from(categories)];
  }

    return (
        <ProductsContext.Provider value={{ products, setAllProducts, getCategories, handleCategoryClick, setCategory, category }}>
            {children}
        </ProductsContext.Provider>
    );
}
