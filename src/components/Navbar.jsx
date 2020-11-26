import React, { Component } from "react";

import { Navbar, Nav, InputGroup, FormControl, Button } from "react-bootstrap";

import { withRouter } from "react-router-dom";

class NetflixNavbar extends Component {
  state = { searchString: "" };

  handleEnterKey = (e) => {
    console.log(e.currentTarget.value);
    this.props.showSearchResult(this.state.searchString);
  };

  searchStringHandler = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      // WHEN ENTER KEY IS PRESSED
      this.props.showSearchResult(this.state.searchString);
    } else {
      this.setState({ searchString: e.currentTarget.value });
    }
  };

  render() {
    console.log("nav props", this.props.location.pathname);
    return (
      <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#221f1f" }}>
        <Navbar.Brand href="/">
          <img
            src="/assets/images/logo.png"
            alt="logo"
            style={{ width: "100px", height: "55px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="font-weight-bold" href="/">
              Home
            </Nav.Link>
            <Nav.Link
              active={
                this.props.location.pathname.includes("details") ? true : false
              }
              className="font-weight-bold"
              href="/"
            >
              TV Shows
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              Movies
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              Recently Added
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              My List
            </Nav.Link>
          </Nav>
          <span className="d-none d-md-flex align-items-center">
            <InputGroup className="icons">
              <FormControl
                placeholder="Search and press enter"
                aria-label="search"
                aria-describedby="basic-addon1"
                onKeyDown={this.searchStringHandler}
                onChange={this.searchStringHandler}
                value={this.state.searchString}
              />
              <InputGroup.Append>
                <Button onClick={this.handleEnterKey}>Search</Button>
              </InputGroup.Append>
            </InputGroup>
            <div id="kids mr-2">KIDS</div>
            <i className="fa fa-bell icons mr-2"></i>
            <i className="fa fa-user icons mr-2"></i>
          </span>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default withRouter(NetflixNavbar);
