import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import '../styles/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [filterColumn, setFilterColumn] = useState('title'); // Default filter column
  const [filterValue, setFilterValue] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate('/login');
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
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setMessage('Failed to fetch books. Please try again.');
      }
    };

    fetchBooks();
  }, [token, navigate]);

  useEffect(() => {
    const filterBooks = () => {
      const lowercasedFilter = filterValue.toLowerCase();
      const filtered = books.filter((book) =>
        book[filterColumn]?.toString().toLowerCase().includes(lowercasedFilter)
      );
      setFilteredBooks(filtered);
    };

    filterBooks();
  }, [filterValue, filterColumn, books]);

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedBooks = [...filteredBooks].sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredBooks(sortedBooks);
    setSortConfig({ key: column, direction });
  };

  const goback = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="book-list-container">
      <h1>Book List</h1>
      {message && <p className="error-message">{message}</p>}

      <div className="filter-controls">
        <label htmlFor="filter-column">Filter by:</label>
        <select
          id="filter-column"
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publicationYear">Year</option>
          <option value="genre">Genre</option>
        </select>

        <input
          type="text"
          placeholder={`Search ${filterColumn}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>

      {filteredBooks.length > 0 ? (
        <table className="book-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID</th>
              <th onClick={() => handleSort('title')}>Title</th>
              <th onClick={() => handleSort('author')}>Author</th>
              <th onClick={() => handleSort('publicationYear')}>Year</th>
              <th onClick={() => handleSort('genre')}>Genre</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publicationYear}</td>
                <td>{book.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !message && <p>Loading books...</p>
      )}
      <button type="button" onClick={goback}>Back</button>
    </div>
  );
};

export default BookList;
