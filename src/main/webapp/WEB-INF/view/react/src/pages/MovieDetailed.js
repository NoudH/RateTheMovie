import React, {Component} from 'react';
import Axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Comment from "../components/Comment";
import './css/MovieDetailed.css'
import Actor from "../components/Actor";

class MovieDetailed extends Component {
    constructor(props) {
        super(props);
        this.state = {movie: {reviews: [], actors: []}, comment: "", rating: 0};
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

    postComment = () => {
        if (this.state.rating === 0) {
            return;
        }
        const params = new URLSearchParams(window.location.search);
        Axios.post('http://localhost:8080/api/review/?movieid=' + params.get("id"), {
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
                       imageUrl={imageUrl} name={name}/>
            ));
        return (
            <div>
                <NavigationBar/>
                <div className={"container"}>
                    <h1>{this.state.movie.title}</h1>
                    <h3 className={"text-secondary"}>{this.state.movie.releaseYear}</h3>
                    {
                        this.state.movie.trailerUrl !== undefined ?
                            this.state.movie.trailerUrl.includes("youtube") ?
                                <div className='embed-container'>
                                    <iframe id="ytplayer" type="text/html" width={"100%"} style={{maxHeight: "1000px"}}
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

MovieDetailed.propTypes = {};

export default MovieDetailed;
