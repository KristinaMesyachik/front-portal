import React, { Component } from "react";
import UserService from "../services/UserService";
import logo from '../components/navbar/logo1.svg'
import { Form } from "react-bootstrap";
import '../components/styles/Login.css'
import { Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import '../components/styles/MyDiv.css'

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            firstname: "",
            lastname: "",
            phone: "",
            shouldRedirect: false
        }
        this.signUp = this.signUp.bind(this)
    }

    signUp(e) {
        e.preventDefault()
        if (this.state.password === this.state.confirmPassword) {
            let user = {
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                phone: this.state.phone,
            }
            UserService.singup(user)
            .then((response) => {
                this.setState({
                    message: response.data.message,
                    successful: true
                  });
                this.setState({ shouldRedirect: true })
            })
            .catch(() => {
                this.setState({ hasLoginFailed: true })
            })
        } else {
            this.setState({ hasLoginFailed: true })
        }
    }

    render() {
        return (
            <div className="main" >
                {this.state.shouldRedirect && <Navigate replace to="/login" />}
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 centered">
                            <div className="myDiv">
                                <div className="blockCenter">
                                    <img className="logo" src={logo}
                                        width="200" height="50"
                                        alt="React Bootstrap logo"
                                    />
                                    <h4>Sign Up</h4>
                                </div>

                                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}

                                <Form name="login" onSubmit={this.signUp}>

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

                                    <div className="form-outline mb-4">
                                        <input type="password"
                                            className="form-control"
                                            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                            value={this.state.confirmPassword}
                                            placeholder="Confirm Password"
                                            required />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="text"
                                            className="form-control"
                                            onChange={(e) => this.setState({ firstname: e.target.value })}
                                            value={this.state.firstname}
                                            placeholder="Firstname"
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="text"
                                            className="form-control"
                                            onChange={(e) => this.setState({ lastname: e.target.value })}
                                            value={this.state.lastname}
                                            placeholder="Lastname"
                                        />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text"
                                            className="form-control"
                                            onChange={(e) => this.setState({ phone: e.target.value })}
                                            value={this.state.phone}
                                            placeholder="Phone"
                                        />
                                    </div>
                                    <div class="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary btn-block mb-4">SIGN UP</button>
                                    </div>
                                    <div className="text-center">
                                        <p>Already have account? <a href="/login/"> Log in </a></p>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Registration;
