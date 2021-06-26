// import { Container } from "@material-ui/core"
import Nav from "./Components/Nav";
import routes from './config/routes.js';
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
    </Router>
  );
}

export default App;
