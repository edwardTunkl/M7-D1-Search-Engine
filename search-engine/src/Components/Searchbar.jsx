import {
  Navbar,
  Nav,
  NavDropdown,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import React from "react";
import { withRouter } from "react-router";
import "../search.css";
import { setQueryAction, setSearchByAction } from "../actions";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Searchbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Navbar bg="info" expand="lg">
      <Container className="px-4">
        <Navbar.Brand id="engine-name">
          <span className="title">80ies</span> Search-Engine
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className="text-warning shaddow ml-2"
              id="navi"
             
              onClick={() => history.push(`/`)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              id="navi"
              className="text-warning shaddow"
              
              onClick={() => history.push(`/favourites`)}
            >
              Favourites
            </Nav.Link>
            <NavDropdown
              title="Select Search"
              id="basic-nav-dropdown"
              style={({ fontSize: "1.5rem" }, { marginLeft: "8rem" })}
              className="mt-2 mr-2"
            >
              <NavDropdown.Item id="droppi"
                onClick={() => dispatch(setSearchByAction("Title"))}
              >
                Title
              </NavDropdown.Item>
              <NavDropdown.Item id="droppi"
                onClick={() => dispatch(setSearchByAction("Category"))}
              >
                Category
              </NavDropdown.Item>
              <NavDropdown.Item id="droppi"
                onClick={() => dispatch(setSearchByAction("Company"))}
              >
                Company
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2 mt-3"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  dispatch(setQueryAction(e.target.value));
                }
              }}
              onClick={() => history.push("/")}
            />
          </InputGroup>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default withRouter(Searchbar);
