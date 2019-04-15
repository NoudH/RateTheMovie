import React from 'react'
import './components/css/Login.css'
import Form from './components/Form'

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
    className: "btn"
}];

const props = {
    name: 'loginForm',
    method: 'POST',
    action: '/perform_login',
    inputs: inputs
};

const params = new URLSearchParams(window.location.search);

class Login extends React.Component {
    render() {
        return (
            <Form {...props} error={params.get('error')} />
        );
    }
}

export default Login;