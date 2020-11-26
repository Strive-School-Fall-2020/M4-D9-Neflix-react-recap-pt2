import React, { Component } from "react";

import { Container, Row, Col, Image } from "react-bootstrap";
import CommentList from "./CommentList";

import { Link } from "react-router-dom";

class Details extends Component {
  state = {
    data: null,
    title: null,
    poster: null,
    comments: [],
  };

  fetchComments = async (movieID) => {
    const url = "https://striveschool-api.herokuapp.com/api/comments/";
    const response = await fetch(url + movieID, {
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NmUzNTk4MzViMDAwMTc1ODRlZWQiLCJpYXQiOjE2MDU4MjA1NjUsImV4cCI6MTYwNzAzMDE2NX0.mgz_c-3UHAribI3ogIYDAyR7XqpT7ZWCzSPHwrhU19w",
      }),
    });

    const comments = await response.json();

    this.setState({ comments });
  };

  fetchData = async (movieID) => {
    const url = "http://www.omdbapi.com/";
    const response = await fetch(url + "?apikey=85a2b045&i=" + movieID);

    const responseObject = await response.json();

    this.setState({
      data: responseObject,
      poster: responseObject.Poster,
      title: responseObject.Title,
    });
  };

  componentDidMount() {
    this.fetchData(this.props.match.params.imdbID);
    this.fetchComments(this.props.match.params.imdbID);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={"auto"}>
            <Image src={this.state.poster} />
          </Col>
          <Col>
            <h1 className="text-white"> {this.state.title}</h1>
            <h4 className="text-white">
              {this.state.data && this.state.data.Writer}
            </h4>
            <CommentList comments={this.state.comments} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Details;
