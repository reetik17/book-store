import React from "react";
import { Link } from "react-router-dom";
import routes from "../constants/routeConstants";
import "./styles/Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="appName">Book Store</span>
      </div>
      <div className="navbar-right">
        <Link className="navLink" to={routes.HOME}>
          Home
        </Link>
        <Link className="navLink" to={routes.BOOKS}>
          Books
        </Link>
        <Link className="navLink" to={routes.ADD_BOOKS}>
          Add New Book
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
