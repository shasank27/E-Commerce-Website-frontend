import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [errors, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created Successfully</h4>;
    }
  };

  const errorMessage = () => {
    if (errors) {
      return <h4 className="text-warning">Category not created</h4>;
    }
  };

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(true);
        setName("");
      } else {
        setError("");
        setName("");
        setSuccess(true);
      }
    });
  };

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Go Back
      </Link>
    </div>
  );

  const CreateCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="Ex Category_Name"
        />
        <button className="btn btn-outline-info" onClick={onSubmit}>
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category"
      description="Add a category here"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {CreateCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default CreateCategory;
