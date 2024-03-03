import React, { Fragment } from "react";
import MetaData from "../layout/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // Check if user is defined before accessing user.name
  const userName = user ? user.name : "";

  // Calculate subtotal, shipping charges, tax, and total price
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = Math.round(subtotal > 100 ? subtotal * 0.05 : 0);
  const tax = Math.round(subtotal * 0.1);
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckOutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                {/* Use userName instead of user.name */}
                <span>{userName}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST</p>
                <span>${tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
