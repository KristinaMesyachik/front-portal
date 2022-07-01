import React, { Component } from "react";
import UserService from "../services/UserService";

import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";

import '../components/styles/ListField.css'
import '../components/styles/MyButton.css'
import '../components/styles/MyInput.css'
import '../components/styles/MyLabel.css'
import '../components/styles/MySelect.css'
import '../components/styles/MyTextarea.css'
import 'react-phone-number-input/style.css'

class ChangeProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            phone: ""
        }

        this.updateProfile = this.updateProfile.bind(this)
    }

    componentDidMount() {
        UserService.findByUsername().then((res) => {
            let user = res.data;
            this.setState({ firstname: user.firstname });
            this.setState({ lastname: user.lastname })
            this.setState({ username: user.username })
            this.setState({ phone: user.phone })
        });
    };

    updateProfile() {
        let user = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone
        }
        UserService.update(user)
    }

    render() {
        return (
            <div>
                <Form name="form" onSubmit={this.updateProfile}>
                    <Container className="col-md-3">
                        <label className="myLabel">First Name</label>
                        <input className="myInput"
                            value={this.state.firstname}
                            onChange={(e) => this.setState({ firstname: e.target.value })}
                            type="text"
                            required={false}
                        />
                        <label className="myLabel">Last Name</label>
                        <input className="myInput"
                            value={this.state.lastname}
                            onChange={(e) => this.setState({ lastname: e.target.value })}
                            type="text"
                            required={false}
                        />
                        <label className="myLabel required">Email</label>
                        <input className="myInput"
                            value={this.state.username}
                            onChange={(e) => this.setState({ username: e.target.value })}
                            type="email"
                            required
                        />
                        <label className="myLabel">Phone Number</label>
                        <input
                            pattern="[+][0-9]{12}"
                            type="text"
                            value={this.state.phone}
                            onChange={(e) => { this.setState({ phone: e.target.value }) }
                            }
                            required={false}
                            placeholder = "+xxxxxxxxxxxx"

                        />
                        <button className="myBtn blueBtn">SAVE</button>
                    </Container>
                </Form>
            </div>
        );
    };
}
export default ChangeProfile;
