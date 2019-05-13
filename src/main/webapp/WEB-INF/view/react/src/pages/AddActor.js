import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NavigationBar from "../components/NavigationBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/AddActor.css"
import Axios from "axios";

class AddActor extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", dateOfBirth: new Date(), imageUrl: "", description: "", employmentJob: 0}
    }

    postActor = () => {
        Axios.post('http://localhost:8080/api/person/', {
            name: this.state.name,
            dateOfBirth: this.state.dateOfBirth,
            imageUrl: this.state.imageUrl,
            description: this.state.description,
            employmentJob: this.state.employmentJob
        }, {
            headers: {
                Authorization: "Bearer " + window.sessionStorage.getItem("jwt")
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    changeDateOfBirth = (date) => {
        this.setState({dateOfBirth: date});
    };

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className={"container"}>
                    <span className={"h1"}>Add an Actor</span>
                    <button className={"btn btn-primary float-right"} onClick={this.postActor}>Save</button>
                    <h4>Name:</h4>
                    <input type={"text"} placeholder={"Name"} name={"name"} id={"name"} onChange={(event) => {this.setState({name: event.target.value})}}/>
                    <h4>Date of Birth:</h4>
                    <DatePicker
                        selected={this.state.dateOfBirth}
                        onChange={this.changeDateOfBirth}
                        dateFormat={"dd/MM/yyyy"}
                    />
                    <h4>Description:</h4>
                    <textarea placeholder={"description"} id={"description"} onChange={(event) => this.setState({description: event.target.value})}/>
                    <h4>Image:</h4>
                    <input type={"text"} placeholder={"Image Url"} name={"imageUrl"} id={"imageUrl"} onChange={(event) =>{this.setState({imageUrl: event.target.value})}}/>
                    <img src={this.state.imageUrl} id={"actorImage"}/>
                </div>
            </div>
        );
    }
}

AddActor.propTypes = {};

export default AddActor;
