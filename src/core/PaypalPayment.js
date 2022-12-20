import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paypalHelper";
import DropIn from "braintree-web-drop-in-react";

const PaypalPayment = ({
  products,
  setReload = f => f,
  reload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    errors: "",
    instance: {},
  });

  const { user, token } = isAuthenticated();
  const userId = user._id;

  const getToken = (userId, token) => {
    return getmeToken(userId, token).then(response => {
      console.log("RESPONSE: ", response);
      if (response.errors) {
        setInfo({ ...info, errors: response.errors });
      } else {
        const clientToken = response.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (this.instance = instance)}
            />
            <button className="btn btn-success w-100" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Sign in or add prodcuts to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getFinalPrice = () => {
    let amount = 0;
    products.map(product => {
      amount = amount + product.price;
    });
    return amount;
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getFinalPrice(),
        };
        processPayment(userId, token, paymentData)
          .then(response => {
            setInfo({ ...info, success: response.success, loading: false });
          })
          .catch(error => {
            setInfo({ loading: false, success: false });
          });
      })
      .catch();
  };

  return (
    <div>
      <h3 className="text-white">Your total bill is {getFinalPrice()}$</h3>
      {showbtdropIn()}
    </div>
  );
};

export default PaypalPayment;
