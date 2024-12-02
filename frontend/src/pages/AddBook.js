import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { getToken } from '../utils/auth';
import '../styles/AddBook.css';

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publicationYear, setPublicationYear] = useState(new Date());
    const [genre, setGenre] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedBook = {
                title,
                author,
                publicationYear: publicationYear.getFullYear(), // Send only the year
                genre,
            };

            const response = await axios.post(
                "http://localhost:8081/books",
                formattedBook,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            setMessage("Book added successfully!");
            navigate("/admin-dashboard"); // Redirect to Admin Dashboard
        } catch (error) {
            console.error(error);
            setMessage("Failed to add book. Please try again.");
        }
    };

    const goback = () => {
        navigate("/admin-dashboard");
    };

    return (
        <div className="add-book-form">
            <h2>Add Book</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter book title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        id="author"
                        type="text"
                        placeholder="Enter author's name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publicationYear">Publication Year:</label>
                    <DatePicker
                        id="publicationYear"
                        selected={publicationYear}
                        onChange={(date) => setPublicationYear(date)}
                        dateFormat="yyyy"
                        showYearPicker
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        id="genre"
                        type="text"
                        placeholder="Enter genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Book</button>
                <button type="button" onClick={goback}>Back</button>
            </form>
        </div>
    );
};

export default AddBook;
