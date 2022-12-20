import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripePayment from "./StripePayment";
import PaypalPayment from "./PaypalPayment";

const Cart = () => {
  const [products, setproducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setproducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    // console.log("PRODUCTS ", products);
    // console.log("PRODUCTS ", products.length);
    return (
      <div>
        <h2>This section is to load products </h2>
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

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row">
        <div className="col-4">{loadAllProducts()}</div>
        <div className="col-8">
          <StripePayment products={products} setReload={setReload} />
          <PaypalPayment products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
