import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Movie from "./Movie";
import MovieModal from "./MovieModal";

class Gallery extends React.Component {
  state = { isModalOpen: false, selectedMovieID: null };

  handleOpenModal = (imdbID) => {
    this.setState({ isModalOpen: true, selectedMovieID: imdbID });

    this.props.fetchComments(imdbID);
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { title, movies, loading, selectedMovieID, comments } = this.props;

    return (
      <div>
        <h4>{title}</h4>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 no-gutters text-center">
          {loading ? (
            [0, 1, 2, 3, 4, 5].map((item) => (
              <Col key={item}>
                <Spinner animation="border" variant="light" />
              </Col>
            ))
          ) : (
            <>
              {movies.map((movie) => (
                <Movie
                  data={movie}
                  key={movie.imdbID}
                  // selectedMovieID={selectedMovieID}
                  openModal={this.handleOpenModal}
                />
              ))}
              <MovieModal
                isOpen={this.state.isModalOpen}
                selectedMovieID={this.state.selectedMovieID}
                comments={comments}
                close={this.handleCloseModal}
              />
            </>
          )}
        </Row>
      </div>
    );
  }
}
export default Gallery;
