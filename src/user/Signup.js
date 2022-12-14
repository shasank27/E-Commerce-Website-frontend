import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    errors: "",
    success: false,
  });

  const { name, email, password, errors, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, errors: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, errors: false });
    signup({ name, email, password })
      .then(data => {
        if (data.errors) {
          setValues({ ...values, errors: data.errors });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            errors: "",
            success: true,
          });
        }
      })
      .catch(err => console.log(errors));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                type="text"
                onChange={handleChange("name")}
                className="form-control"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                type="email"
                onChange={handleChange("email")}
                className="form-control"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                onChange={handleChange("password")}
                className="form-control"
                value={password}
              />
            </div>
            <button className="btn btn-success col-12" onClick={onSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account Created. Please <Link to="/signin"> Sign In </Link>{" "}
            here.
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

  return (
    <Base title="Sign Up Page" description="This is my Sign Up page">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default SignUp;
