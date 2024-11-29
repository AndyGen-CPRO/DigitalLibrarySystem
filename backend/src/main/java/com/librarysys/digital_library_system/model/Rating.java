package com.librarysys.digital_library_system.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn (name="user_id", updatable = false, nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn (name="book_id", updatable = false, nullable = false)
    private Book book;

    @Column (nullable = false)
    private Float rating;

    @Column(length = 1000)
    private String review;

    @Column(name="date_posted", nullable = false)
    private LocalDate date;
}
