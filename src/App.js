// import { Container } from "@material-ui/core"
import Nav from "./Components/Nav";
import Main from "./Components/Main"
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
      <Route  exact path="/"> 
      <Main />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
