import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  Container,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  makeStyles,
} from "@material-ui/core";
import Moment from "react-moment";
const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "70vh",
    backgroundColor: theme.palette.background.paper,
    padding: "0px",
    border: "none",
    boxShadow: "none",
    fontSize: "1.2em",
    fontFamily: "Roboto, sans-serif",
  },
  list: {
    listStyle: "none",
    padding: "0px",
    margin: "0px",
    border: "none",
    boxShadow: "none",
    fontSize: "1.2em",
    fontFamily: "Roboto, sans-serif",
  },
}));

function MyApplications(props) {
  const classes = useStyle();
  const [apps, setApps] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    var req = {
      cond: { uid: localStorage.getItem("id") },
    };
    axios
      .post(`/api/appl`, req, config)
      .then((response) => {
        setApps(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apps._id]);

  if (loading) {
    return (
      <Container className={classes.root}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
      <h1>My Applications</h1>
      {/* show app job employer, title, status, salary,applied date in condensed table with pagination */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job</TableCell>
            <TableCell>Employer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Applied Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app._id}>
              <TableCell>
                <Link to={`/jobs/${app.lid}`}>{app.title}</Link>
              </TableCell>
              <TableCell>{app.name_r}</TableCell>
              <TableCell>{app.Status}</TableCell>
              <TableCell>{app.salary}</TableCell>
              <TableCell>
                <Moment format="MM/DD/YYYY">{app.date}</Moment>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default MyApplications;

