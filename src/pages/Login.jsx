import React, { Component } from "react";
import UserService from "../services/UserService";
import logo from '../components/navbar/logo1.svg'
import { Form } from "react-bootstrap";
import { Navigate } from 'react-router-dom'
import '../components/styles/Login.css'
import 'bootstrap/dist/css/bootstrap.css';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            hasLoginFailed: false,
            shouldRedirect: false
        }
        this.login = this.login.bind(this)
    }

    login(e) {
        e.preventDefault()
        UserService.login(this.state.username, this.state.password)
            .then((msg) => {
                UserService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.setState({ shouldRedirect: true })
            })
            .catch(() => {
                this.setState({ hasLoginFailed: true })
            })
    }

    render() {
        return (
            <div className="main" >
                {this.state.shouldRedirect && <Navigate replace to="/fields" />}
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 centered">
                            <div className="blockCenter">
                                <img className="logo" src={logo}
                                    width="200" height="50"
                                    alt="React Bootstrap logo"
                                />
                                <h4>Log In</h4>
                            </div>

                            {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                            <Form name="login" onSubmit={this.login}>

                                <div className="form-outline mb-4">
                                    <input type="text"
                                        className="form-control"
                                        onChange={(e) => this.setState({ username: e.target.value })}
                                        value={this.state.username}
                                        placeholder="Email"
                                        required />
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password"
                                        className="form-control"
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                        value={this.state.password}
                                        placeholder="Password"
                                        required />
                                </div>

                                <div className="row mb-2">
                                    <div className="col d-flex justify-content-center">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="form2Example31"
                                                checked />
                                            <label className="form-check-label" for="form2Example31"> Remember me </label>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <a href="#!">Forgot your password?</a>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">LOG IN</button>
                                <div className="text-center">
                                    <p>Don't have account? <a href="/registration">Sign Up</a></p>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Login;
