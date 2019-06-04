import React, {Component} from 'react';
import Axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Comment from "../components/Comment";
import './css/MovieDetailed.css'
import Actor from "../components/Actor";
import FindMovieById from "../api/FindMovieById";

class MovieDetailed extends Component {
    constructor(props) {
        super(props);
        this.state = {movie: {reviews: [], actors: []}, comment: "", rating: 0};
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        FindMovieById(params.get("id")).then(data => {
            this.setState({movie: data});
        });
    }

    postComment = () => {
        if (this.state.rating === 0) {
            return;
        }
        const params = new URLSearchParams(window.location.search);
        Axios.post('http://localhost:8080/api/reviews/?movieid=' + params.get("id"), {
            rating: this.state.rating,
            comment: this.state.comment
        }, {
            headers: {
                Authorization: "Bearer " + window.sessionStorage.getItem("jwt")
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    window.location = window.location;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const reviews = this.state.movie.reviews.map(
            ({id, rating, user, comment, date}, index) => (
                <Comment key={index} comment={comment} rating={rating} user={user} date={date}/>
            )
        );
        const actors = this.state.movie.actors.map(
            ({id, dateOfBirth, description, employmentJob, imageUrl, name}, index) => (
                <Actor key={index} dateOfBirth={dateOfBirth} description={description} employmentJob={employmentJob}
                       imageUrl={imageUrl} name={name} id={id}/>
            ));
        return (
            <div>
                <NavigationBar/>
                <div className={"container"}>
                    <h1>{this.state.movie.title}</h1>
                    <h3 className={"text-secondary"}>{this.state.movie.releaseYear}</h3>
                    {
                        this.state.movie.trailerUrl !== undefined && this.state.movie.trailerUrl !== null ?
                            this.state.movie.trailerUrl.includes("youtube") ?
                                <div className='embed-container'>
                                    <iframe id="ytplayer" width={"100%"} style={{maxHeight: "1000px"}}
                                            src={"https://www.youtube.com/embed/" + this.state.movie.trailerUrl.substr(this.state.movie.trailerUrl.length - 11) + "?autoplay=1"}
                                            frameBorder="0" allowFullScreen={true}/>
                                </div>
                                : <video width="100%" controls>
                                    <source src={this.state.movie.trailerUrl} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            : <video width="100%" controls>
                                <source src={this.state.movie.trailerUrl} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                    }
                    <h4 className={"mt-3"}>Description:</h4>
                    {this.state.movie.description}
                    <h4 className={"mt-3"}>Actors:</h4>
                    {actors}
                    <h4 className={"mt-3"}>Comments:</h4>
                    {
                        window.sessionStorage.getItem("jwt") !== null ?
                            <div className={"commentForm"}>
                                <h4>Write a comment:</h4>
                                <input className={"bg-white"} type={"number"} placeholder={"Rating"} max={5} min={1}
                                       onChange={(event) => {
                                           let val = parseInt(event.target.value);
                                           if (val > 5) {
                                               val = 5;
                                           }
                                           this.setState({rating: val})
                                       }}/>
                                <textarea className={"bg-white"} placeholder={"Comment"}
                                          onChange={(event) => this.setState({comment: event.target.value})}/>
                                <button className={"btn btn-primary"} onClick={this.postComment}>Submit</button>
                            </div>
                            : ""
                    }
                    {reviews}
                </div>
            </div>
        );
    }
}

export default MovieDetailed;
