import React, { useState, useEffect } from "react";
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
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from "./component/User/UpdatePassword.jsx";
import ForgotPassword from "./component/User/ForgotPassword.jsx";
import ResetPassword from "./component/User/ResetPassword.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import axios from "axios";
import PaymentRoutePass from "./component/PaymentRoutePass/PaymentRoutePass.jsx";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrders from "./component/Order/MyOrders.jsx";
import OrderDetails from "./component/Order/OrderDetails.jsx";
import Dashboard from "./component/Admin/Dashboard.jsx";
import ProductList from "./component/Admin/ProductList.jsx";
import NewProduct from "./component/Admin/NewProduct.jsx";
import UpdateProduct from "./component/Admin/UpdateProduct.jsx";
import OrderList from "./component/Admin/OrderList.jsx";
import ProcessOrder from "./component/Admin/ProcessOrder.jsx";
import UsersList from "./component/Admin/UsersList.jsx";
import UpdateUser from "./component/Admin/UpdateUser.jsx";
import ProductReviews from "./component/Admin/ProductReviews.jsx";
import About from "./component/layout/About/About.jsx";
import Contact from "./component/layout/ContactUs/Contact.jsx";
import NotFound from "./component/layout/Not Found/NotFound.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState(null);
  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/stripeapikey",
      {
        withCredentials: true,
      }
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
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
        <Route exact path="/contact" Component={Contact} />
        <Route exact path="/about" Component={About} />
        <Route extact path="/login" Component={LoginSignUp} />
        <Route
          extact
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route extact path="/password/forgot" Component={ForgotPassword} />
        <Route extact path="/password/update" Component={UpdatePassword} />
        <Route extact path="/password/reset/:token" Component={ResetPassword} />
        <Route extact path="/cart" Component={Cart} />
        <Route
          extact
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route extact path="/order/confirm" Component={ConfirmOrder} />
        {stripeApiKey && (
          <Route
            extact
            path="/process/payment"
            element={<PaymentRoutePass stripeApiKey={stripeApiKey} />}
          />
        )}
        <Route
          extact
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/admin/product/:productId"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/admin/user/:userId"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            window.location.pathname === "/process/payment" ? null : (
              <NotFound />
            )
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
