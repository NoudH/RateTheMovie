package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.models.EmploymentJob;
import com.noudh.ratethemovie.orm.entities.Movie;
import com.noudh.ratethemovie.orm.entities.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {

    Page<Person> findByEmploymentJob(EmploymentJob employmentJob, Pageable pageable);

    Page<Person> findByName( String name, Pageable pageable);

    Person findByName(String name);

    Page<Person> findByMovies(Movie movie, Pageable pageable);

    Page<Person> findAll(Pageable pageable);
}
