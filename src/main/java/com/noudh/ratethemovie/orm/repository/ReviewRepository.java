package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.orm.entities.Review;
import com.noudh.ratethemovie.orm.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Long> {

    Page<Review> findByUser(User user, Pageable pageable);

    Page<Review> findByMovie_Id(Long movie_id, Pageable pageable);

    List<Review> findByUser_UsernameAndMovie_Id(String user_username, Long movie_id);
}
