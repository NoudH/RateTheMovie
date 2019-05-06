import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./css/AddMovie.css"

class AddMovie extends Component {

    render() {
        return (
            <div id={"rootDiv"}>
                <div className={"container"}>
                    <h2 className={"text-center"}>Add Movie</h2>

                    <label htmlFor={"title"}>Title</label>
                    <input type={"text"} placeholder={"title"} name={"title"} id={"title"}/>

                    <label htmlFor={"releaseYear"}>Title</label>
                    <input type={"text"} placeholder={"release year"} name={"releaseYear"} id={"releaseYear"}/>

                    <label htmlFor={"description"}>Title</label>
                    <input type={"multiline"} placeholder={"description"} name={"description"} id={"description"} />
                </div>
            </div>
        );
    }
}

AddMovie.propTypes = {};

export default AddMovie;
