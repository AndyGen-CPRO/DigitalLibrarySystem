package com.librarysys.digital_library_system.service;

import com.librarysys.digital_library_system.advice.CustomException;
import com.librarysys.digital_library_system.model.Rating;
import com.librarysys.digital_library_system.model.RatingLike;
import com.librarysys.digital_library_system.model.User;
import com.librarysys.digital_library_system.repository.RatingLikeRepository;
import com.librarysys.digital_library_system.repository.RatingRepository;
import com.librarysys.digital_library_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingLikeService {
    @Autowired
    private RatingLikeRepository ratingLikeRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    private String getLoggedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return authentication.getName();
        }
        return null;
    }

    public RatingLike saveRatingLike(RatingLike ratingLike) {
        String loggedUser = getLoggedUserId();

        if (loggedUser == null) {
            throw CustomException.invalidUserId(loggedUser);
        }

        User user = userRepository.findByUsername(loggedUser)
                .orElseThrow(() -> new CustomException("User not found", "INVALID_USER"));

        Rating rating = ratingRepository.findById(ratingLike.getRating().getId())
                .orElseThrow(() -> CustomException.invalidRating(Float.valueOf(ratingLike.getRating().getId())));

        ratingLike.setUser(user);
        ratingLike.setRating(rating);
        ratingLike.setLiked(true);

        return ratingLikeRepository.save(ratingLike);
    }

    public List<RatingLike> getLikesByRating(Rating rating) {
        if (rating == null) {
            throw new CustomException("Rating Not Found.", "RATING_NOT_FOUND");
        }
        return ratingLikeRepository.findByRating(rating);
    }

    public long getLikesCountForRating(Rating rating) {
        if (rating == null) {
            throw new CustomException("Rating Not Found.", "RATING_NOT_FOUND");
        }

        return ratingLikeRepository.countLikesByRating(rating);
    }

    public Optional<RatingLike> getRatingLikeByUser(Rating rating) {
        String loggedUser = getLoggedUserId();

        if (loggedUser == null) {
            throw CustomException.invalidUserId(loggedUser);
        }

        User user = userRepository.findByUsername(loggedUser)
                .orElseThrow(() -> new CustomException("User not found", "INVALID_USER"));

        if (rating == null) {
            throw new CustomException("Rating not found", "INVALID_RATING");
        }

        return ratingLikeRepository.findByUserAndRating(user, rating);
    }

    public RatingLike updateRatingLike(Integer id, RatingLike ratingLike) {
        RatingLike existingRatingLike = ratingLikeRepository.findById(id)
                .orElseThrow(() -> CustomException.ratingIdNotFound(id));

        existingRatingLike.setLiked(!existingRatingLike.isLiked());
        return ratingLikeRepository.save(existingRatingLike);
    }
}
