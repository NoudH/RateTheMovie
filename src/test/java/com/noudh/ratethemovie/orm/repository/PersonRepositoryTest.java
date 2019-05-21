package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.models.EmploymentJob;
import com.noudh.ratethemovie.orm.entities.Person;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

@RunWith(SpringRunner.class)
@DataJpaTest
public class PersonRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private PersonRepository personRepository;

    private static Date dateOfBirth = new Date();

    @Before
    public void setupDatabase() {
        Person person = new Person("test actor", "test imageUrl", dateOfBirth, null, EmploymentJob.ACTOR, "test description");
        entityManager.persist(person);
    }

    @Test
    public void findAll() {
        Assert.assertEquals(1, personRepository.findAll(Pageable.unpaged()).getTotalElements());
    }

    @Test
    public void findByNameContaining() {
        Assert.assertEquals(1, personRepository.findByNameContaining("test actor", Pageable.unpaged()).getTotalElements());
        Assert.assertEquals(1, personRepository.findByNameContaining("test", Pageable.unpaged()).getTotalElements());
        Assert.assertEquals(0, personRepository.findByNameContaining("wrong actor", Pageable.unpaged()).getTotalElements());
    }
}