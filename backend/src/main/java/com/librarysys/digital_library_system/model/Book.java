package com.librarysys.digital_library_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String author;
    private int publicationYear;
    private String genre;
    private String bookDescription;
    private double bookPrice;

    // Default constructor (required by JPA)
    public Book() {
    }

    // Parameterized constructor
    public Book(String title, String author, int publicationYear, String genre, String bookDescription, double bookPrice) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.genre = genre;
        this.bookDescription = bookDescription;
        this.bookPrice = bookPrice;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(int publicationYear) { this.publicationYear = publicationYear; }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getBookDescription() { return bookDescription; }

    public void setBookDescription(String bookDescription) {
        this.bookDescription = bookDescription;
    }

    public double getBookPrice() { return bookPrice; }

    public void setBookPrice(double bookPrice) { this.bookPrice = bookPrice;
    }
}
