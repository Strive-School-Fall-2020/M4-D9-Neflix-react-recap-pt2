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
    comments: [],
    isModalOpen: false,
    selectedMovieID: null,
    loading: true,
    error: false,
  };

  url = "http://www.omdbapi.com/?apikey=85a2b045";

  fetchMovies = () => {
    // resolves all the fetches in "parallel"
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
    // performs a fetch for the comments based on the movieID that it receives when called
    // the comments will then be passed into the Modal via props

    const url = "https://striveschool-api.herokuapp.com/api/comments/";

    let response = await fetch(url + movieID, {
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NmUzNTk4MzViMDAwMTc1ODRlZWQiLCJpYXQiOjE2MDU4MjA1NjUsImV4cCI6MTYwNzAzMDE2NX0.mgz_c-3UHAribI3ogIYDAyR7XqpT7ZWCzSPHwrhU19w",
      }),
    });

    let comments = await response.json();

    this.setState({ comments }); // updates state comments with newly fetched comments
  };

  handleOpenModal = (imdbID) => {
    this.setState({ isModalOpen: true, selectedMovieID: imdbID }); // triggers the open modal to true and saves the clicked elementId

    //launches a new fetch when the modal is opening
    this.fetchComments(imdbID);
  };

  handleCloseModal = () => {
    // turns the modal off
    this.setState({ isModalOpen: false });
  };

  componentDidMount() {
    // performs an initial state when Home is mounted
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

          {/* EXAMPLE CommentsList with fetch inside */}
          {/* {this.state.selectedMovieID && (
            <>
              <CommentListWithFetch imdbID={this.state.selectedMovieID} />
              <Button onClick={() => this.setState({ selectedMovieID: null })}>
                Reset comments
              </Button>
            </>
          )} */}

          {/* Displays an Alert if there's an error in the fetches*/}
          {this.state.error && (
            <Alert variant="danger" className="text-center">
              An error has occurred, please try again later
            </Alert>
          )}

          {/* Displays the 3 galleries if there's no error in the fetches*/}
          {!this.state.error &&
            // and if we HAVE any searchedMovies in the App.js state
            (this.props.searchedMovies.length > 0 ||
              // OR if the searchedLoading state in the App.js state is true so actually loading,
              // we need to activate this component to render the loaders inside
              this.props.searchedLoading === true) && (
              <Gallery
                title="Search Results"
                loading={this.props.searchedLoading}
                movies={this.props.searchedMovies}
                handleOpenModal={this.handleOpenModal}
              />
            )}

          {/* Displays the 3 galleries if there's no error in the fetches*/}
          {!this.state.error &&
            // and if we DON'T HAVE any searchedMovies in the App.js state
            (!this.props.searchedMovies.length > 0 ||
              // OR if the searchedLoading state in the App.js state is null, so the default state
              this.props.searchedLoading === null) && (
              <>
                <Gallery
                  title="Spider Man" // the title of the gallery
                  loading={this.state.loading} // manages the spinners
                  movies={this.state.spiderManMovies.slice(0, 6)} // it's the movies array
                  handleOpenModal={this.handleOpenModal} // let the Button in Movie open the modal outside
                />
                <Gallery
                  title="Star Wars"
                  loading={this.state.loading}
                  movies={this.state.starWarsMovies.slice(0, 6)}
                  handleOpenModal={this.handleOpenModal}
                />
                <Gallery
                  title="Harry Potter"
                  loading={this.state.loading}
                  movies={this.state.harryPotterMovies.slice(0, 6)}
                  handleOpenModal={this.handleOpenModal}
                />
              </>
            )}

          {/* 1 Single modal for all the cards */}
          <MovieModal
            isOpen={this.state.isModalOpen} // will tell the modal to be opened or closed
            selectedMovieID={this.state.selectedMovieID} // used to assign the correct elementId to the POST payload obj
            comments={this.state.comments} // passes the comments array to <CommentList />
            close={this.handleCloseModal} // triggers the closure of the modal
            fetchComments={this.fetchComments} // lets MovieModal call a fetch here (Home) via props
          />
        </div>
      </div>
    );
  }
}
export default Home;
