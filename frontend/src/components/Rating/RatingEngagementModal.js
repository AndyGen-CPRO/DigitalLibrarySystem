import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { VscBlank } from "react-icons/vsc";

const RatingEngagement = ({ closeModal, rating, token }) => {
    const [ratingLikes, setRatingLikes] = useState([]);
    const [ratingLikesCount, setRatingLikesCount] = useState(0);
    const [userLikeData, setUserLikeData] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(rating.id) {
            fetchRatingLikes();
            fetchRatingLikesCount();
            fetchUserRatingLikeData();
        }
    }, [])

    const fetchRatingLikes = async() => {
        try {
            const response = await axios.get(`http://localhost:8081/rating-likes/rating/${rating.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRatingLikes(response.data)
        } catch (error) {
            setMessage("Error fetching rating likes.")
        }
    }
    const fetchRatingLikesCount = async() => {
        try {
            const response = await axios.get(`http://localhost:8081/rating-likes/count/${rating.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRatingLikesCount(response.data)
        } catch (error) {
            setMessage("Error fetching rating likes count.")
        }
    }

    const fetchUserRatingLikeData = async() => {
        try {
            const response = await axios.get(`http://localhost:8081/rating-likes/user/${rating.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserLikeData(response.data);
        } catch (error) {
            setMessage("Error fetching user rating lt.")
        }
    }

    const handleLike = async() => {
        try {
            const response = await axios.post(`http://localhost:8081/rating-likes/add-like`, 
                { rating: { "id": rating.id }},
                 {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchRatingLikes();
            fetchRatingLikesCount();
            fetchUserRatingLikeData();
        } catch (error) {
            setMessage("Error saving rating:", error);
        }
    }

    const handleToggleLike = async() => {
        try {
            const response = await axios.put(`http://localhost:8081/rating-likes/toggle-like/${userLikeData.id}`,
                {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchRatingLikes();
            fetchRatingLikesCount();
            fetchUserRatingLikeData();
        } catch (error) {
            setMessage("Error saving rating:", error);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div>
                    <h2>Review by {rating.user.username}</h2>
                    <button className="close-modal" onClick={closeModal}>&times;</button>
                </div>
                {userLikeData ? (
                    <button className='like-btn' onClick={handleToggleLike}>
                        {userLikeData?.liked ? (
                        <>
                            <AiFillLike />
                            <span>Unlike</span>   
                        </>
                     ) : (
                        <>
                            <AiOutlineLike />
                            <span>Like the Review</span>
                        </>
                     )}
                    </button>
                ) : (
                    <button onClick={handleLike}>
                        <>
                            <AiOutlineLike />
                            <span>Like the Review</span>
                        </>
                    </button>
                )}
                {ratingLikesCount ? (
                    <div>
                        <p>Likes: {ratingLikesCount}</p>
                        <p>Liked by:</p>
                        <ul className="like-list">
                            {ratingLikes.map((like) => 
                                like.liked === true && (
                                    <li key={like.id}>
                                        {like.user.username}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                ) : (
                    <p>This review has not been liked by anyone yet.</p>
                )}
            </div>
        </div>
    )
}

export default RatingEngagement;