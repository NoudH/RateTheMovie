package com.noudh.ratethemovie.rest;

import com.noudh.ratethemovie.orm.entities.Review;
import com.noudh.ratethemovie.orm.repository.MovieRepository;
import com.noudh.ratethemovie.orm.repository.ReviewRepository;
import com.noudh.ratethemovie.orm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
@RequestMapping("/review")
public class ReviewController {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;

    @Autowired
    public ReviewController(UserRepository userRepository, ReviewRepository reviewRepository, MovieRepository movieRepository) {
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.movieRepository = movieRepository;
    }

    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public Integer postReview(@RequestBody Review review, @RequestParam Long movieid, Principal principal){
        review.setUser(userRepository.findByUsername(principal.getName()));
        review.setMovie(movieRepository.findById(movieid).orElseThrow(NullPointerException::new));
        return reviewRepository.save(review) != null ? 200 : 500;
    }

    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @DeleteMapping(value = "/", produces = "application/json")
    public Integer deleteReview(Principal principal, HttpServletRequest request, @RequestParam Long reviewId){
        if(reviewRepository.findById(reviewId).orElseThrow(NullPointerException::new).getUser().getUsername().equals(principal.getName()) || request.isUserInRole("ROLE_ADMIN")){
            reviewRepository.delete(reviewRepository.findById(reviewId).orElseThrow(NullPointerException::new));
            return 200;
        }
        return 403;
    }
}
