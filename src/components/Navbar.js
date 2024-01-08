import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <>
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
            {/* <li className="nav-item">
              <button>
                <NavLink
                  to="/habit-tracker/profile"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                >
                  sign out
                </NavLink>
              </button>
            </li> */}
            {/* <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " activated" : "")
                }
              >
                Sign out
              </NavLink>
            </li> */}
          </ul>
        </div>
        <div>
          <button className="navbar-button">Sign out</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
