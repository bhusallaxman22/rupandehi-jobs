import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Pagination } from "@material-ui/lab/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 450,
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
  salary: {
    color: "#4ee44e",
  },
}));

export default function JobCard({ jobs, error, loading, errorMessage }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(3);

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

  if (loading) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  placeItems: "center",
                }}
                variant="h5"
                component="h3"
              >
                Loading...
              </Typography>
            </Paper>
            <Grid item xs={12}>
              <Typography
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  placeItems: "center",
                }}
                variant="h5"
                component="h3"
              >
                <CircularProgress />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h3">
                {errorMessage}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (jobs.length === 0 && !loading && !error) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h3">
                No jobs available
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
  // Sort jobs by deadline and return the first 10 jobs
  const sortedJobs = jobs.sort((a, b) => {
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
      <Typography variant="h4" className={classes.text}>
        Recent Job listings.
      </Typography>
      <Grid container>
        {paginateGood(sortedJobs, pageSize, page).map((job) => {
          // const name = job.title.replace(/ /g, "-").toLowerCase();
          // const jobid = job._id.slice(-4);
          return (
            <Grid item key={job._id} className={classes.jobPaper}>
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
                    <Grid item xs container direction="column" spacing={2}>
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
        <Grid item xs={12}>
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
      </Grid>
    </div>
  );
}
