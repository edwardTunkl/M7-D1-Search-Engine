import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "../search.css";
import { connect } from "react-redux";
import { setQueryAction, setSearchByAction } from "../actions";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setQuery: (query) => {
    dispatch(setQueryAction(query));
  },
  setSearchBy: (searchBy ) => {
    dispatch(setSearchByAction(searchBy));
  },
});

const Searchbar = ({setQuery, setSearchBy, history}) => {


  return (
    
    <Navbar bg="info" expand="lg">
      <Container className="px-4">
        <Navbar.Brand id="engine-name">Search-Engine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="text-warning shaddow" style={{fontSize:"1.3rem"}} onClick={() => history.push(`/`)}>Home</Nav.Link>
            <Nav.Link className="text-warning shaddow" style={{fontSize:"1.3rem"}} onClick={() => history.push(`/favourites`)}>Favourites</Nav.Link>
            <NavDropdown title="Select Search" id="basic-nav-dropdown" style={{fontSize:"1.5rem"},{marginLeft:"21rem"}}>
              <NavDropdown.Item onClick={() => setSearchBy("Title")} > 
              Title
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setSearchBy("Category")} > 
              Category
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setSearchBy("Company")} > 
              Company
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setQuery(e.target.value);
                }
              }}
            />
          </Form>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Searchbar));
