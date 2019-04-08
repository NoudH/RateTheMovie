package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.orm.entities.Review;
import com.noudh.ratethemovie.orm.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, Long> {

    Page<Review> findByUser(User user, Pageable pageable);
}
