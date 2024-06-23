import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import routes from "../constants/routeConstants";
import Cookies from "js-cookie";
import apiConstants from "../constants/apiConstants";
import "./styles/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate(routes.HOME);
  };
  const navigateToSignup = () => {
    navigate(routes.SIGNUP);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        apiConstants.BASE_URL + apiConstants.LOGIN,
        {
          email,
          password,
        }
      );
      console.log(response.data);
      const { token } = response.data;
      Cookies.set("token", token, { expires: 1 / 24 });
      navigateToHome();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <div className="navigate-section">
        New User ? <span onClick={navigateToSignup}>Create Account</span>
      </div>
    </div>
  );
};

export default Login;
