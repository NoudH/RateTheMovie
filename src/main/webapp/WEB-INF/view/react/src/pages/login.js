import React from 'react'
import './css/Login.css'
import Form from '../components/Form'

const inputs = [{
    name: "username",
    placeholder: "username",
    type: "text"
},{
    name: "password",
    placeholder: "password",
    type: "password"
},{
    type: "submit",
    value: "Submit",
    className: "btn btn-dark"
}];

const props = {
    name: 'loginForm',
    method: 'POST',
    action: 'http://145.93.92.211:8080/api/user/login',
    inputs: inputs
};

const params = new URLSearchParams(window.location.search);

class Login extends React.Component {
    render() {
        return (
            <div id={"loginRoot"}>
                <div id={"container"}>
                    <Form {...props} error={params.get('error')} />
                </div>
            </div>
        );
    }
}

export default Login;