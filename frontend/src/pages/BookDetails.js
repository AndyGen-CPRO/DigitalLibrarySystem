import '../styles/BookDetails.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth'
import { useNavigate, useParams } from 'react-router-dom';
import UserRating from '../components/Rating/UserRatingModal';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [userRatingData, setUserRatingData] = useState(null);
    const [message, setMessage] = useState("");
    const [userRatingModal, setUserRatingModal] = useState(false);
    const [createOrEdit, setCreateOrEdit] = useState("");
    const token = getToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
          }
        fetchBook();
        fetchRatings();
        fetchRatingByUser();
    },[id]);

    const fetchBook = async() => {
        try {
            const response = await axios.get(`http://localhost:8081/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBook(response.data);
            setMessage("Fetching book details successful.")
        } catch (error) {
            setMessage("Error fetching book details.")
        }
    }

    const fetchRatings = async() => {
        try {
            const response = await axios.get(`http://localhost:8081/rating/book/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRatings(response.data);
            setMessage("Fetching book ratings successful.")
        } catch (error) {
            setMessage("Error fetching book ratings.")
        }
    }

    const fetchRatingByUser = async() => {
        try {
            const response = await axios.get(`http://localhost:8081/rating/user/book/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserRatingData(response.data);
            setMessage("Fetching book rating by user successful.")
        } catch (error) {
            setMessage("Error fetching book rating by user.")
        }
    }

    if (!book) {
        return (
            <p>Book Loading...</p>
        )
    }

    return (
        <div className='book-detail'>
            <div>
                <h1>{book.title}</h1>
                <h3>Author: {book.author}</h3>
                <h4>Year: {book.publicationYear}</h4>
                <h4>Description</h4>
                <p>{book.bookDescription}</p>
                <h4>Price: {book.bookPrice}</h4>
            </div>
            {ratings.map((rating) => (
                <>
                    {rating.review && 
                    <div>
                        <h3>{rating.user.username}</h3>
                        <p>{rating.review}</p>
                    </div>
                    }
                </>
            )
            )}
            {userRatingData ? (
                <div>
                    <button onClick={() => {setUserRatingModal(true); setCreateOrEdit("edit")}}>Edit Rating</button>
                </div>
                ) : (
                <div>
                    <p>User has no rating.</p>
                    <button onClick={() => {setUserRatingModal(true); setCreateOrEdit("create")}}>Add Rating</button>
                </div>
            )}
            
            {userRatingModal &&
            <UserRating 
                closeModal={() => setUserRatingModal(false)}
                fetchRatings={fetchRatings}
                fetchRatingByUser={fetchRatingByUser}
                book={book}
                userRatingData={userRatingData}
                token={token}
                createOrEdit={createOrEdit}
            />
            }
        </div>  
    )
}

export default BookDetails;