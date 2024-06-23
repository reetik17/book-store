import React, { useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import routes from "../constants/routeConstants";
import "./styles/HomePage.scss";

const HomePage = (props) => {
  const navigate = useNavigate();

  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate(routes.LOGIN);
    }
  }, []);

  const handleNavigate = () => {
    navigate(routes.BOOKS);
  };

  return (
    <div className="home-container">
      <div className="homeContentWrapper">
        <h1 className="app-name">Books Ocean</h1>
        <div className="description">
          Dive into a Sea of Stories and Discover Your Next Great Read
        </div>
        <Button text="View Books" onClick={handleNavigate} />
      </div>
    </div>
  );
};

export default HomePage;
