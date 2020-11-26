import React, { Component } from "react";
import { Modal, Form, InputGroup, FormControl, Button } from "react-bootstrap";

import CommentList from "./CommentList";

class MovieModal extends Component {
  state = {
    //default initial state
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
        //FETCHES AGAIN TO UPDATE THE COMMENTS DISPLAYED
        //it will update the state.comments in Home and all the props connected to that state, so here and in CommentList
        this.props.fetchComments(this.props.selectedMovieID);

        //RESETS THE STATE TO EMPTY THE FIELDS
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

  // Sets elementId when a card is clicked, because a new selectedMovieID will come in.
  componentDidUpdate(prevProps) {
    // checking if the selectedMovieID prop has changes
    if (prevProps.selectedMovieID !== this.props.selectedMovieID) {
      // setting a new state
      let newComment = this.state.newComment;
      newComment.elementId = this.props.selectedMovieID;
      this.setState({ newComment });
    }
  }

  render() {
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
