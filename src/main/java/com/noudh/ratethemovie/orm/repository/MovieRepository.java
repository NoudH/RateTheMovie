package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.orm.entities.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface MovieRepository extends PagingAndSortingRepository<Movie, Long> {
    Page<Movie> findByActors_Actor_Name(Pageable pageable, String actors_name);

    @Query("SELECT m from Movie m join m.reviews r where avg(r.rating) >= ?1 ")
    Page<Movie> findByRating(Pageable pageable, Integer rating);

    //Page<Movie> findByReviews_Review_Rating(Integer reviews_review_rating, Pageable pageable)

    Page<Movie> findByDirectorName(Pageable pageable, String director);
}
