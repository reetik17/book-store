import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import routes from "../constants/routeConstants";
import apiConstants from "../constants/apiConstants";
import "./styles/Signup.scss";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate(routes.LOGIN);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        apiConstants.BASE_URL + apiConstants.SIGNUP,
        {
          username,
          email,
          password,
        }
      );
      console.log(response.data);
      toast.success("Account Created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigateToLogin();
      }, 3000);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Signup</button>
      </form>
      <div className="navigate-section">
        Already have account ? <span onClick={navigateToLogin}>Login</span>
      </div>
    </div>
  );
};

export default Signup;
