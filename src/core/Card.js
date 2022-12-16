import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = f => f,
  //function(f){return f} dummy method to make us update
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cardTitle = product ? product.title : "A photo from pexels";
  const cardDescription = product
    ? product.description
    : "this photo looks great";
  const cardPrice = product ? product.price : "100";

  const getThisToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getaRedirect = redirect => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };

  const showAddtoCart = () => {
    return (
      addToCart && (
        <button
          onClick={getThisToCart}
          className="btn w-100 btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemovefromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn w-100 btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info text-center">
      {getaRedirect(redirect)}
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddtoCart()}</div>
          <div className="col-12">{showRemovefromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
