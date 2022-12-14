import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import SignIn from "./user/Signin";
import SignUp from "./user/Signup";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
