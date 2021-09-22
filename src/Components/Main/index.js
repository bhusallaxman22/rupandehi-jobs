import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core/";
import JobCard from "../JobCard";
import Hero from "../Hero";
import moment from "moment";
import axios from "axios";
import Fuse from "fuse.js";
import { Helmet } from "react-helmet";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    minHeight: "75vh",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const fixDate = (list) => {
  let returnValue = [];
  var oldDate1;
  var oldDate2;
  for (var i = 0; i < list.length; i++) {
    oldDate1 = new Date(list[i].deadline);
    oldDate1 = moment(oldDate1).format("HH:mm , D-MM-YYYY");
    list[i].deadline = oldDate1;
    oldDate2 = new Date(list[i].postedOn);
    oldDate2 = moment(oldDate2).format("HH:mm , DD-MM-YYYY");
    list[i].postedOn = oldDate2;
    returnValue.push(list[i]);
  }
  return returnValue;
};

export default function Main() {
  const classes = useStyles();

  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  React.useEffect(() => {
    // fetch jobs from /api/list/ using axios post with search as deadline
    // if (localStorage.getItem("type") !== "A") window.location.href = "/404";

    axios
      .post("/api/list/", { cond: { deadline: { $gte: new Date() } } })
      .then((res) => {
        var fixed = fixDate(res.data);
        setJobs(fixed);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
        setErrorMessage(err.response.data.message);
      });
  }, []);
  const fuse = new Fuse(jobs, {
    keys: ["title", "level", "type", "location", "category"],
    includeScore: true,
    threshold: 0.3,
  });

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    setSearchResult(fuse.search(e.target.value));
  };

  return (
    <>
      <Helmet>
        <title>Home - Rupandehi Job</title>
        <meta
          name="description"
          content="Rupandehi Job is a job portal for the people of Rupandehi. We are a community of people who are passionate about the job market in Rupandehi."
        />
      </Helmet>
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Hero search={search} onChangeSearch={onChangeSearch} />
            <Divider />
          </Grid>
          <Divider />
          <br />
          <JobCard
            jobs={
              searchResult.length > 0
                ? searchResult.map((job) => job.item)
                : jobs
            }
            loading={loading}
            error={error}
            errorMessage={errorMessage}
            searchResult={searchResult}
          />
        </Grid>
      </div>
    </>
  );
}
