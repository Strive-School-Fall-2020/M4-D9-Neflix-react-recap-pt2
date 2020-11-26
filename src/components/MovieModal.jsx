import React, { Component } from "react";
import { Modal, Form, InputGroup, FormControl, Button } from "react-bootstrap";

import CommentList from "./CommentList";

class MovieModal extends Component {
  state = {
    newComment: {
      comment: "",
      rate: 0,
      elementId: null,
    },
  };

  submitComment = async (e) => {
    e.preventDefault();
    const url = "https://striveschool-api.herokuapp.com/api/comments/";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(this.state.newComment),
        headers: new Headers({
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NmUzNTk4MzViMDAwMTc1ODRlZWQiLCJpYXQiOjE2MDU4MjA1NjUsImV4cCI6MTYwNzAzMDE2NX0.mgz_c-3UHAribI3ogIYDAyR7XqpT7ZWCzSPHwrhU19w",
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        this.props.fetchComments(this.props.selectedMovieID);

        this.setState({
          newComment: {
            comment: "",
            rate: 0,
            elementId: this.props.selectedMovieID,
          },
        });
      } else {
        alert("An error has occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleCommentText = (e) => {
    let newComment = this.state.newComment;
    newComment.comment = e.currentTarget.value;
    this.setState({ newComment });
  };

  handleRadioChange = (e) => {
    let newComment = this.state.newComment;
    newComment.rate = e.currentTarget.id;

    this.setState({ newComment });
  };

  setElementId = () => {
    let newComment = { ...this.state.newComment };
    newComment.elementId = this.props.selectedMovieID;
    this.setState({ newComment });
  };

  //   componentDidMount() {
  //     console.log(this.props.selectedMovieID);
  //     this.setElementId();
  //   }

  componentDidUpdate(prevProps) {
    console.log("update", this.props.selectedMovieID);
    if (prevProps.selectedMovieID !== this.props.selectedMovieID) {
      console.log("update inner", this.props.selectedMovieID);
      this.setElementId();
    }
  }

  render() {
    console.log("movie id", this.props.selectedMovieID);
    return (
      <Modal show={this.props.isOpen} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Movie Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-3">
            <div
              style={{
                maxHeight: "300px",
                overflow: "hidden",
                overflowY: "auto",
              }}
            >
              {this.props.comments.length > 0 &&
                this.props.comments[0].elementId ===
                  this.props.selectedMovieID && (
                  <CommentList comments={this.props.comments} />
                )}
            </div>

            <div className="text-center">
              <h5 className="my-3">Add a comment</h5>
              <Form onSubmit={this.submitComment}>
                <div className="my-3 text-center">
                  <Form.Check
                    inline
                    label="1"
                    type="radio"
                    id="1"
                    name="rating"
                    onClick={this.handleRadioChange}
                  />
                  <Form.Check
                    inline
                    label="2"
                    type="radio"
                    id="2"
                    name="rating"
                    onClick={this.handleRadioChange}
                  />
                  <Form.Check
                    inline
                    label="3"
                    type="radio"
                    id="3"
                    name="rating"
                    onClick={this.handleRadioChange}
                  />
                  <Form.Check
                    inline
                    label="4"
                    type="radio"
                    id="4"
                    name="rating"
                    onClick={this.handleRadioChange}
                  />
                  <Form.Check
                    inline
                    label="5"
                    type="radio"
                    id="5"
                    name="rating"
                    onClick={this.handleRadioChange}
                  />
                </div>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Write your comment"
                    arial-label="comment"
                    aria-describedby="basic-addon1"
                    onChange={this.handleCommentText}
                    value={this.state.newComment.comment}
                  />
                </InputGroup>
                <Button variant="danger" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default MovieModal;
