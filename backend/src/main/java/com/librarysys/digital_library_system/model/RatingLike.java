package com.librarysys.digital_library_system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class RatingLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn (name="user_id", updatable = false, nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn (name="rating_id", nullable = true)
    private Rating rating;

    private boolean liked;
}
