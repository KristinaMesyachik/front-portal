import React, { Component } from "react";
import UserService from "../services/UserService";
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
            error: ""
        }

        this.changePass = this.changePass.bind(this)
    }

    changePass(e) {
        let params = {
            newPassword: this.state.newPass,
            password: this.state.currentPass
        }
        if (this.state.newPass === this.state.confirmNewPass) {
            UserService.editPassword(params)
            this.setState({ error: "password chenged" })
        } else {
            this.setState({ error: "passwords don't match" })
        }
        e.preventDefault()
    }

    render() {
        return (
            <div className="main">
                <Form name="form" onSubmit={this.changePass}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 centered">
                                <div className="myDiv">
                                    <label className="myLabel"><h5>Change Password</h5></label>
                                    <hr></hr>
                                    <label className="myLabel required forInput">Current Password</label>
                                    <input className="myInput"
                                        value={this.state.firstname}
                                        onChange={(e) => this.setState({ currentPass: e.target.value })}
                                        type="password"
                                        required
                                    />
                                    <label className="myLabel required forInput">New Password</label>
                                    <input className="myInput"
                                        value={this.state.lastname}
                                        onChange={(e) => this.setState({ newPass: e.target.value })}
                                        type="password"
                                        required
                                    />
                                    <label className="myLabel required forInput">Confirm New Password</label>
                                    <input className="myInput"
                                        value={this.state.username}
                                        onChange={(e) => this.setState({ confirmNewPass: e.target.value })}
                                        type="password"
                                        required
                                    />
                                    <label className="myLabel">{this.state.error}</label>
                                    <button className="myBtn blueBtn">CHANGE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        );
    };
}
export default EditPassword;
