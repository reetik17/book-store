import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Books from "../pages/Books";
import AddBook from "../pages/AddBook";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import routes from "../constants/routeConstants";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path={routes.HOME} element={<HomePage />} />
      <Route path={routes.BOOKS} element={<Books />} />
      <Route path={routes.ADD_BOOKS} element={<AddBook />} />
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.SIGNUP} element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
