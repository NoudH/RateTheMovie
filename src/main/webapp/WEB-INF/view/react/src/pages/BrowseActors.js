import React, {Component} from 'react';
import NavigationBar from "../components/NavigationBar";
import Axios from "axios";
import ActorBig from "../components/ActorBig";
import "./css/BrowseActors.css"
import PageControls from "../components/PageControls";

class BrowseActors extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", actors: [], lastPage: 0, page: 1}
    }

    componentDidMount() {
        Axios.get('http://localhost:8080/api/person/?page=' + (this.state.page - 1)  + '&size=20')
            .then(res => {
                console.log(res);
                const data = res.data;
                this.setState({actors: data.content, lastPage: data.totalPages});
            });
    }

    findActors(){
        Axios.get('http://localhost:8080/api/person/findByName?page=' + (this.state.page - 1) + '&size=20&name=' + this.state.name)
            .then(res => {
                console.log(res);
                const data = res.data;
                this.setState({actors: data.content, lastPage: data.totalPages});
            });
    }

    setPage = (pagenr) => {
        this.setState({page: pagenr}, () => this.findActors())
    };

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className={"container"}>
                    <h2>Search for Actors:</h2>
                    <input type={"text"} className={"bg-white"} id={"title"} name={"title"} placeholder={"Search"}
                           onChange={(event) => {
                               this.setState({name: event.target.value, page: 1}, () => this.findActors());
                           }}/>
                    <PageControls page={this.state.page} lastPage={this.state.lastPage} onChange={(pagenr) => this.setPage(pagenr)}/>
                    {
                        this.state.actors.map( ({id, name, dateOfBirth, imageUrl, description}, index) =>
                            <ActorBig key={index} ident={id} name={name} dateOfBirth={dateOfBirth} imageUrl={imageUrl} description={description}/>
                        )
                    }
                    <PageControls page={this.state.page} lastPage={this.state.lastPage} onChange={(pagenr) => this.setPage(pagenr)}/>
                </div>
            </div>
        );
    }
}

export default BrowseActors;
