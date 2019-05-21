package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.models.Genre;
import com.noudh.ratethemovie.orm.entities.GenreEntity;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class GenreRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private GenreRepository genreRepository;

    @Before
    public void setupDatabase() {
        for (Genre genre : Genre.values()) {
            entityManager.persist(new GenreEntity(genre));
        }
    }

    @Test
    public void findByGenre() {
        Assert.assertEquals(Genre.ACTION, genreRepository.findByGenre(Genre.ACTION).getGenre());
    }

    @Test
    public void findByGenreIn() {
        Assert.assertTrue(genreRepository.findByGenreIn(Arrays.asList(Genre.ACTION, Genre.ADVENTURE)).stream().allMatch(genreEntity -> genreEntity.getGenre().equals(Genre.ACTION) || genreEntity.getGenre().equals(Genre.ADVENTURE)));
    }
}