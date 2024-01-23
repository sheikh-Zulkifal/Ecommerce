import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.jsx";

import Footer from "./component/layout/footer/Footer.jsx";
import Home from "./component/home/Home.jsx"

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
      <Header />
      <Routes>
      <Route extact path="/" Component={Home}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
