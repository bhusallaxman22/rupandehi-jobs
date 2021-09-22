import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SideCard from "./SideCard";
import { InputBase, IconButton, Paper } from "@material-ui/core";
import { Search } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    height: "300px",
    background: `url("/assets/images/office2.jpg")`,
    // margin: "20px 20px 20px 20px",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "screen",
    backgroundSize: "cover",
  },
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "300px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bolder",
  },
}));

export default function Hero({ search, onChangeSearch }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid item>
            <Grid item xs={12}>
              <Typography className={classes.text} color="secondary">
                We make your dream come true.
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Paper component="form" className={classes.search}>
                <InputBase
                  className={classes.input}
                  value={search}
                  onChange={(e) => onChangeSearch(e)}
                  placeholder="search jobs by name category location"
                  inputProps={{ "aria-label": "search job list" }}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <Search />
                </IconButton>
              </Paper>{" "}
            </Grid>
          </Grid>
          <Divider />
          <Grid item xs={6} sm={2}>
            <SideCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
