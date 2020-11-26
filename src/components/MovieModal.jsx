import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import CommentList from "./CommentList";

class MovieModal extends Component {
  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Movie Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-3">
            {this.props.comments.length > 0 &&
              this.props.comments[0].elementId ===
                this.props.selectedMovieID && (
                <CommentList comments={this.props.comments} />
              )}
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default MovieModal;
