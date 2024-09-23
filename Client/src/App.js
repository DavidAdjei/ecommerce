import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import './App.css'; 
import Homepage from './Pages/HomePage/Homepage';
import NavBar from './component/NavBar';
import Footer from './component/footer';
import { getProducts, setFeaturedProducts } from './redux/Actions/productActions';
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import ProductDetails from './Pages/ProductDetails/ProductDetails';

const App = ({ getProducts, setFeaturedProducts }) => {
  useEffect(() => {
    getProducts().then((res) => {
      const popular = res.products.filter(product => product.popular === true);
      console.log(popular);
      setFeaturedProducts(popular);
    }).catch((err => console.log(err)));
  },[getProducts, setFeaturedProducts])
  return (
    <div className='App'>
        <NavBar />
        <div className='main'>
          <Routes>
            <Route path="/" exact element={<Homepage/>} />
            <Route path="/product/:id" element={<ProductDetails/>} />
            <Route path="/all-products" element={<ProductsPage/>} /> 
          </Routes> 
      </div>
      <Footer/>
        
    </div>
    
  )
}

App.propTypes = {
  getProducts: PropTypes.func,
  setFeaturedProducts: PropTypes.func
}

const mapStateToProps = (state) => ({

})


export default connect(mapStateToProps, {getProducts, setFeaturedProducts})(App)
