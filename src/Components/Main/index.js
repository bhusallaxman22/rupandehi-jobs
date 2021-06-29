import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core/';
import JobCard from '../JobCard';
import Hero from "../Hero"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    minHeight:"75vh",
    alignItems: "center",
    marginTop:"5em"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Hero />
          <Divider />
        </Grid>
        <Divider />
        <br />
        <JobCard />
      </Grid>
    </div>
  );
}
