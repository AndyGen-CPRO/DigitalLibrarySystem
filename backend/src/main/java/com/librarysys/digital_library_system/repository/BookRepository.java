package com.librarysys.digital_library_system.repository;

import com.librarysys.digital_library_system.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
