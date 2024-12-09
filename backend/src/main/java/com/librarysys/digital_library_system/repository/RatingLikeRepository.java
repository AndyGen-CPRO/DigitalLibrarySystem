package com.librarysys.digital_library_system.repository;

import com.librarysys.digital_library_system.model.Rating;
import com.librarysys.digital_library_system.model.RatingLike;
import com.librarysys.digital_library_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RatingLikeRepository extends JpaRepository<RatingLike, Integer> {
    List<RatingLike> findByRating(Rating rating);
    @Query("SELECT COUNT(rl) FROM RatingLike rl WHERE rl.rating = :rating AND rl.liked = true")
    long countLikesByRating(@Param("rating") Rating rating);

    Optional<RatingLike> findByUserAndRating(User user, Rating rating);

}
