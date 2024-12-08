package com.librarysys.digital_library_system.repository;

import com.librarysys.digital_library_system.model.Book;
import com.librarysys.digital_library_system.model.Rating;
import com.librarysys.digital_library_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findByBook(Book book);
    Rating findByUserAndBook(User user, Book book);
}
