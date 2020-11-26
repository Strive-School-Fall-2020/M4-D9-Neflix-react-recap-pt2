import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Details from "./components/Details";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  state = { searchedMovies: [], searchedLoading: null };

  showSearchResult = (searchString) => {
    this.setState({ searchedLoading: true });

    fetch(`http://www.omdbapi.com/?apikey=85a2b045&s=${searchString}`)
      .then((response) => response.json())
      .then((responseObject) => {
        if (responseObject.Response === "True") {
          this.setState({
            searchedMovies: responseObject.Search,
          });
        }
        this.setState({ searchedLoading: false });
      })
      .catch((err) => {
        this.setState({ searchedLoading: null });
      });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar showSearchResult={this.showSearchResult} />
          {/* <Home
            searchedMovies={this.state.searchedMovies}
            searchedLoading={this.state.searchedLoading}
          /> */}

          <Route
            path="/"
            exact
            render={(props) => (
              <Home
                {...props}
                searchedMovies={this.state.searchedMovies}
                searchedLoading={this.state.searchedLoading}
              />
            )}
          />
          <Route path="/details" exact component={Details} />
          <Route path="/details/:imdbID" component={Details} />
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
