import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import MetaData from "../layout/MetaData.jsx";
import { clearErrors, getProduct } from "../../actions/ProductActions.jsx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader.jsx";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        await dispatch(getProduct());
      } catch (error) {
        toast.error( error );
        dispatch(clearErrors())
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
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
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
