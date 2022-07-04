import React, { Component } from 'react'
import FieldService from "../services/FieldService";
import SockJsClient from 'react-stomp';
import ResponseService from "../services/ResponseService";
import '../components/styles/ListField.css'
import '../components/styles/MyDiv.css'

function Find(props) {
  let qqq = (props.answers).filter((ans) => (
    ans.field.id === props.fields.id))
  if (qqq.length === 0) {
    return (<td>N/A</td>)
  } else {
    return (<td>{qqq.map(qqq => (qqq.answer))}</td>)
  }
}

export default class Response extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: [],
      response: []
    }
  }

  componentDidMount() {
    ResponseService.getResponses().then((result) => {
      this.setState({ response: result.data.content });
      FieldService.getAllFields().then((result) => {
        this.setState({ fields: result.data });
      });
    });

  }

  render() {
    return (
      <div className="main">
        <SockJsClient
          url={'http:///localhost:8080/portal'}
          topics={['/topic/portal']}
          onConnect={console.log("Connected!!!!")}
          onDisconnect={console.log("Disconnected!")}
          onMessage={(msg) => {
            console.log(msg)
            if (msg === "CREATE_RESPONSE") {
              ResponseService.getResponses().then((result) => {
                this.setState({ response: result.data.content });
              })
            }
          }}
          debug={false}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="myDiv">
                <table className="table table-striped table-hover">
                  <caption>
                    <div>
                      <b>Responses</b>
                    </div>
                  </caption>
                  <thead>
                    <tr>
                      {this.state.fields.map((field) => (
                        <th> {field.label}
                        </th>
                      ))
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.response.map((resp) => (
                      <tr key={resp.id}>
                        {this.state.fields.map((fields) => (
                          <Find fields={fields} answers={resp.answers} />
                        ))
                        }
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
