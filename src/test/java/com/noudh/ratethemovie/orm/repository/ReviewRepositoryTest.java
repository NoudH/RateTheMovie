package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.models.UserRole;
import com.noudh.ratethemovie.orm.entities.Movie;
import com.noudh.ratethemovie.orm.entities.Review;
import com.noudh.ratethemovie.orm.entities.User;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collections;
import java.util.Date;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ReviewRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    private static User user1;
    private static Review review1;

    @Before
    public void setupDatabase() {
        Movie movie = new Movie(
                "test movie",
                "test trailerUrl",
                "test imageUrl",
                "test description",
                2019,
                Collections.singletonList(new Review(4, null, null, "comment", new Date())),
                null,
                null,
                null,
                null
        );
        Movie movie1 = entityManager.persist(movie);

        User user = new User("test user", "password", null, null, UserRole.ROLE_USER, true);
        user1 = entityManager.persist(user);

        Review review = new Review(4, user1, movie1, "test comment", new Date());
        review1 = entityManager.persist(review);
    }

    @Test
    public void findByUser() {
        Assert.assertEquals(review1, reviewRepository.findByUser(user1, Pageable.unpaged()).getContent().get(0));
    }
}