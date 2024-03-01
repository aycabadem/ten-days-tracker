import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch } from "react-redux";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logoutUser } from "../redux/authSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <Link to="/ten-days-tracker" className="navbar-logo">
            10 Days Tracker
          </Link>

          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink
                to="/ten-days-tracker"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " activated" : "")
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/ten-days-tracker/profile"
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
    </>
  );
};

export default Navbar;
