import React, { useState,  useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating';
import { IoStar, IoStarOutline } from 'react-icons/io5';

const RatingList = ({ closeModal, book, ratings }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {ratings.length > 0 ? (
                <div>
                    <div>
                        <button className="close-modal" onClick={closeModal}>&times;</button>
                    </div>   
                    <div className="modal-inner">
                        <h2>{book.title} Ratings</h2>
                        <table className="ratings-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Rating</th>
                                    <th>Date Posted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ratings.map(rating => (
                                <tr key={rating.id}>
                                    <td>{rating.user.username}</td>
                                    <td>
                                        <Rating 
                                            className="review-rating"
                                            initialRating={rating.rating} 
                                            fractions={2} 
                                            emptySymbol={<IoStarOutline />}
                                            fullSymbol={<IoStar />}
                                            readonly
                                        />
                                        {rating.rating}
                                    </td>
                                    <td>{rating.date}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                ) : (
                    <p>This book has not yet received any ratings.</p>
                )}
            </div>
        </div>
    )
}

export default RatingList;