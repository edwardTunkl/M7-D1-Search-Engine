import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import './App.css';
import Searchbar from "./Components/Searchbar";
import Home from "./Components/Home"
import Company from "./Components/Company"
import Favourites from "./Components/Favourites"

const App = () => {

return(
  <Router>
    <div className=" background ">
    <Searchbar />
    <Container>
    <Route path="/" exact render={(routerProps) => <Home {...routerProps}/>} />
    <Route path="/company/:id" exact render={(routerProps) => <Company {...routerProps} />} />
    <Route path="/favourites" exact render={(routerProps) => <Favourites {...routerProps} />} />
    </Container>
    </div>
  </Router>

)}
export default App;
