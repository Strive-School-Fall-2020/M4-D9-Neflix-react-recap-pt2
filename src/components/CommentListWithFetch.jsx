import React, { Component } from "react";

import { ListGroup, Badge } from "react-bootstrap";

class CommentListWithFetch extends Component {
  state = {
    comments: [],
  };

  fetchComments = async (movieID) => {
    console.log("fetch", movieID);

    const url = "https://striveschool-api.herokuapp.com/api/comments/";

    let response = await fetch(url + movieID, {
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NmUzNTk4MzViMDAwMTc1ODRlZWQiLCJpYXQiOjE2MDU4MjA1NjUsImV4cCI6MTYwNzAzMDE2NX0.mgz_c-3UHAribI3ogIYDAyR7XqpT7ZWCzSPHwrhU19w",
      }),
    });

    let comments = await response.json();

    this.setState({ comments }, () =>
      console.log("awaited comments", this.state.comments)
    );

    //   .then((response) => response.json())
    //   .then((comments) => this.setState({ comments }));
  };

  componentDidMount() {
    this.fetchComments(this.props.imdbID);
  }

  componentDidUpdate(prevProps) {
    console.log("prev props", prevProps.imdbID);
    console.log("this props", this.props.imdbID);

    if (prevProps.imdbID !== this.props.imdbID) {
      console.log("actually different");
      this.fetchComments(this.props.imdbID);
    }
  }

  componentWillUnmount() {
    console.log("unmounting comments");
  }

  render() {
    return (
      <>
        {this.state.comments &&
          this.state.comments.length > 0 &&
          this.state.comments.map((comment) => (
            <ListGroup key={comment._id}>
              <ListGroup.Item>
                <Badge pill variant="info" className="mr-3">
                  {comment.rate}
                </Badge>
                {comment.comment}
              </ListGroup.Item>
            </ListGroup>
          ))}
      </>
    );
  }
}

export default CommentListWithFetch;
