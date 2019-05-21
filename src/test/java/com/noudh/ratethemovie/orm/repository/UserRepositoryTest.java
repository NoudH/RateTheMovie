package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.models.UserRole;
import com.noudh.ratethemovie.orm.entities.User;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    private static User user1;

    @Before
    public void setupDatabase() {
        User user = new User("test user", "password", null, null, UserRole.ROLE_USER, true);
        user1 = entityManager.persist(user);
    }

    @Test
    public void findByUsername() {
        Assert.assertEquals(user1, userRepository.findByUsername("test user"));
    }
}