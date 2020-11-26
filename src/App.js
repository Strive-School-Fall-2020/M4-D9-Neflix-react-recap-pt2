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

          {/* Navbar is able to change the state here via the showSearchResult method */}
          <Navbar showSearchResult={this.showSearchResult} />
          <Route
            path="/"
            exact
            //changes "component" with a "render" prop to spread the router props and ADD OUR OWN PROPS in the Home component
            render={(props) => (
              <Home
                {...props}
                // Home will receive the searchedMovies array and the boolean for triggering the loading on searchedMovies gallery
                searchedMovies={this.state.searchedMovies}
                searchedLoading={this.state.searchedLoading}
              />
            )}
          />
          <Route path="/details" exact component={Details} />
          {/* A dynamic route is made with ":" -> "/:id" */}
          <Route path="/details/:imdbID" component={Details} />
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
