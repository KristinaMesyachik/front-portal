import React, { Component } from 'react'
import FieldService from "../services/FieldService";
import SockJsClient from 'react-stomp';
import ResponseService from "../services/ResponseService";
import cl2 from '../components/styles/ListField.css'
import { Form } from "react-bootstrap";

function Find(props) {

    if (props.fields.type === 'SINGLE_LINE_TEXT') {

        return (
            <div >
                <label>
                    {props.fields.label}
                </label>
                <input className="myInput"
                    onChange={(e) => {
                        let value = e.target.value
                        props.findAnswerChild(value, props.fields)
                    }}
                    type="text"
                    required={props.fields.isRequired}
                />
            </div>)
    } else if (props.fields.type === 'MULTILINE_TEXT') {

        return (<div >
            <label>
                {props.fields.label}
            </label>
            <textarea className="myTextarea"/* 
                value={this.state.options.title}
                onChange={(e) => this.setState({ options: e.target.value })} */
                type="text"
                required={props.fields.isRequired}
            />
        </div>)
    } else if (props.fields.type === 'RADIO_BUTTON') {
        return (<div>
            <label>
                {props.fields.label}
            </label>
            {props.fields.options.map((option) => (
                <div>
                    <input
                        type="radio"
                        name={props.fields.label}
                        value={option.title}
                        checked
                        required={props.fields.isRequired}
                    /* 
                    onChange={(e) => this.setState({ isRequired: !this.state.isRequired }) */
                    />
                    <label>
                        {option.title}
                    </label>
                </div>
            ))}
        </div>)
    } else if (props.fields.type === 'CHECKBOX') {

        return (<div>
            <label>
                {props.fields.label}
            </label>
            {props.fields.options.map((option) => (
                <div>
                    <input
                        type="checkbox"
                        name={props.fields.label}
                        required={props.fields.isRequired}
                    /* 
                    onChange={(e) => this.setState({ isRequired: !this.state.isRequired }) */
                    />
                    <label>
                        {option.title}
                    </label>
                </div>
            ))}
        </div>)
    } else if (props.fields.type === 'COMBOBOX') {

        return (<div>
            <label>
                {props.fields.label}
            </label>
            <select className="mySelect"/* 
                defaultValue={this.state.type}
                value={this.setState.type}
                onChange={(e) => this.setState({ type: e.target.value })} */
                required={props.fields.isRequired}>
                {props.fields.options.map((option) => (
                    <option value={option.title} >{option.title}</option>
                ))}
            </select>
        </div >)
    } else {
        let today = new Date().toISOString().split("T")[0];
        return (<div>
            <label>
                {props.fields.label}
            </label>
            <input
                type="date"
                max={today}
                min="1920-05-18"
                required={props.fields.isRequired}
            />
        </div>)
    }

}

export default class AddResponse extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fields: [],
            answers: []
        }
        this.addResponse = this.addResponse.bind(this)
        this.findAnswer = this.findAnswer.bind(this)
    }

    addResponse(e) {
        e.preventDefault();
        console.log("answer")
        console.log(this.state.answers)
    }

    findAnswer = (value, fields) => {
        this.setState({
            answers: this.state.answers.filter(ans => ans.field.id !== fields.id)
        })
         let newAnswer = {
            field: fields,
            answer: value
        }
        this.setState({ answers: [...this.state.answers, newAnswer] })
    }

    componentDidMount() {
        FieldService.getFieldsIsActive().then((result) => {
            this.setState({ fields: result.data });
        });
    }

    render() {
        return (
            <div className="main">
                <div>
                     {/*  <SockJsClient
                    url={'http:///localhost:8080/portal'}
                    topics={['/topic/portal']}
                    onConnect={console.log("Connected!!!!")}
                    onDisconnect={console.log("Disconnected!")}
                    onMessage={(msg) => {
                        console.log(msg)
                        if (msg !== "CREATE_RESPONSE") {
                            FieldService.getFieldsIsActive().then((res) => {
                                this.setState({ fields: res.data })
                            })
                        }
                    }}
                    debug={false}
                /> */}
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Form name="form" onSubmit={this.addResponse}>

                                {this.state.fields.map((fields) => (
                                    <div>
                                        <Find fields={fields} findAnswerChild={this.findAnswer} />
                                    </div>
                                ))
                                }
                                <button className="myBtn blueBtn">
                                    SUBMIT
                                </button>
                            </Form>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
