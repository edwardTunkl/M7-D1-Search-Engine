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
const [searchBy, setSearchBy] = useState("")
console.log("SearchBY", searchBy)

const onChange = (query) => {
  setSearch(query);
};
const changeSearch = (query) => {
  setSearchBy(query)
}

return(
  <Router>
    <div className="vh-100 background">
    <Searchbar onChange={onChange} changeSearch={changeSearch} />
    <Container>
    <Route path="/" exact render={(routerProps) => <Home {...routerProps} search={search} searchBy={searchBy} />} />
    <Route path="/company" exact render={(routerProps) => <Company {...routerProps} />} />
    </Container>
    </div>
  </Router>

)}
export default App;
