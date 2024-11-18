import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "../component/NavBar";
import Footer from "../component/footer";
import Loader from "../features/Loader";
import ProtectedSeller from "../features/ProtectedSeller";
import PublicRoute from "../features/PublicRoute";
import { useDispatch, useSelector } from "react-redux";
import { getSellerProducts } from "../redux/Actions/SellerActions/products";
import { setLoading } from "../redux/Actions/authActions";
import { setFeedback } from "../redux/Actions/productActions";

const Dashboard = lazy(() => import("../Pages/SellerPages/Seller/Dashboard"));
const SignUp = lazy(() => import("../Pages/CommonPages/SignUp/SignUp"));
const Login = lazy(() => import("../Pages/CommonPages/LogIn/LogIn"));
const About = lazy(() => import("../Pages/CommonPages/About/About"));
const HomePage = lazy(() => import("../Pages/SellerPages/HomePage"));
const Chat = lazy(() => import("../Pages/CommonPages/Chat/Chat"));

const SellerApp = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    useEffect(() => {
    dispatch(getSellerProducts(user._id))
        .catch((error) => dispatch(setFeedback({error})))
        .finally(dispatch(setLoading(false)));;
    },[dispatch, user])
    return (
        <div className="App">
            <NavBar />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route element={<ProtectedSeller />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/chat/:id/:participant" element={<Chat />} />
                    </Route>
                    <Route element={<PublicRoute />}>
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Navigate to='/login'/>}/>
                </Routes>
            </Suspense>
            <Footer />
        </div>
    );
}

export default SellerApp;
