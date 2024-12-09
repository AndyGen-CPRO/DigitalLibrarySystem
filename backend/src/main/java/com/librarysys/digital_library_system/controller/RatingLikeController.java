package com.librarysys.digital_library_system.controller;

import com.librarysys.digital_library_system.model.Book;
import com.librarysys.digital_library_system.model.Rating;
import com.librarysys.digital_library_system.model.RatingLike;
import com.librarysys.digital_library_system.service.RatingLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rating-likes")
public class RatingLikeController {

    @Autowired
    private RatingLikeService ratingLikeService;

    @PostMapping("/add-like")
    public RatingLike createRatingLike(@RequestBody RatingLike ratingLike) {
        return ratingLikeService.saveRatingLike(ratingLike);
    }

    @GetMapping("rating/{ratingId}")
    public List<RatingLike> getLikesByRating(@PathVariable Integer ratingId) {
        Rating rating = new Rating();
        rating.setId(ratingId);

        return ratingLikeService.getLikesByRating(rating);
    }

    @GetMapping("count/{ratingId}")
    public long getLikesCountForRating(@PathVariable Integer ratingId) {
        Rating rating = new Rating();
        rating.setId(ratingId);

        return ratingLikeService.getLikesCountForRating(rating);
    }

    @GetMapping("user/{ratingId}")
    public Optional<RatingLike> getRatingLikeByUser(@PathVariable Integer ratingId) {
        Rating rating = new Rating();
        rating.setId(ratingId);

        return ratingLikeService.getRatingLikeByUser(rating);
    }

    @PutMapping("/toggle-like/{id}")
    public RatingLike updateRatingLike(@PathVariable Integer id, @RequestBody RatingLike ratingLike) {
        return ratingLikeService.updateRatingLike(id, ratingLike);
    }
}
