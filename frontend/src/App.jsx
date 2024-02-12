import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.jsx";
import Footer from "./component/layout/footer/Footer.jsx";
import Home from "./component/home/Home.jsx";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import { ToastContainer } from "react-toastify";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search.jsx";
import LoginSignUp from "./component/User/LoginSignUp.jsx";
import store from "./Store.jsx";
import { loadUser } from "./actions/UserActions.jsx";
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.jsx";
import ProtectedRoute from "./component/Route/ProtectedRoute.jsx";
import UpdateProfile from "./component/User/UpdateProfile.jsx"
import UpdatePassword from "./component/User/UpdatePassword.jsx"
import ForgotPassword from "./component/User/ForgotPassword.jsx"
import ResetPassword from "./component/User/ResetPassword.jsx"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <ToastContainer />
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route extact path="/" Component={Home} />
        <Route extact path="/product/:id" Component={ProductDetails} />
        <Route extact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />
        <Route extact path="/search" Component={Search} />
        <Route extact path="/login" Component={LoginSignUp} />
        <Route extact path="/account" Component={Profile} />
        <Route extact path="/me/update" Component={UpdateProfile}/>
        <Route extact path="/password/update" Component={UpdatePassword}/>
        <Route extact path="/password/forgot" Component={ForgotPassword}/>
        <Route extact path="/password/update" Component={UpdatePassword}/>
        <Route extact path="/password/reset/:token" Component={ResetPassword}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
