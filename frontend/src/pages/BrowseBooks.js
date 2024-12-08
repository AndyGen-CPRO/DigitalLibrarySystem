import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/BrowseBooks.css';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

const BrowseBooks = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [serverBooks, setServerBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8081/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setServerBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setMessage('Failed to fetch books. Please try again.');
      }
    };

    fetchBooks();
  }, [token, navigate]);

  return (
    <div className="browse-books">
      <div className="sidebar">
        <ul>
          <li>New Releases</li>
          <li>Top Choice</li>
          <li>Literature</li>
          <li>Science</li>
          <li>History</li>
          <li>Technical</li>
          <li>Romance</li>
        </ul>
      </div>
      <div className="content">
        <h1>Browse Books</h1>
        <div className="books-grid">
          {filteredBooks.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.image} alt={book.title} />
              <Link
                  to={`/book/${book.id}`}
                  className="text-blue-600 hover:underline"
              >
                  {book.title}
              </Link>
              <p>{book.publicationYear}</p>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>CA${book.bookPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseBooks;
