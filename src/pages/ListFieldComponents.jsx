import React, { Component } from "react";
import FieldService from "../services/FieldService";
import { Modal } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import cl2 from '../components/styles/ListField.css'
import style1 from '../components/styles/MyButton.css'
import style2 from '../components/styles/MyInput.css'
import style3 from '../components/styles/MyLabel.css'
import style4 from '../components/styles/MySelect.css'
import style5 from '../components/styles/MyTextarea.css'
import ReactPaginate from 'react-paginate';
import SockJsClient from 'react-stomp';


class ListFieldComponents extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      fields: [],

      label: "",
      type: "SINGLE_LINE_TEXT",
      options: [],
      isRequired: false,
      isActive: false,

      show: false,

      totalCount: 0,
      page: 2,
      size: 10,

      /*  clientRef: null, */
      /*  handlers: [] */
    }

    this.editField = this.editField.bind(this);
    this.deleteField = this.deleteField.bind(this);
    this.cancel = this.cancel.bind(this)
    this.addField = this.addField.bind(this)
    this.retrieveTutorials = this.retrieveTutorials.bind(this)
    /* 
        this.sendMessage = this.sendMessage.bind(this) */
    /* this.connect = this.connect.bind(this) */
    /*  this.disconnect = this.disconnect.bind(this) *//* 
    this.addHandler = this.addHandler.bind(this) */
  }

  /* connect() {
    const socket = new SockJS('/gs-guide-websocket');
    this.setState({ stompClient: Stomp.over(socket) });
    stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/greetings', field => {
        handlers.forEach(handler => handler(JSON.parse(field.body)))
      });
    });
  }

  disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect()
    }
    console.log("Disconnected")
  }
 */
  /*   sendMessage(field) {
      this.stompClient.send("/app/hello", {}, JSON.stringify(field))
    } */
  /* 
     addHandler(handler) {
      this.setState({handlers: this.state.handlers.concat(handler)})
    } */

  retrieveTutorials() {
    let params = {
      page: this.state.page,
      size: this.state.size
    }

    console.log(this.state.page)//не изменяется страница
    FieldService.getAll(params)
      .then((response) => {
        const { content, totalPages } = response.data;
        this.setState({
          fields: content,
          totalCount: totalPages,
        });
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  addField() {
    let field =
    {
      id: this.state.id,
      label: this.state.label,
      type: this.state.type,
      isRequired: this.state.isRequired,
      isActive: this.state.isActive,
      options: this.state.options
    }

    this.clientRef.sendMessage("/app/fields", {}, JSON.stringify(field))
/* 
    if (this.state.id === null) {
      FieldService.createField(field)
    } else {
      FieldService.updateField(field, this.state.id)
    } */
    this.cancel()
  }


  cancel() {
    this.setState({ id: null })
    this.setState({ show: false })
    this.setState({ label: "" })
    this.setState({ type: "" })
    this.setState({ options: [] })
    this.setState({ isRequired: false })
    this.setState({ isActive: false })
  };

  componentDidMount() {
    FieldService.getFields().then((res) => {
      this.setState({ fields: res.data.content });
      this.setState({ totalCount: res.data.totalPages })
    });
  }

  deleteField(id) {
    FieldService.deleteField(id).then(res => {
      this.setState({ fields: this.state.fields.filter(field => field.id !== id) })
    })
  }

  editField(id) {
    FieldService.getFieldById(id).then(res => {
      let field = res.data;
      this.setState({ id: field.id })
      this.setState({ show: true })
      this.setState({ label: field.label })
      this.setState({ type: field.type })
      this.setState({ options: field.options })
      this.setState({ isRequired: field.isRequired })
      this.setState({ isActive: field.isActive })
      console.log(field)
    })
  }

  render() {
    return (
      <div className="main">
          <SockJsClient
          url={'http:///localhost:8080/gs-guide-websocket'}
          topics={['/topic/fields']}
          onConnect={console.log("Connected!!!!")}
          onDisconnect={console.log("Disconnected!")}
          ref={(client) => {
            /* this.setState({ clientRef: client }) */
            this.clientRef = client
          }}
          onMessage={msg => {
            /*this.setState({ fields: [...this.state.fields, msg]}),*/
            console.log(msg)
          }}
          debug={false}
        />  

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <table className="table table-striped table-hover">
                <caption>
                  <div>
                    <b>Fields</b>
                  </div>
                  <div id="captionRight">
                    <button className="myBtn blueBtn" onClick={() => this.setState({ show: true })}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        class="bi bi-plus"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      <label>
                        ADD FIELD
                      </label>
                    </button>

                    <Modal show={this.state.show} onHide={this.cancel}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Field</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="show-grid">
                        <Container>
                          <Row>
                            <Col md={2}>
                              <label className="myLabel required">Label</label>
                            </Col>
                            <Col md={9}>
                              <input className="myInput"
                                value={this.state.label}
                                onChange={(e) => this.setState({ label: e.target.value })}
                                type="text"
                                required
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md={2}>
                              <label className="myLabel required">Type</label>
                            </Col>
                            <Col md={9}>
                              <select className="mySelect"
                                defaultValue={this.state.type}
                                value={this.setState.type}
                                onChange={(e) => this.setState({ type: e.target.value })}>
                                <option value="SINGLE_LINE_TEXT">Single line text</option>
                                <option value="MULTILINE_TEXT">Multiline text</option>
                                <option value="RADIO_BUTTON">Radio button</option>
                                <option value="CHECKBOX">Checkbox</option>
                                <option value="COMBOBOX">Combobox</option>
                                <option value="DATE">Date</option>
                              </select>
                            </Col>
                          </Row>
                          {this.state.type === "RADIO_BUTTON" ||
                            this.state.type === "CHECKBOX" ||
                            this.state.type === "COMBOBOX" ? (
                            <Row>
                              <Col xs={6} md={2}>
                                <label className="myLabel required">Options</label>
                              </Col>
                              <Col xs={12} md={9}>
                                <textarea className="myTextarea"
                                  value={this.state.options.title}
                                  onChange={(e) => this.setState({ options: e.target.value })}
                                  type="text"
                                />
                                {/*<CreatableInputOnly handleSelectValues={this.state.options} /> */}
                              </Col>
                            </Row>
                          ) : (<div></div>)}
                          <Row>
                            <Col xs={{ offset: 2 }} md={4}>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox1"
                                  checked={this.state.isRequired}
                                  onChange={(e) => this.setState({ isRequired: !this.state.isRequired })}
                                />
                                <label className="form-check-label" for="inlineCheckbox1">
                                  Required
                                </label>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox2"
                                  checked={this.state.isActive}
                                  onChange={(e) => this.setState({ isActive: !this.state.isActive })}
                                />
                                <label class="form-check-label" for="inlineCheckbox2">
                                  Is Active
                                </label>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </Modal.Body>
                      <Modal.Footer>
                        <button className="myBtn whiteBtn" type="button" onClick={this.cancel}>
                          CANCEL
                        </button>
                        <button className="myBtn blueBtn" onClick={this.addField}>SAVE</button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </caption>
                <thead>
                  <tr>
                    <th>Label</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Is Active</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.fields.map((field) => (
                    <tr key={field.id}>
                      <td> {field.label} </td>
                      <td> {field.type} </td>
                      <td> {field.isRequired ? "True" : "False"} </td>
                      <td> {field.isActive ? "True" : "False"} </td>
                      <td>
                        <div id="actions">
                          <button className="myBtn"
                            onClick={() => this.editField(field.id)} >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                          </button>
                          <button className="myBtn"
                            onClick={() => this.deleteField(field.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*  <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => {
            this.setState({ page: 4 });
            console.log(e); this.retrieveTutorials()
          }}
          pageRangeDisplayed={1}
          pageCount={this.state.totalCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        /> */}
      </div>
    )
  }
}

export default ListFieldComponents;
