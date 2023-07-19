import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/output-onlinepngtools.png";

export default function Navbar({ loginUser, logoutUSer }) {
  let active = 'active nav-link'
  let unActive = 'nav-link'
  let activeAuth = 'active-auth nav-link'
  return (
    <>
      <header className="pt-3 btn-space shadow ">
        <nav className="container-fluid d-flex justify-content-between mb-0 align-items-center">
          <ul className="list-unstyled d-flex   align-items-center">
            <li className="px-2 mt-2">
              <NavLink to="/home">
                <img src={logo} alt="logo" className="logo" />
              </NavLink>
            </li>
            {loginUser ? (
              <React.Fragment>
                <li className="px-2">
                  <NavLink className={({ isActive }) => isActive ? active : unActive} to="/home">Home</NavLink>
                </li>
                <li className="px-2">
                  <NavLink className={({ isActive }) => isActive ? active : unActive} to="/tv">Tv</NavLink>
                </li>
                <li className="px-2">
                  <NavLink className={({ isActive }) => isActive ? active : unActive} to="/movies">Movies</NavLink>
                </li>
                <li className="px-2">
                  <NavLink className={({ isActive }) => isActive ? active : unActive} to="/people">People</NavLink>
                </li>
              </React.Fragment>
            ) : (
              ""
            )}
          </ul>
          <ul className="list-unstyled d-flex">
            {loginUser ? (
              <React.Fragment>
                <li className="px-2 " onClick={logoutUSer}>
                  <NavLink  to="/logout">
                    <i className="fa-solid fa-right-from-bracket logout-icon"></i>{" "}
                  </NavLink>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="px-2">
                  <NavLink className={({ isActive }) => isActive ? activeAuth : unActive} to="/login">Login</NavLink>
                </li>
                <li className="px-2">
                  <NavLink className={({ isActive }) => isActive ? activeAuth : unActive} to="/register">Register</NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
