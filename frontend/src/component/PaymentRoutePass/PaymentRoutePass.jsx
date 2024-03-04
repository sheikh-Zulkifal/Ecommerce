import React from "react";
import Payment from "../Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const PaymentRoutePass = ({ stripeApiKey }) => {
  return (
    stripeApiKey && (
      <div>
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      </div>
    )
  );
};

export default PaymentRoutePass;
