import { useMemo } from "react"
import Nav from "./Components//Nav/nav";
import routes from './config/routes.js';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./Components/Footer";
// import { GlobalStyle } from "./Components/Nav/styles";
import MainState  from "./Components/Nav/context/mainState";
import { makeStyles,CssBaseline,useMediaQuery,Paper } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'


const useStyle = makeStyles({
  root:{
    minHeight:"100%",
    display:"flex",
    flexDirection:"column",
    marginBottom: "-50px",


  },
  footer:{
    marginTop:"auto",
    alignSelf:"flex-end",
    height: "50px",

  }
})
function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const classes= useStyle()
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className={classes.root} >
      <MainState >
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
      <Footer className={classes.footer} />
      </MainState>
      </Paper>
      </ThemeProvider>
    </Router>
  );
}

export default App;
