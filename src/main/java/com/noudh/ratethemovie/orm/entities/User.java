package com.noudh.ratethemovie.orm.entities;

import com.noudh.ratethemovie.models.UserRole;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String password;
    @OneToMany
    private List<Review> reviews;
    @OneToMany
    private List<Movie> movies;
    private UserRole userRole;

    public User(String username, String password, List<Review> reviews, List<Movie> movies, UserRole userRole) {
        this.username = username;
        this.password = password;
        this.reviews = reviews;
        this.movies = movies;
        this.userRole = userRole;
    }

    public User() { }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }
}
