import '../styles/BookDetails.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth'
import { useNavigate, useParams } from 'react-router-dom';
import Rating from 'react-rating';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { VscBlank } from "react-icons/vsc";
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
        <div className='book-page'>
            <div  className='book-detail'>
                <h1>{book.title}</h1>
                <h3>{book.author}</h3>
                <p>{book.publicationYear}</p>
                <h5>Description</h5>
                <p>{book.bookDescription}</p>
                <h5>${parseFloat(book.bookPrice).toFixed(2)}</h5>
            </div>
            <div className="book-rating-review">
                <div className="book-rating">
                {userRatingData ? (
                    <div>
                        <h3>Your Rating</h3>
                        <div>
                            <Rating 
                                className="review-rating"
                                initialRating={userRatingData.rating} 
                                fractions={2} 
                                emptySymbol={<IoStarOutline />}
                                fullSymbol={<IoStar />}
                                readonly
                            />
                        </div>
                        <p>{userRatingData.rating}</p>
                        <p>posted on: {userRatingData.date}</p>
                        <p>{userRatingData.review}</p>
                        <button onClick={() => {setUserRatingModal(true); setCreateOrEdit("edit")}}>Edit Rating</button>
                    </div>
                    ) : (
                    <div>
                        <p>Read it? Rate it!</p>
                        <button onClick={() => {setUserRatingModal(true); setCreateOrEdit("create")}}>Add Rating</button>
                    </div>
                )}
                </div>
                <div className="reviews">
                    <h2>Reviews</h2>
                    {ratings.map((rating) => (
                        <>
                            {rating.review && 
                            <li className="review-list"  key={rating.id}>
                            <p><b>{rating.user.username}</b> · {rating.date}</p>
                            <div>
                                <Rating 
                                className="review-rating"
                                initialRating={rating.rating} 
                                fractions={2} 
                                emptySymbol={<IoStarOutline />}
                                fullSymbol={<IoStar />}
                                readonly
                                />
                            </div>
                            <p>{rating.review}</p>

                        </li>
                            }
                        </>
                    )
                    )}
                </div>

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
        </div>
    )
}

export default BookDetails;