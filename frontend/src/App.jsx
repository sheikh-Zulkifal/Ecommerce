import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.jsx";
import Footer from "./component/layout/footer/Footer.jsx";
import Home from "./component/home/Home.jsx"
import ProductDetails from "./component/Product/ProductDetails.jsx";
import { ToastContainer } from "react-toastify";


function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <>
    <ToastContainer />
      <Header />
      <Routes>
      <Route extact path="/" Component={Home}/>
      <Route extact path="/product/:id" Component={ProductDetails}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
