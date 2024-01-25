import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import Product from "./Product.jsx";
import MetaData from "../layout/MetaData.jsx";
import { getProduct } from "../../actions/ProductActions.jsx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
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
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
