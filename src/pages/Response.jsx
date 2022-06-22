import React, { Component } from 'react'
import FieldService from "../services/FieldService";
import SockJsClient from 'react-stomp';

export default class Response extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fieldsIsActive: [],

      id: 0,
      answers: [],
      answer: "",
      field: {
        id: 0,
        label: "",
        type: "",
        isRequired: false,
        isActive: false,
        options: []
      }
    }


    this.addResponse = this.addResponse.bind(this)
    this.cancel = this.cancel.bind(this)
    this.view = this.view.bind(this)
  }

  componentDidMount() {
    FieldService.getFieldsIsActive().then((result) => {
      this.setState({ fieldsIsActive: result.data });
    });
  }

  addResponse() {
  }

  view() {
    console.log(this.state.fieldsIsActive)
  }

  cancel() {/* 
    this.setState({ id: 0 })
    this.setState({ label: "" })
    this.setState({ type: "" })
    this.setState({ options: [] })
    this.setState({ isRequired: false })
    this.setState({ isActive: false })//update */
  };

  render() {
    return (
      <div>
        <div>Response</div>
       {/*  <SockJsClient
          url={'http://localhost:8080/gs-guide-websocket'}
          topics={['/topic/message']}
          onConnect={console.log("Connected!!!!")}
          onDisconnect={console.log("Disconnected!")}
          onMessage={msg => {this.setState({ fieldsIsActive: msg },
            console.log(msg))}}
          debug={false}
          /> */}
        {this.state.fieldsIsActive.map((field) => (
          <div>
            <br></br><br></br>
            <label>Label {field.label} </label>
            <br></br>
            <label>type {field.type} </label>
            <br></br>
            <label>isRequired {field.isRequired} </label>
            <br></br>
            <label>isActive {field.isActive} </label>
          </div>
        ))}

      </div>

    )
  }
}
