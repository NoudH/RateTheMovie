import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Input from "../components/Form";
import Comment from "../components/Comment";
import './css/MovieDetailed.css'
import Actor from "../components/Actor";

class MovieDetailed extends Component {
    constructor(props) {
        super(props);
        this.state = { movie: { reviews:[], actors:[] } };
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        Axios.get('http://localhost:8080/api/movie/?id=' + params.get("id"))
            .then(res => {
                console.log(res);
                const movieData = res.data;
                this.setState({movie: movieData});
            });
    }

    render() {
        const reviews = this.state.movie.reviews.map(
            ({id, rating, user, comment, date}, index) => (
                <Comment key={index} comment={comment} rating={rating} user={user} date={date}/>
            )
        );
        const actors = this.state.movie.actors.map(
            ({id, dateOfBirth, description, employmentJob, imageUrl, name}, index) => (
                <Actor key={index} dateOfBirth={dateOfBirth} description={description} employmentJob={employmentJob} imageUrl={imageUrl} name={name} />
            ));
        return (
            <div>
                <NavigationBar/>
                <div className={"container"}>
                    <h1>{this.state.movie.title}</h1>
                    <h3 className={"text-secondary"}>{this.state.movie.releaseYear}</h3>
                    <video width="100%" controls>
                        <source src={this.state.movie.trailerUrl} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <h4 className={"mt-3"}>Actors:</h4>
                    {actors}
                    <h4 className={"mt-3"}>Comments:</h4>
                    {reviews}
                </div>
            </div>
        );
    }
}

MovieDetailed.propTypes = {};

export default MovieDetailed;
