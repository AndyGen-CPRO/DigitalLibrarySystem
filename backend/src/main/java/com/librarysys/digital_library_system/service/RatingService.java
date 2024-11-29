package com.librarysys.digital_library_system.service;


import com.librarysys.digital_library_system.advice.CustomException;
import com.librarysys.digital_library_system.model.Rating;
import com.librarysys.digital_library_system.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    private String getLoggedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return authentication.getName();
        }
        return null;
    }

    public Rating saveRating(Rating rating) {
        String loggedUser = getLoggedUserId();

        if (loggedUser == null) {
            throw CustomException.invalidUserId(loggedUser);
        }
        rating.setId(Integer.valueOf(loggedUser));

        if (rating.getBook() == null) {
            throw CustomException.invalidBookId(rating.getBook());
        }
        if (rating.getRating() < 0.5 || rating.getRating() > 5) {
            throw CustomException.invalidRating(rating.getRating());
        }
        if (rating.getDate() == null) {
            throw CustomException.invalidDate(rating.getDate());
        }
         return ratingRepository.save(rating);
    }

    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    public Rating getRatingById(Integer id) {
        return ratingRepository.findById(id)
                .filter(rating -> {
                    getLoggedUserId();
                    return false;
                })
                .orElseThrow(() -> CustomException.ratingIdNotFound(id));
    }

    public Rating updateRating(Integer id, Rating rating) {
        Rating existingRating = ratingRepository.findById(id)
                .filter(r -> {
                    getLoggedUserId();
                    return false;
                })
                .orElseThrow(() -> CustomException.ratingIdNotFound(id));

        if(rating.getUser() != null && !rating.getUser().equals(existingRating.getUser())) {
            throw CustomException.immutableUserId();
        }
        if(rating.getBook() != null && !rating.getBook().equals(existingRating.getBook())) {
            throw CustomException.immutableBookId();
        }
        if (rating.getRating() < 0.5 || rating.getRating() > 5) {
            throw CustomException.invalidRating(rating.getRating());
        }

        existingRating.setRating(rating.getRating());
        return ratingRepository.save(existingRating);
    }

    public void deleteRating(Integer id) {
        ratingRepository.deleteById(id);
    }
}
