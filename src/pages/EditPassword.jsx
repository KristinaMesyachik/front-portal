import React, { Component } from "react";
import UserService from "../services/UserService";

import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";

import '../components/styles/ListField.css'
import '../components/styles/MyButton.css'
import '../components/styles/MyInput.css'
import '../components/styles/MyLabel.css'


class EditPassword extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentPass: "",
            newPass: "",
            confirmNewPass: "",
            error:""
        }

        this.changePass = this.changePass.bind(this)
    }

    changePass(e) {
        let params = {
            password: this.state.currentPass,
            newPassword: this.state.newPass
        }
        if (this.state.newPass === this.state.confirmNewPass) {
            console.log(params)
           /*  UserService.editPassword(params) */
            e.preventDefault()
            this.setState({error : "password chenge"})
        }else {
            this.setState({error : "passwords don't match"})
            e.preventDefault()
        }
    }

    render() {
        return (
            <div>
                <Form name="form" onSubmit={this.changePass}>
                    <Container className="col-md-3">
                        <label className="myLabel required">Current Password</label>
                        <input className="myInput"
                            value={this.state.firstname}
                            onChange={(e) => this.setState({ currentPass: e.target.value })}
                            type="password"
                            required
                        />
                        <label className="myLabel required">New Password</label>
                        <input className="myInput"
                            value={this.state.lastname}
                            onChange={(e) => this.setState({ newPass: e.target.value })}
                            type="password"
                            required
                        />
                        <label className="myLabel required">Confirm New Password</label>
                        <input className="myInput"
                            value={this.state.username}
                            onChange={(e) => this.setState({ confirmNewPass: e.target.value })}
                            type="password"
                            required
                        />
                        <label className="myLabel">{this.state.error}</label>
                        <button className="myBtn blueBtn">CHANGE</button>
                    </Container>
                </Form>
            </div>
        );
    };
}
export default EditPassword;
