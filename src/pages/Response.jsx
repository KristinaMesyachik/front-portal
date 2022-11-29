import React, { Component } from 'react'
import FieldService from "../services/FieldService";
import SockJsClient from 'react-stomp';
import ResponseService from "../services/ResponseService";
import '../components/styles/ListField.css'
import '../components/styles/MyDiv.css'
import '../components/styles/Pagination.css'
import ReactPaginate from 'react-paginate';

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
      responses: [],

      totalCount: null,
      page: 1,
      size: 3
    }

    this.retrieveTutorials = this.retrieveTutorials.bind(this)
  }

  retrieveTutorials(e) {
    ResponseService.getResponses(e + 1, this.state.size)
      .then((response) => {
        this.setState({
          responses: response.data.content,
          totalCount: response.data.totalPages,
        });
        FieldService.getAllFields().then((result) => {
          this.setState({ fields: result.data });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidMount() {
    ResponseService.getResponses(this.state.page, this.state.size)
    .then((result) => {
      this.setState({ 
        totalCount: result.data.totalPages,
        responses: result.data.content 
      });
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
                    {this.state.responses.map((resp) => (
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
                <div>
                  <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={(e) => {
                  this.retrieveTutorials(e.selected)
                  }}
                  pageRangeDisplayed={1}
                  pageCount={this.state.totalCount}
                  previousLabel="<"
                  marginPagesDisplayed={2}
                  renderOnZeroPageCount={null}
                  containerClassName={"navigationButtons"}
                  previousLinkClassName={"previousButton"}
                  nextLinkClassName={"nextButton"}
                  disabledClassName={"navigationDisabled"}
                  activeClassName={"navigationActive"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
