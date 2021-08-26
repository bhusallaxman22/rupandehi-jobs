// create an animated 404 react component
import {
  Container,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { ErrorOutlineSharp } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
    minHeight: "70vh",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  error: {
    color: theme.palette.text.error,
  },
  card: {
    margin: theme.spacing(1),
  },
}));

export default function A404() {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography
            className={classes.error}
            variant="h6"
            color="inherit"
            align="center"
          >
            <ErrorOutlineSharp color="secondary" className={classes.icon} />
            404 Page Not Found
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            align="center"
            className={classes.card}
          >
            <Link to="/">Return Home</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
