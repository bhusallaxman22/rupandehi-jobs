import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import moment from "moment";
import Fuse from "fuse.js";
import {
  InputBase,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
// import { fade } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Pagination } from "@material-ui/lab/";

// import { jobs } from "../JobCard/jobs";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "70vh",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "0px 20px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 450,
    // maxHeight: 180,
  },

  image: {
    width: 128,
    height: 128,
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  jobPaper: {
    margin: "10px 10px 10px 10px",
  },
  linker: {
    color: "inherit",
    textDecoration: "none",
  },
  search: {
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
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
  salary: {
    color: "#4ee44e",
  },
}));

export default function Jobs() {
  const classes = useStyles();
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(6);

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
        setErrorMessage(err.response);
      });
  }, []);
  const fuse = new Fuse(jobs, {
    keys: ["title", "level", "type", "location", "category"],
    includeScore: true,
    threshold: 0.3,
  });
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  function paginateGood(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    setSearchResult(fuse.search(e.target.value));
    setPage(1);
  };

  const sJob =
    searchResult.length > 0 ? searchResult.map((job) => job.item) : jobs;
  const sortedJobs = sJob.sort((a, b) => {
    if (a.postedOn < b.postedOn) {
      return 1;
    } else if (a.postedOn > b.postedOn) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <div className={classes.root}>
      <Grid container alignContent="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.text}>
            Recent Job Openings.
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
        {loading ? (
          <Grid item xs={12}>
            <Box p={4}>
              <Typography variant="h4" color="textSecondary">
                Loading...
                <CircularProgress />
              </Typography>
            </Box>
          </Grid>
        ) : error ? (
          <Grid item xs={12}>
            <Box p={4}>
              <Typography variant="h4" color="textSecondary">
                Error
              </Typography>
              <Typography variant="h5" color="textSecondary">
                {errorMessage}
              </Typography>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Grid container>
              {paginateGood(sortedJobs, pageSize, page).map((job) => {
                // const name = job.title.replace(/ /g, "-").toLowerCase();
                // const jobid = job._id.slice(-4);
                return (
                  <Grid item key={job.name} className={classes.jobPaper}>
                    <Paper className={classes.paper}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <ButtonBase className={classes.image}>
                            <img
                              className={classes.img}
                              alt="complex"
                              src={"/assets/images/rupandehi.jpg"}
                            />
                          </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography
                                color="primary"
                                gutterBottom
                                variant="subtitle1"
                              >
                                {job.title}
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                {job.type}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Level: {job.level}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Link
                                className={classes.linker}
                                to={
                                  // `/jobs/${name}-${jobid}`
                                  `/jobs/${job._id}`
                                }
                              >
                                <Button
                                  size="small"
                                  color="secondary"
                                  variant="outlined"
                                >
                                  View Job
                                </Button>
                              </Link>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ marginLeft: "5px" }}
                              color="textSecondary"
                            >
                              Salary:
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              className={classes.salary}
                            >
                              {job.salary}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
            <Pagination
              className="my-3"
              count={Math.ceil(sortedJobs.length / pageSize)}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              color="secondary"
              onChange={handlePageChange}
            />
            {/* Items per page */}
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Items per page
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageSize}
                autoFocus
                onChange={handlePageSizeChange}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
