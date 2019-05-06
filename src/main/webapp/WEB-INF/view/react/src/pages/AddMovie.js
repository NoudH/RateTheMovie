import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./css/AddMovie.css"

class AddMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {imgUrl : ""}
    }

    render() {
        return (
            <div id={"rootDiv"}>
                <div className={"container"}>
                    <h2 className={"text-center"}>Add Movie</h2>
                    <div className={"row"}>
                        <div className={"col-md-6"}>

                        <label htmlFor={"title"}>Title:</label>
                        <input type={"text"} placeholder={"title"} name={"title"} id={"title"}/>

                        <label htmlFor={"releaseYear"}>Release Year:</label>
                        <input type={"text"} placeholder={"release year"} name={"releaseYear"} id={"releaseYear"}/>

                        <label htmlFor={"description"}>Description:</label>
                        <textarea placeholder={"description"} name={"description"} id={"description"}/>
                        </div>
                        <div className={"col-md-6"}>
                            <label htmlFor={"imageUrl"}>Image Url:</label>
                            <input type={"text"} placeholder={"Image Url"} name={"imageUrl"} id={"imageUrl"} onChange={(event)=>{this.setState({imgUrl : event.target.value})}}/>
                            <img id={"image"} src={this.state.imgUrl} alt={"image"}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddMovie.propTypes = {};

export default AddMovie;
