import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import CreateCategory from "./admin/AddCategory";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashboard from "./user/AdminDashBoard";
import SignIn from "./user/Signin";
import SignUp from "./user/Signup";
import UserDashboard from "./user/UserDashBoard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <PrivateRoute path="/user/dashboard" element={ <UserDashboard /> } /> //v5 react-router-dom//*/}
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create/category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
