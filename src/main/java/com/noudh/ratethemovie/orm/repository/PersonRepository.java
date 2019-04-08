package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.models.EmploymentJob;
import com.noudh.ratethemovie.orm.entities.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, Long> {
    Page<Person> findByEmploymentJob(EmploymentJob employmentJob, Pageable pageable);
}
