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
import { withRouter } from "react-router";
import "../search.css";
import { setQueryAction, setSearchByAction } from "../actions";
import {  useDispatch } from 'react-redux'


const Searchbar = ({ history }) => {

 const dispatch = useDispatch()

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
              <NavDropdown.Item onClick={() => dispatch(setSearchByAction("Title"))} > 
              Title
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => dispatch(setSearchByAction("Category"))} > 
              Category
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => dispatch(setSearchByAction("Company"))} > 
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
                  dispatch(setQueryAction(e.target.value));
                }
              }}
            />
          </Form>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      
  );
};
export default withRouter(Searchbar)
