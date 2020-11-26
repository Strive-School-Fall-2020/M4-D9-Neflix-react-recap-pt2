import React, { Component } from "react";
import { Col, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
class Movie extends Component {
  render() {
    return (
      <Col className="mb-2 d-flex flex-column justify-content-between px-1">
        <Image
          className="img-fluid h-100"
          src={this.props.data.Poster}
          alt="movie picture"
          onClick={() =>
            this.props.history.push(`/details/${this.props.data.imdbID}`)
          }
        />
        <Button
          className="mx-2 mt-2"
          onClick={() => this.props.openModal(this.props.data.imdbID)}
        >
          Open Modal
        </Button>
      </Col>
    );
  }
}

export default withRouter(Movie);
