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

const Searchbar = ({onChange, changeSearch, history}) => {

const [search, setSearch] = useState([])
console.log("SEARCH", search)

// useEffect(() => {
//  fetchCategories()
// }, [])

// const fetchCategories = async () => {
//   try {
//     let resp = await fetch("https://strive-jobs-api.herokuapp.com/jobs/categories")
//     let cat = await resp.json()
//     setCategory(cat)
//     console.log("CATEGORIES",cat)
//   } catch (error) {
//     console.log(error)
//   }
// }

  return (
    
    <Navbar bg="info" expand="lg">
      <Container className="px-4">
        <Navbar.Brand id="engine-name">Search-Engine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="text-warning" onClick={() => history.push(`/`)}>Home</Nav.Link>
            <Nav.Link className="text-warning" onClick={() => history.push(`/favourites`)}>Favourites</Nav.Link>
            <NavDropdown title="Select Search" id="basic-nav-dropdown droppy" className="ml-100">
              <NavDropdown.Item onClick={() => changeSearch("Title")} > 
              Title
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeSearch("Category")} > 
              Category
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeSearch("Company")} > 
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
                  onChange(e.target.value);
                }
              }}
            />
            <Button variant="outline-danger">Search</Button>
          </Form>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      
  );
};
export default withRouter(Searchbar);
