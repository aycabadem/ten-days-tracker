import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import Authenticate from "./authenticate/Authenticate";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logoutUser } from "../redux/authSlice";
const Navbar = () => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
  };
  return (
    <>
      {user === null ? (
        <Authenticate />
      ) : (
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo">
              10 Days Tracker
            </Link>

            <ul className="nav-menu">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <button onClick={handelLogout} className="navbar-button">
              Sign out
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
