import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.jsx";
import Footer from "./component/layout/footer/Footer.jsx";
import Home from "./component/home/Home.jsx"
import ProductDetails from "./component/Product/ProductDetails.jsx";
import { ToastContainer } from "react-toastify";
import Products from "./component/Product/Products.jsx"
import Search from "./component/Product/Search.jsx"
import LoginSignUp from "./component/User/LoginSignUp.jsx";
import store from "./Store.jsx"
import { loadUser } from "./actions/UserActions.jsx";


function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser())
  }, []);
  return (
    <>
    <ToastContainer />
      <Header />
      <Routes>
      <Route extact path="/" Component={Home}/>
      <Route extact path="/product/:id" Component={ProductDetails}/>
      <Route extact path="/products" Component={Products}/>
      <Route  path="/products/:keyword" Component={Products}/>
      <Route extact path="/search" Component={Search}/>
      <Route extact path="/login" Component={LoginSignUp}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
