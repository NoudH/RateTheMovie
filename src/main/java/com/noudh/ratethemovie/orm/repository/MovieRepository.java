package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.models.Genre;
import com.noudh.ratethemovie.orm.entities.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface MovieRepository extends PagingAndSortingRepository<Movie, Long> {
    Page<Movie> findByActors_Name(String actors_name, Pageable pageable);

    @Query("SELECT m from Movie m join m.reviews r where avg(r.rating) >= ?1 ")
    Page<Movie> findByRating(Integer rating, Pageable pageable);

    Page<Movie> findByDirectorName(String director, Pageable pageable);

    Page<Movie> findByGenres_Genre(Genre genre, Pageable pageable);

    Page<Movie> findByReleaseYear(Integer releaseYear, Pageable pageable);

    Page<Movie> findAll(Pageable pageable);
}
