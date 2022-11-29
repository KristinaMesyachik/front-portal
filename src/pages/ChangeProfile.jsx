import React, { Component } from "react";
import UserService from "../services/UserService";

import { Form } from "react-bootstrap";

import '../components/styles/ListField.css'
import '../components/styles/MyButton.css'
import '../components/styles/MyInput.css'
import '../components/styles/MyLabel.css'
import '../components/styles/MySelect.css'
import '../components/styles/MyTextarea.css'
import '../components/styles/MyDiv.css'
import '../components/styles/MyTextForInput.css'

class ChangeProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id:"",
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
            this.setState({ id: user.id });
            this.setState({ firstname: user.firstname });
            this.setState({ lastname: user.lastname })
            this.setState({ username: user.username })
            this.setState({ phone: user.phone })
        });
    };

    updateProfile() {
        let user = {
            id: this.state.id,
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone
        }
        UserService.update(user)
    }

    render() {
        return (
            <div className="main">
                <Form name="form" onSubmit={this.updateProfile}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 centered">
                                <div className="myDiv">
                                    <label className="myLabel"><h5>Edit Profile</h5></label>
                                    <hr></hr>
                                    <label className="myLabel forInput">First Name</label>
                                    <input className="myInput"
                                        value={this.state.firstname}
                                        onChange={(e) => this.setState({ firstname: e.target.value })}
                                        type="text"
                                        required={false}
                                    />
                                    <label className="myLabel forInput">Last Name</label>
                                    <input className="myInput"
                                        value={this.state.lastname}
                                        onChange={(e) => this.setState({ lastname: e.target.value })}
                                        type="text"
                                        required={false}
                                    />
                                    <label className="myLabel required forInput">Email</label>
                                    <input className="myInput"
                                        value={this.state.username}
                                        onChange={(e) => this.setState({ username: e.target.value })}
                                        type="email"
                                        required
                                    />
                                    <label className="myLabel forInput">Phone Number</label>
                                    <input
                                        className="myInput"
                                        pattern="^$|[+][0-9]{12}|[0-9]{11}"
                                        type="text"
                                        value={this.state.phone}
                                        onChange={(e) => { this.setState({ phone: e.target.value }) }
                                        }
                                        required={false}
                                        placeholder="+xxxxxxxxxxxx"
                                    />
                                    <button className="myBtn blueBtn">SAVE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div >
        );
    };
}
export default ChangeProfile;
