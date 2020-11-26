import React, { Component } from "react";
import Gallery from "./Gallery";
// import CommentListWithFetch from "./CommentListWithFetch";
import { Alert, Button } from "react-bootstrap";
import MovieModal from "./MovieModal";

class Home extends Component {
  state = {
    harryPotterMovies: [],
    spiderManMovies: [],
    starWarsMovies: [],
    // selectedMovieID: null,
    comments: [],
    isModalOpen: false,
    selectedMovieID: null,
    loading: true,
    error: false,
  };

  url = "http://www.omdbapi.com/?apikey=85a2b045";

  handleSelectedMovie = (imdbID) => {
    console.log("selected movie id changed", imdbID);
    this.setState({ selectedMovieID: imdbID });
  };

  fetchMovies = () => {
    Promise.all([
      fetch(this.url + "&s=harry%20potter")
        .then((response) => response.json())
        .then((responseObject) => {
          this.setState({ harryPotterMovies: responseObject.Search }, () =>
            console.log(this.state.harryPotterMovies)
          );
        }),
      fetch(this.url + "&s=spider%20man")
        .then((response) => response.json())
        .then((responseObject) =>
          this.setState({ spiderManMovies: responseObject.Search })
        ),
      fetch(this.url + "&s=star%20wars")
        .then((response) => response.json())
        .then((responseObject) =>
          this.setState({ starWarsMovies: responseObject.Search })
        ),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((err) => {
        this.setState({ error: true });
        console.log("An error has occurred:", err);
      });
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
  };

  handleOpenModal = (imdbID) => {
    this.setState({ isModalOpen: true, selectedMovieID: imdbID });

    this.fetchComments(imdbID);
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  componentDidMount() {
    this.fetchMovies();
  }

  render() {
    return (
      <div>
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h2 className="mb-4">TV Shows</h2>
              <div className="dropdown ml-4 mt-1">
                <button
                  className="btn btn-secondary btn-sm dropdown-toggle rounded-0"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ backgroundColor: "#221f1f" }}
                >
                  Genres &nbsp;
                </button>
                <div
                  className="dropdown-menu bg-dark"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item text-white bg-dark" href="#">
                    Comedy
                  </a>
                  <a className="dropdown-item text-white bg-dark" href="#">
                    Drama
                  </a>
                  <a className="dropdown-item text-white bg-dark" href="#">
                    Thriller
                  </a>
                </div>
              </div>
            </div>
            <div className="d-none d-md-block">
              <i className="fa fa-th-large icons mr-2"></i>
              <i className="fa fa-th icons"></i>
            </div>
          </div>

          {/* {this.state.selectedMovieID && (
            <>
              <CommentListWithFetch imdbID={this.state.selectedMovieID} />
              <Button onClick={() => this.setState({ selectedMovieID: null })}>
                Reset comments
              </Button>
            </>
          )} */}

          {this.state.error && (
            <Alert variant="danger" className="text-center">
              An error has occurred, please try again later
            </Alert>
          )}

          {!this.state.error &&
            (this.props.searchedMovies.length > 0 ||
              this.props.searchedLoading === true) && (
              <Gallery
                title="Search Results"
                loading={this.props.searchedLoading}
                movies={this.props.searchedMovies}
                comments={this.state.comments}
                fetchComments={this.fetchComments}
                handleOpenModal={this.handleOpenModal}
                // selectedMovieID={this.handleSelectedMovie}
              />
            )}

          {!this.state.error &&
            (!this.props.searchedMovies.length > 0 ||
              this.props.searchedLoading === null) && (
              <>
                <Gallery
                  title="Spider Man"
                  loading={this.state.loading}
                  movies={this.state.spiderManMovies.slice(0, 6)}
                  comments={this.state.comments}
                  fetchComments={this.fetchComments}
                  handleOpenModal={this.handleOpenModal}
                  // selectedMovieID={this.handleSelectedMovie}
                />
                <Gallery
                  title="Star Wars"
                  loading={this.state.loading}
                  movies={this.state.starWarsMovies.slice(0, 6)}
                  comments={this.state.comments}
                  fetchComments={this.fetchComments}
                  handleOpenModal={this.handleOpenModal}
                  // selectedMovieID={this.handleSelectedMovie}
                />
                <Gallery
                  title="Harry Potter"
                  loading={this.state.loading}
                  movies={this.state.harryPotterMovies.slice(0, 6)}
                  comments={this.state.comments}
                  fetchComments={this.fetchComments}
                  handleOpenModal={this.handleOpenModal}
                  // selectedMovieID={this.handleSelectedMovie}
                />
              </>
            )}
          <MovieModal
            isOpen={this.state.isModalOpen}
            selectedMovieID={this.state.selectedMovieID}
            comments={this.state.comments}
            close={this.handleCloseModal}
            fetchComments={this.fetchComments}
          />
        </div>
      </div>
    );
  }
}
export default Home;
