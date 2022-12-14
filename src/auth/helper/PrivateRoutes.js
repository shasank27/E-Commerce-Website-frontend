import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

// v5 react-router-dom
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated() ? <Component {...props} /> : <Navigate to="/signin" />
//       }
//     />
//   );
// };

// v6-react-router-dom
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
