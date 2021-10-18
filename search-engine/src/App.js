import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import './App.css';
import Searchbar from "./Components/Searchbar";
import Home from "./Components/Home"
import Company from "./Components/Company"
import { useState } from "react";

const App = () => {

const [search, setSearch] = useState({})

const onChange = (query) => {
  setSearch({ query });
};


return(
  <Router>
    <Container>
    <Searchbar onChange={onChange}/>
    <Route path="/" exact render={(routerProps) => <Home {...routerProps} search={search} />} />
    <Route path="/company" exact render={(routerProps) => <Company {...routerProps} />} />

    </Container>
  </Router>

)}
export default App;
