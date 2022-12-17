import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const [products, setproducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setproducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load prodcuts </h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addToCart={false}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is for checkout </h2>
      </div>
    );
  };

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;