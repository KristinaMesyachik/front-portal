import React, { Component } from 'react'
import FieldService from "../services/FieldService";
import SockJsClient from 'react-stomp';
import ResponseService from "../services/ResponseService";
import cl2 from '../components/styles/ListField.css'

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
      response: [],
      qwq: []
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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
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
      </div >
    )
  }
}
