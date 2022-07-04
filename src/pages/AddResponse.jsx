import React, { Component } from 'react'
import FieldService from "../services/FieldService";
import SockJsClient from 'react-stomp';
import ResponseService from "../services/ResponseService";
import '../components/styles/ListField.css'
import { Form } from "react-bootstrap";
import { Navigate } from 'react-router-dom'

import '../components/styles/ListField.css'
import '../components/styles/MyButton.css'
import '../components/styles/MyInput.css'
import '../components/styles/MyLabel.css'
import '../components/styles/MySelect.css'
import '../components/styles/MyTextarea.css'
import '../components/styles/MyDiv.css'
import '../components/styles/MyTextForInput.css'

function Find(props) {

    if (props.fields.type === 'SINGLE_LINE_TEXT') {

        return (
            <div className='forAnswer'>
                <label className="myLabel forInput">
                    {props.fields.label}
                </label>
                <input className="myInput"
                    onChange={(e) => {
                        props.findAnswerChild(e.target.value, props.fields)
                    }}
                    type="text"
                    required={props.fields.isRequired}
                />
            </div>)
    } else if (props.fields.type === 'MULTILINE_TEXT') {

        return (<div className='forAnswer'>
            <label className="myLabel forInput">
                {props.fields.label}
            </label>
            <textarea className="myTextarea"
                onChange={(e) => {
                    props.findAnswerChild(e.target.value, props.fields)
                }}
                type="text"
                required={props.fields.isRequired}
            />
        </div>)
    } else if (props.fields.type === 'RADIO_BUTTON') {
        return (<div className='forAnswer'>
            <label className="myLabel forInput">
                {props.fields.label}
            </label>
            {props.fields.options.map((option) => (
                <div>
                    <input
                        type="radio"
                        name={props.fields.label}
                        value={option.title}
                        required={props.fields.isRequired}
                        onChange={(e) => {
                            props.findAnswerChild(e.target.value, props.fields)
                        }} />
                    <label>
                        {option.title}
                    </label>
                </div>
            ))}
        </div>)
    } else if (props.fields.type === 'CHECKBOX') {
        return (<div className='forAnswer'>
            <label className="myLabel forInput">
                {props.fields.label}
            </label>
            {props.fields.options.map((option) => (
                <div>
                    <input
                        type="checkbox"
                        name={props.fields.label}
                        value={option.title}
                        onChange={() => {
                            props.findAnswerChild([option.title], props.fields)
                        }} />
                    <label>
                        {option.title}
                    </label>
                </div>
            ))}
        </div>)
    } else if (props.fields.type === 'COMBOBOX') {

        return (<div className='forAnswer'>
            <label className="myLabel forInput">
                {props.fields.label}
            </label>
            <select className="mySelect"
                onChange={(e) => {
                    props.findAnswerChild(e.target.value, props.fields)
                }}
                required={props.fields.isRequired}>
                {props.fields.options.map((option) => (
                    <option value={option.title} >{option.title}</option>
                ))}
            </select>
        </div >)
    } else if (props.fields.type === 'DATE') {
        {
            let today = new Date().toISOString().split("T")[0]

            return (<div className='forAnswer'>
                <label className="myLabel forInput">
                    {props.fields.label}
                </label>
                <input
                    onChange={(e) => {
                        props.findAnswerChild(e.target.value, props.fields)
                    }}
                    type="date"
                    max={today}
                    min="1920-05-18"
                    required={props.fields.isRequired}
                />
            </div>)
        }
    } else {
        console.log("MISTAKE!!!!!!!")
    }

}

export default class AddResponse extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fields: [],
            answers: [],
            id: null
        }
        this.addResponse = this.addResponse.bind(this)
        this.addAnswer = this.addAnswer.bind(this)
        this.findAnswer = this.findAnswer.bind(this)
    }

    addResponse = (e) => {
        e.preventDefault()
        let response = {
            answers: this.state.answers.map(ans => {
                if (ans.field.type === 'CHECKBOX') {
                    ans.field = ans.field
                    ans.answer = JSON.stringify(ans.answer)
                }
                return ans
            })
        }
        ResponseService.createResponse(response)
            .then((res) => {
                this.setState({ id: res.data.id })
                this.setState({ shouldRedirect: true });
            })
    }

    addAnswer = (value, fields) => {
        let newAnswer = {
            field: fields,
            answer: value
        }
        this.setState({
            answers:
                [...this.state.answers.filter((ans) => ans?.field?.id !== fields.id),
                    newAnswer]
        })
    }

    findAnswer = (value, fields) => {
        if (fields.type === 'CHECKBOX') {
            let index = this.state.answers.findIndex(el => el.field.id === fields.id)
            if (index !== -1) {
                let arr = this.state.answers[index].answer
                let indexArr = arr.findIndex(el => el === value[0])
                if (indexArr > -1) {
                    arr.splice(indexArr, 1);
                } else {
                    arr.push(value[0]);
                }
            } else {
                this.addAnswer(value, fields)
            }
        } else {
            this.addAnswer(value, fields)
        }
    }

    cancel() {

    }

    componentDidMount() {
        FieldService.getFieldsIsActive().then((result) => {
            this.setState({ fields: result.data });
        });
    }

    render() {
        return (
            <div className="main">
                {this.state.shouldRedirect && <Navigate to={{
                    pathname: "/queationnaires/" + this.state.id
                }
                } />}
                <div>
                    <SockJsClient
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
                    />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 centered">
                            <div className="myDiv">
                                <Form name="form" onSubmit={this.addResponse}>
                                    {this.state.fields.map((fields) => (
                                        <div>
                                            <Find fields={fields} findAnswerChild={this.findAnswer} />
                                        </div>
                                    ))
                                    }
                                    <input className="myBtn" type="reset" value="CANCEL" />
                                    <button className="myBtn blueBtn">
                                        SUBMIT
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
