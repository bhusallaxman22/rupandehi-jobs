// import { Container } from "@material-ui/core"
import Nav from "./Components//Nav/nav";
import routes from './config/routes.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./Components/Footer";
import { GlobalStyle } from "./Components/Nav/styles";
import MainState  from "./Components/Nav/context/mainState";

function App() {
  return (
    <Router>
        <GlobalStyle />
      <MainState>
      <Nav />
      <Switch>
        {routes.map((route) => (
          <Route
          exact
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
      <Footer />
      </MainState>
    </Router>
  );
}

export default App;
