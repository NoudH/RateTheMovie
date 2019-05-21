package com.noudh.ratethemovie.rest;

import com.noudh.ratethemovie.orm.entities.Person;
import com.noudh.ratethemovie.orm.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/person")
public class PersonController {

    private final PersonRepository personRepository;

    @Autowired
    public PersonController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @GetMapping(value = "/", params = {"page", "size"}, produces = "application/json")
    public Page<Person> getAllPersons(@RequestParam int page, @RequestParam int size){
        return personRepository.findAll(PageRequest.of(page, size));
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public Integer postPerson(@RequestBody Person person){
        return personRepository.save(person) != null ? 200 : 500;
    }

    @GetMapping(value = "/findById", produces = "application/json")
    public Optional<Person> findById(@RequestParam Long id){
        return personRepository.findById(id);
    }

    @GetMapping(value = "/findByName", params = {"name", "page", "size"}, produces = "application/json")
    public Page<Person> findPersonByName(@RequestParam String name, @RequestParam int page, @RequestParam int size){
        return personRepository.findByNameContaining(name, PageRequest.of(page, size));
    }

    @GetMapping(value = "/searchByName", params = {"name", "page", "size"}, produces = "application/json")
    public Page<Person> searchPersonByName(@RequestParam String name, @RequestParam int page, @RequestParam int size){
        return personRepository.findByNameContaining(name, PageRequest.of(page, size));
    }
}
