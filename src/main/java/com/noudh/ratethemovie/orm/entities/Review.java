package com.noudh.ratethemovie.orm.entities;

import javax.persistence.*;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer rating;
    @ManyToOne
    private User user;
    private String comment;

    public Review(Integer rating, User user, String comment) {
        this.rating = rating;
        this.user = user;
        this.comment = comment;
    }

    public Review() { }

    public Long getId() {
        return id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
