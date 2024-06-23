import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Button from "../components/Button";
import apiConstants from "../constants/apiConstants";
import routes from "../constants/routeConstants";
import "./styles/AddBook.scss";

const AddBook = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate(routes.LOGIN);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    author: "",
    genre: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigateToBooks = () => {
    navigate(routes.BOOKS);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        apiConstants.BASE_URL + apiConstants.ADD_BOOK_API,
        {
          ...formData,
        }
      );
      toast.success("Book added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigateToBooks();
      }, 3000);
    } catch (error) {
      console.error("Error Adding Book:", error);
      toast.error("Failed to add book. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="addBookWrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="add-book-container">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit} className="book-form">
          <div className="formInput">
            <label>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formInput">
            <label>Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="formInput">
            <label>Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formInput">
            <label>Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Button type="submit" text="Submit" width="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
