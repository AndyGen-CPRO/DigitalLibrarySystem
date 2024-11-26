package com.librarysys.digital_library_system.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ratingId;

    @Column (updatable = false, nullable = false)
    private Integer userId;

    @Column (updatable = false, nullable = false)
    private Integer bookId;

    @Column (nullable = false)
    private Float rating;

    @Column(length = 1000)
    private String review;

    @Column(name="date_posted", nullable = false)
    private LocalDate date;
}
