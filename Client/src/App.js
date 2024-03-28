import './App.css';
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from './component/NavBar';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/LogIn/LogIn';
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import { useUser } from './context/userContext';
import Admin from './Pages/AdminPanel/Admin';
import Homepage from './Pages/HomePage/Homepage';
import Footer from './component/footer';
import SpecificProducts from './Pages/SpecificProducts/SpecificProducts';
import Users from './Pages/AdminPanel/Users';
import Orders from './Pages/AdminPanel/Orders';
import NewProduct from './Pages/AdminPanel/NewProduct';
import AllProducts from './Pages/AdminPanel/AllProducts';

function App() {
  const { user } = useUser();
  
  return (
    <div className='container'>
      <NavBar />
      <div className='main'>
          <Routes>
            <Route exact path='/' element={<Homepage user={user} />} />
            <Route exact path='/products' element={<ProductsPage/>} />
            <Route path='/products/:category' element={<SpecificProducts/>} />
            <Route exact path='/admin' element={user ? <Admin /> : <Navigate to="/" />} />
            <Route exact path='/admin/newProduct' element={user ?<NewProduct />: <Navigate to="/" />} />
            <Route exact path='/admin/orders' element={user ?<Orders/>: <Navigate to="/" />} />
            <Route exact path='/admin/Users' element={user ?<Users/>: <Navigate to="/" />} />
            <Route exact path='/admin/allProducts' element={user ? <AllProducts/> : <Navigate to='/'/>} />
            <Route exact path='/signup' element={ user ? <Navigate to='/products'/> :<SignUp />} />
            <Route exact path='/signin' element={user ? <Navigate to='/products'/> :<Login />} />
          </Routes>
      </div>
      
      <Footer/>
    </div>
    
  );
}

export default App;
