import React, { Fragment, useEffect } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductActions.jsx";
import Loader from "../layout/Loader/Loader.jsx";
import ProductCard from "../home/ProductCard";
import { useParams } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );
  const {keyword} = useParams()
  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);
  return (
    <Fragment>  
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
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

export default Products;
