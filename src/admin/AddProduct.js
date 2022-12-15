import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";

const AddProduct = () => {
  let navigate = useNavigate();
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: "",
    category: "",
    loading: false,
    errors: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    errors,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const performRedirect = () => {
    navigate("/admin/dashboard");
  };

  const waitfor2seconds = async () => {
    await new Promise(res => setTimeout(res, 2000));
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, errors: "", loading: true });
    createProduct(user._id, token, formData).then(data => {
      if (data.errors) {
        setValues({ ...values, errors: data.errors });
      } else {
        // console.log(values);
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
        waitfor2seconds();
        performRedirect();
      }
    });
    //
  };

  const handleChange = name => event => {
    const val = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, val);
    setValues({ ...values, errors: false, [name]: val });
  };

  const preload = () => {
    getAllCategories().then(data => {
      console.log(data);
      if (data.errors) {
        setValues({ ...values, errors: data.errors });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-md btn-dark mb-3" to="/admin/dashboard">
        Go Back
      </Link>
    </div>
  );

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: createdProduct ? "" : "none" }}
          >
            {createdProduct} added to database!
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: errors ? "" : "none" }}
          >
            {errors}
          </div>
        </div>
      </div>
    );
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="Choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here"
      description="Welcome to product creation"
      className="container bg-info p-4"
    >
      {goBack()}
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
          {/* <h6 className="text-white">{JSON.stringify(values)}</h6> */}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
