import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/cartHelper";

const StripePayment = ({
  products,
  setReload = f => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const { user, token } = isAuthenticated();

  const makePayment = token => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/payment/stripe`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const getFinalPrice = () => {
    let amount = 0;
    products.map(product => {
      amount = amount + product.price;
    });
    return amount;
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        amount={getFinalPrice() * 100}
        token={makePayment()}
        stripeKey={process.env.REACT_APP_KEY}
        billingAddress
        shippingAddress
        name="Stripe Payment"
      >
        <button className="btn btn-success">Click for stripe payment</button>
      </StripeCheckout>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Sign In First</button>
      </Link>
    );
  };

  return (
    <div className="text-white">
      <h3>This is Stripe Payment Page.{getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripePayment;
