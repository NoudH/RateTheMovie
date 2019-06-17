package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.models.Genre;
import com.noudh.ratethemovie.orm.entities.GenreEntity;
import com.noudh.ratethemovie.orm.entities.Movie;
import com.noudh.ratethemovie.orm.entities.Review;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Date;

@RunWith(SpringRunner.class)
@DataJpaTest
public class MovieRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private GenreRepository genreRepository;

    @Before
    public void setupDatabase() {
        for (Genre genre : Genre.values()) {
            entityManager.persist(new GenreEntity(genre));
        }

        Movie movie = new Movie(
                "test movie",
                "test trailerUrl",
                "test imageUrl",
                "test description",
                2019,
                null,
                null,
                null,
                null,
                Arrays.asList(genreRepository.findByGenre(Genre.ACTION), genreRepository.findByGenre(Genre.ADVENTURE))
        );
        movie = entityManager.persist(movie);
        Review review = new Review(4, null, movie, "comment", new Date());
        entityManager.persist(review);
        entityManager.flush();

    }

    @Test
    public void findByTitleContaining() {
        Assert.assertTrue(movieRepository.findByTitleContaining("test movie", Pageable.unpaged()).getTotalElements() > 0);
        Assert.assertTrue(movieRepository.findByTitleContaining("test", Pageable.unpaged()).getTotalElements() > 0);
        Assert.assertEquals(0, movieRepository.findByTitleContaining("wrong movie", Pageable.unpaged()).getTotalElements());
    }


    @Test
    public void findByRating() {
        Assert.assertTrue(movieRepository.findByRating(4D, Pageable.unpaged()).getTotalElements() > 0);
        Assert.assertTrue(movieRepository.findByRating(2D, Pageable.unpaged()).getTotalElements() > 0);
        Assert.assertEquals(0, movieRepository.findByRating(4.1D, Pageable.unpaged()).getTotalElements());
    }

    @Test
    public void findByTitleContainingAndRatingAndReleaseYearAndGenres() {
    }

    @Test
    @Ignore
    //Director not implemented
    public void findByDirectorName() {
    }

    @Test
    public void findByGenres_Genre() {
        Assert.assertTrue(movieRepository.findByGenres_Genre(Genre.ACTION, Pageable.unpaged()).getTotalElements() > 0);
        Assert.assertTrue(movieRepository.findByGenres_Genre(Genre.ADVENTURE, Pageable.unpaged()).getTotalElements() > 0);
        Assert.assertEquals(0, movieRepository.findByGenres_Genre(Genre.COMEDY, Pageable.unpaged()).getTotalElements());
    }

    @Test
    public void findByReleaseYear() {
        Assert.assertTrue(movieRepository.findByReleaseYear(2019, Pageable.unpaged()).getTotalElements() > 0);
        Assert.assertEquals(0, movieRepository.findByReleaseYear(2018, Pageable.unpaged()).getTotalElements());
        Assert.assertEquals(0, movieRepository.findByReleaseYear(2020, Pageable.unpaged()).getTotalElements());
    }

    @Test
    public void findAll() {
        Assert.assertTrue(movieRepository.findAll(Pageable.unpaged()).getTotalElements() > 0);
    }
}