import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import apiConstants from "../constants/apiConstants";
import BookModal from "../components/BookModal";
import routes from "../constants/routeConstants";
import "./styles/Books.scss";

const Books = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate(routes.LOGIN);
      return;
    }
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        apiConstants.BASE_URL + apiConstants.GET_BOOK_API
      );
      setBooks(response.data.books);
      setFilteredBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleSearch = (e) => {
    const searchingValue = e.target.value.toLowerCase();
    setSearchValue(searchingValue);
    const filtered = books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchingValue) ||
        book.author.toLowerCase().includes(searchingValue) ||
        book.genre.toLowerCase().includes(searchingValue)
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="books-container">
      <h2>Find the book of your choice</h2>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by book name, author, or genre"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>

      <div className="books-grid">
        {filteredBooks &&
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="book-card"
              onClick={() => handleCardClick(book)}
            >
              <h3>{book.name}</h3>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
            </div>
          ))}
      </div>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Books;
