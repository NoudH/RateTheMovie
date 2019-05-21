package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.orm.entities.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {

    Page<Person> findAll(Pageable pageable);

    Page<Person> findByNameContaining(String name, Pageable pageable);
}
