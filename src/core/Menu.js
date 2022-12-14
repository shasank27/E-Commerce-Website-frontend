import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const currentTab = (location, path) => {
  console.log(path);
  console.log(location);
  try {
    if (!location) return { color: "#FFFFFF" };
    if (location === path) {
      return { color: "#2ecc72" };
    } else {
      return { color: "#FFFFFF" };
    }
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
  // console.log(router);
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link
            style={currentTab(router.location.pathname, "/")}
            className="nav-link text-white"
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(router.location.pathname, "/cart")}
            className="nav-link text-white"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(router.location.pathname, "/user/dashboard")}
            className="nav-link text-white"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(router.location.pathname, "/admin/dashboard")}
            className="nav-link text-white"
            to="/admin/dashboard"
          >
            A. Dasboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(router.location.pathname, "/signup")}
            className="nav-link text-white"
            to="/signup"
          >
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(router.location.pathname, "/signin")}
            className="nav-link text-white"
            to="/signin"
          >
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(router.location.pathname, "/signout")}
            className="nav-link text-white"
            to="/signout"
          >
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
