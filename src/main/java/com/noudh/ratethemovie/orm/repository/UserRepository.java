package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.orm.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
}
