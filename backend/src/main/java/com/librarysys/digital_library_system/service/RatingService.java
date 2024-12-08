package com.librarysys.digital_library_system.service;


import com.librarysys.digital_library_system.advice.CustomException;
import com.librarysys.digital_library_system.model.Book;
import com.librarysys.digital_library_system.model.Rating;
import com.librarysys.digital_library_system.model.User;
import com.librarysys.digital_library_system.repository.RatingRepository;
import com.librarysys.digital_library_system.repository.UserRepository;
import com.librarysys.digital_library_system.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

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

        User user = userRepository.findByUsername(loggedUser)
                .orElseThrow(() -> new CustomException("User not found", "INVALID_USER"));

        Book book = bookRepository.findById(rating.getBook().getId())
                .orElseThrow(() -> new CustomException("Invalid book ID", "INVALID_BOOK"));

        rating.setUser(user);

        if (rating.getBook() == null) {
            throw CustomException.invalidBookId(rating.getBook());
        }

        rating.setBook(book);

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
                .orElseThrow(() -> CustomException.ratingIdNotFound(id));
    }

    public List<Rating> getRatingByBook(Book book) {
        if (book == null) {
            throw CustomException.invalidBookId(book);
        }
        List<Rating> ratings = ratingRepository.findByBook(book);
        return ratings;
    }

    public Rating getRatingByUserAndBook(Book book) {
        String loggedUser = getLoggedUserId();

        if (loggedUser == null) {
            throw CustomException.invalidUserId(loggedUser);
        }

        User user = userRepository.findByUsername(loggedUser)
                .orElseThrow(() -> new CustomException("User not found", "INVALID_USER"));

        if (book == null) {
            throw CustomException.invalidBookId(book);
        }

        Rating ratings = ratingRepository.findByUserAndBook(user, book);

        return ratings;
    }

    public Rating updateRating(Integer id, Rating rating) {
        Rating existingRating = ratingRepository.findById(id)
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
        existingRating.setReview(rating.getReview());
        return ratingRepository.save(existingRating);
    }

    public void deleteRating(Integer id) {
        ratingRepository.deleteById(id);
    }
}
