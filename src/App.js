import { useEffect, useMemo, useState } from "react";
import Nav from "./Components/Nav/";
import routes from "./config/routes.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Components/Footer";
// import { GlobalStyle } from "./Components/Nav/styles";
import MainState from "./Components/Nav/context/mainState";
import {
  makeStyles,
  CssBaseline,
  useMediaQuery,
  Paper,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";

const useStyle = makeStyles({
  root: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    padding: "50px",
  },
  footer: {
    marginTop: "auto",
    alignSelf: "flex-end",
    height: "50px",
  },
});
function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const classes = useStyle();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const [LoggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        "x-auth-token": token,
      },
    };
    if (token) {
      axios
        .get("/api/user/auth", config)
        .then((response) => {
          if (response.data) {
            setUserType(response.data.type);
            if (response.data.type.length > 0) {
              setLoggedIn(true);
              localStorage.setItem("loggedIn", true);
              console.log(LoggedIn);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [LoggedIn, userType]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper>
          <MainState>
            <div className={classes.root} div>
              <div item>
                <Nav LoggedIn={LoggedIn} user_type={userType} />
              </div>
              <div item className={classes.main}>
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
              </div>
              <div item>
                <Footer className={classes.footer} />
              </div>
            </div>
          </MainState>
        </Paper>
      </ThemeProvider>
    </Router>
  );
}

export default App;
