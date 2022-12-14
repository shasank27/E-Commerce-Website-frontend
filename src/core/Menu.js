import { React, Fragment } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { isAdmin, isAuthenticated, signout } from "../auth/helper";

const currentTab = (location, path) => {
  // console.log("LOCATION:" + location);
  // console.log("PATH    :" + path);
  var colors;
  try {
    if (!location) colors = "#FFFFFF";
    if (location === path) {
      colors = "#2ecc72";
    } else {
      colors = "#FFFFFF";
    }
    // console.log(colors);
    return { color: colors };
  } catch (err) {
    return { color: "#FFFFFF" };
  }
};

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

const Menu = ({ router }) => {
  // console.log(currentTab("/signup", "/signup"));
  // console.log(router);
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link
            style={currentTab(router.location.pathname, "/")}
            className="nav-link"
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={currentTab(router.location.pathname, "/cart")}
            to="/cart"
          >
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={currentTab(router.location.pathname, "/user/dashboard")}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
        {isAdmin() && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={currentTab(router.location.pathname, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              A. Dasboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={currentTab(router.location.pathname, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(router.location.pathname, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  router.navigate("/");
                });
              }}
            >
              Sign Out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
