import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Divider, Typography } from '@material-ui/core/';
import JobCard from '../JobCard';
import Hero from "../Hero"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display:"flex",
    alignItems:"center"
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
        <Typography variant="h4">
          Recent Job listings.
        </Typography>
        <Divider />
        <JobCard />
      </Grid>
    </div>
  );
}
