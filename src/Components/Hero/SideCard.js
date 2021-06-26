import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    opacity: "90%",
    background: "#d3d3d3",
    margin:"20px"
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SideCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          We can get you the job you want.
        </Typography>

        <Typography variant="body2" component="p">
          Browse for jobs below.
          <br />
          <Typography variant="h6" component="strong"> {"We get you employed."}</Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Link style={{color:"inherit", textDecoration:"none"}} to={"/jobs"}>
          <Button size="small" variant="contained" color="primary">explore jobs</Button>
        </Link>
      </CardActions>
    </Card>
  );
}