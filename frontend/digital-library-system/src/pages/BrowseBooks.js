import React from 'react';
import '../styles/BrowseBooks.css'; 

const books = [
  { title: "Java Programming", author: "Jen Can", rating: 5, image: "path/to/image1.jpg" },
  { title: "Digital Marketing", author: "2q Press", rating: 4, image: "path/to/image2.jpg" },
  { title: "Learn React", author: "Robert Smith", rating: 5, image: "path/to/image3.jpg" },
  { title: "Digital Design", author: "John Snow", rating: 4, image: "path/to/image4.jpg" },
  { title: "Artificial Intelligence", author: "Andy Cristiano", rating: 5, image: "path/to/image5.jpg" },
  { title: "Information Technology", author: "Josh Parker", rating: 4, image: "path/to/image6.jpg" },
];

const BrowseBooks = () => {
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
          {books.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <p>Rate: {"⭐".repeat(book.rating)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseBooks;
