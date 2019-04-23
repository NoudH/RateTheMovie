import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import Axios from "axios"

class Form extends Component {

    render() {
        const inputs = this.props.inputs.map(
            ({name, placeholder, type, value, className}, index) => (
                <Input key={index} name={name} placeholder={placeholder} type={type} value={value}
                       className={type==='submit'? className : ''} handleError={this.handleError}/>
            )
        );
        const errors = this.renderError();
        return (
            <form {...this.props} onSubmit={this.handleSubmit} ref={fm => {this.form=fm}} >
                {inputs}
                {errors}
            </form>
        )
    }

    constructor(props) {
        super(props);
        if(props.error) {
            this.state = {
                failure: 'wrong username or password!',
                errcount: 0
            }
        } else {
            this.state = { errcount: 0 }
        }
    }

    handleError = (field, errmsg) => {
        if(!field) return;

        if(errmsg) {
            this.setState((prevState) => ({
                failure: '',
                errcount: prevState.errcount + 1,
                errmsgs: {...prevState.errmsgs, [field]: errmsg}
            }))
        } else {
            this.setState((prevState) => ({
                failure: '',
                errcount: prevState.errcount===1? 0 : prevState.errcount-1,
                errmsgs: {...prevState.errmsgs, [field]: ''}
            }))
        }
    };

    renderError = () => {
        if(this.state.errcount || this.state.failure) {
            const errmsg = this.state.failure
                || Object.values(this.state.errmsgs).find(v=>v);
            return <div className="error">{errmsg}</div>
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(this.form);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        console.log(json);
        if(!this.state.errcount) {
            fetch(this.props.action, {
                method: this.props.method,
                body: json,
                headers: {
                    'Content-Type': "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {console.log(data); window.localStorage.setItem("jwt", data.token)})
                .then(() => window.location = "/index")
        }
    }
}

Form.propTypes = {
    name: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    inputs: PropTypes.array,
    error: PropTypes.string
};

export default Form