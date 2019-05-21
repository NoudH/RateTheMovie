import React, {Component} from 'react';
import "./css/SignUp.css"
import Axios from "axios";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: "", repeatPassword: "", showError: false};
    }

    registerUser() {
        Axios.post('http://localhost:8080/api/user/register', {
            username: this.state.username,
            password: this.state.password
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    window.sessionStorage.setItem("jwt", response.data.token);
                    window.location = "/index";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div id="loginRoot">
                    <div id="container">
                        <div className={"form"}>
                            <h3>Sign up:</h3>
                            <input name={"username"} placeholder={"username"} type={"text"}
                                   onChange={(event) => this.setState({username: event.target.value})}/>
                            <input name={"password"} placeholder={"password"} type={"password"}
                                   onChange={(event) => this.setState({password: event.target.value})}/>
                            <input name={"password"} placeholder={"repeat password"} type={"password"}
                                   onChange={(event) => {
                                       this.setState({repeatPassword: event.target.value}, () => {
                                           this.setState({showError: this.state.password !== this.state.repeatPassword})
                                       })
                                   }}/>
                            <span className={this.state.showError ? "text-danger" : "text-danger d-none"}>Passwords don't match!</span>
                            <input type={"submit"} className={"btn btn-dark"} value={"Submit"}
                                   onClick={() => this.registerUser()}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
