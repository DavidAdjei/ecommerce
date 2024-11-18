import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "../component/NavBar";
import Footer from "../component/footer";
import Loader from "../features/Loader";
import ProtectedBuyer from "../features/ProtectedBuyer";
import PublicRoute from "../features/PublicRoute";
import { getProducts, setFeaturedProducts, setFeedback } from "../redux/Actions/productActions";
import { setLoading } from "../redux/Actions/authActions";

const Homepage = lazy(() => import("../Pages/BuyerPages/HomePage/Homepage"));
const ProductsPage = lazy(() => import("../Pages/BuyerPages/ProductsPage/ProductsPage"));
const ProductDetails = lazy(() => import("../Pages/BuyerPages/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("../Pages/BuyerPages/Cart/Cart"));
const Checkout = lazy(() => import("../Pages/BuyerPages/Checkout/Checkout"));
const UserDashboard = lazy(() => import("../Pages/BuyerPages/Profile/UserDashboard"));
const SignUp = lazy(() => import("../Pages/CommonPages/SignUp/SignUp"));
const Login = lazy(() => import("../Pages/CommonPages/LogIn/LogIn"));
const About = lazy(() => import("../Pages/CommonPages/About/About"));
const Chat = lazy(() => import("../Pages/CommonPages/Chat/Chat"));



const BuyerApp = () =>{ 
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getProducts()).then((res)=> {
            const featured = res.products.filter((product)=> product.popular);
            dispatch(setFeaturedProducts(featured));
        }).catch((error) => {
            dispatch(setFeedback({error}));
        }).finally(dispatch(setLoading(false)));
    },[dispatch])
    return (
        <div className="App">
            <NavBar />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route element={<PublicRoute />}>
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route element={<ProtectedBuyer />}>
                        <Route path="/profile" element={<UserDashboard />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/chat/:id/:participant" element={<Chat />} />
                    </Route>
                    <Route path="/shop" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Navigate to='/login'/>}/>
                </Routes>
            </Suspense>
            <Footer />
        </div>
);}

export default BuyerApp;
