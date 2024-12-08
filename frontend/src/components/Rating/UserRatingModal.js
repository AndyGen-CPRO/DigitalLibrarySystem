import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { VscBlank } from "react-icons/vsc";
import { getLoggedUsername } from '../../utils/auth';

const UserRating = ({ closeModal, fetchRatings, fetchRatingByUser, book, userRatingData, token, createOrEdit }) => {
    const id = userRatingData?.id;
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const loggedUser = getLoggedUsername();

    useEffect(() => {
        if (userRatingData && createOrEdit === "edit") {
            setRating(userRatingData.rating);
            setReview(userRatingData.review);
            setDate(userRatingData.date);
        }
    }, [])
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/rating/create', {
                book: { id: book.id },
                rating,
                review,
                date
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchRatings();
            fetchRatingByUser();
            closeModal();
            console.log("Rating saved:", response.data);
        } catch (error) {
            console.error("Error saving rating:", error);
        }
    }

    const handleUpdate = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8081/rating/${id}`, {
                rating,
                review,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchRatings();
            fetchRatingByUser();
            closeModal();
            console.log("Rating saved:", response.data);
        } catch (error) {
            console.error("Error saving rating:", error);
        }
    }

    const handleDelete = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:8081/rating/${id}`
            , {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchRatings();
            fetchRatingByUser();
            closeModal();
            console.log("Rating saved:", response.data);
        } catch (error) {
            console.error("Error saving rating:", error);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {createOrEdit === "create" && (
                <div>
                    <button className="close-modal" onClick={closeModal}>&times;</button>
                    <h2>Read it? Rate it!</h2>
                    <form onSubmit={handleSubmit}>
                    <Rating 
                        initialRating={userRatingData?.rating || 1} 
                        fractions={2} 
                        emptySymbol={<IoStarOutline />}
                        fullSymbol={<IoStar />}
                        onChange={(value) => setRating(value) }
                    />
                    <p>{rating}</p>
                    <div>
                        <p>Write a review (optional)</p>

                        <label>User: 
                            <input value={loggedUser} disabled></input>
                        </label>

                        <label>Date:  
                            <input value={date} disabled></input>
                        </label>

                        <textarea onChange={(e) => setReview(e.target.value)} className="review-field"></textarea>

                        <div>
                            <button className='rating-config-btn' type='submit'>Submit</button>
                        </div>
                    </div>
                    </form>
                </div>
                )}
                {createOrEdit === "edit" && (
                <div>
                    <button className="close-modal" onClick={closeModal}>&times;</button>
                    <h2>Edit Your Rating</h2>
                    <form onSubmit={handleUpdate}>
                    <Rating 
                        initialRating={rating} 
                        fractions={2} 
                        emptySymbol={<IoStarOutline />}
                        fullSymbol={<IoStar />}
                        onChange={(value) => setRating(value) }
                    />
                    <p>{rating}</p>
                    <div>
                        <p>Write a review (optional)</p>

                        <label>User: 
                            <input value={loggedUser} disabled></input>
                        </label>

                        <label>Date:  
                            <input value={date} disabled></input>
                        </label>

                        <textarea value={review} onChange={(e) => setReview(e.target.value)} className="review-field"></textarea>

                        <div>
                            <button className='rating-config-btn' type='submit'>Submit</button>
                            <button className='rating-config-btn' onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                    </form>
                </div>
                )}
            </div>
        </div>
    )
}

export default UserRating;