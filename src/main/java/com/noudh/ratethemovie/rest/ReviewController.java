package com.noudh.ratethemovie.rest;

import com.noudh.ratethemovie.orm.entities.Review;
import com.noudh.ratethemovie.orm.repository.MovieRepository;
import com.noudh.ratethemovie.orm.repository.ReviewRepository;
import com.noudh.ratethemovie.orm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Date;

@RestController
@RequestMapping("/api/reviews")
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
        if(reviewRepository.findByUser_UsernameAndMovie_Id(principal.getName(), movieid).isEmpty()) {
            review.setDate(new Date());
            review.setUser(userRepository.findByUsername(principal.getName()));
            review.setMovie(movieRepository.findById(movieid).orElseThrow(NullPointerException::new));
            return reviewRepository.save(review) != null ? 200 : 500;
        } else {
            Review oldReview = reviewRepository.findByUser_UsernameAndMovie_Id(principal.getName(), movieid).get(0);
            oldReview.setDate(new Date());
            oldReview.setComment(review.getComment());
            oldReview.setRating(review.getRating());
            return reviewRepository.save(oldReview) != null ? 200 : 500;
        }
    }

    @GetMapping(value = "/", produces = "application/json")
    public Page<Review> getReviewFromMovie(@RequestParam int page, @RequestParam int size, @RequestParam Long id){
        return reviewRepository.findByMovie_Id(id, PageRequest.of(page, size));
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
