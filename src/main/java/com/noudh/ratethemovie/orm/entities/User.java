package com.noudh.ratethemovie.orm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.noudh.ratethemovie.models.UserRole;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long id;

    private String username;

    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Review> reviews;

    @OneToMany
    private List<Movie> movies;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @JsonIgnore
    private Boolean enabled;

    public User(String username, String password, List<Review> reviews, List<Movie> movies, UserRole userRole, Boolean enabled) {
        this.username = username;
        this.password = password;
        this.reviews = reviews;
        this.movies = movies;
        this.userRole = userRole;
        this.enabled = enabled;
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

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
