import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import Product from "./Product.jsx";

const product = {
  name: "Blue Tshirt",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: "$12",
  _id: "zulkifal",
};
const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Feature Products</h2>
      <div className="comtainer" id="container">
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
