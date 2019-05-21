package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.models.Genre;
import com.noudh.ratethemovie.orm.entities.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface MovieRepository extends PagingAndSortingRepository<Movie, Long> {

    Page<Movie> findByTitleContaining(String title, Pageable pageable);

    @Query("SELECT m from Movie m where (?1 <= (select avg(r.rating) from Movie mo left join mo.reviews r where mo.id = m.id))")
    Page<Movie> findByRating(Double rating, Pageable pageable);

    @Query( "SELECT m " +
            "from Movie m " +
            "where m.title like CONCAT('%',?1,'%') and " +
            "(?2 <= (select avg(r.rating) from Movie mo left join mo.reviews r where mo.id = m.id) or 0 = (select count(r) from Movie mo left join mo.reviews r where mo.id = m.id group by mo)) and" +
            "(m.releaseYear = ?3 or ?3 = 0) and "+
            "(m.id in (select distinct mo.id from Movie mo left join mo.genres g where g.genre = ?4) or ?4 is null)")
    Page<Movie> findByTitleContainingAndRatingAndReleaseYearAndGenres(String title, Double rating, Integer year, Genre genre, Pageable pageable);

    Page<Movie> findByDirectorName(String director, Pageable pageable);

    Page<Movie> findByGenres_Genre(Genre genre, Pageable pageable);

    Page<Movie> findByReleaseYear(Integer releaseYear, Pageable pageable);

    Page<Movie> findAll(Pageable pageable);
}
