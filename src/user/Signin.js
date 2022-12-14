import React, { useState } from "react";
import Base from "../core/Base";
import { Navigate } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    errors: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, errors, loading, didRedirect } = values;

  const { user } = isAuthenticated();
  console.log("No Vamos" + JSON.stringify(user));

  const handleChange = name => event => {
    setValues({ ...values, errors: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, errors: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.errors) {
          setValues({ ...values, errors: data.errors });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              errors: "",
              didRedirect: true,
            });
          });
        }
      })
      .catch(err => console.log(errors));
  };

  const performRedirect = () => {
    // console.log("VAMOS!!" + user);
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange("password")}
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
  return (
    <Base title="Sign In Page" description="This is my Sign In page">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default SignIn;
