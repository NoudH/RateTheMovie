package com.noudh.ratethemovie.orm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.noudh.ratethemovie.models.EmploymentJob;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @Column(length = 100000)
    private String imageUrl;

    private Date dateOfBirth;

    @ManyToMany(mappedBy = "actors")
    //@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIgnore
    private List<Movie> movies;

    private EmploymentJob employmentJob;

    @Column(length = 100000)
    private String description;

    public Person(String name, String imageUrl, Date dateOfBirth, List<Movie> movies, EmploymentJob employmentJob, String description) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.dateOfBirth = dateOfBirth;
        this.movies = movies;
        this.employmentJob = employmentJob;
        this.description = description;
    }

    public Person() { }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    public EmploymentJob getEmploymentJob() {
        return employmentJob;
    }

    public void setEmploymentJob(EmploymentJob employmentJob) {
        this.employmentJob = employmentJob;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
