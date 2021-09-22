import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  Divider,
  Container,
  Button,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  Link,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import Snack from "../common/snack";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: "70vh",
    flexDirection: "column",
    justifyContent: "center",
    placeItems: "center",
    margin: "20px 20px 20px 20px",
  },
  card: {
    margin: "20px",
  },
  media: {
    height: 140,
  },
});

export default function JobDescription() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const [open1, setOpen1] = React.useState(false);
  const [job, setJob] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [sever, setSever] = React.useState("");
  const [myApplications, setMyApplications] = React.useState([]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    // fetch from server from route /api/list/:id
    var config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    axios
      .get(`/api/list/job/${params.id}`)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
    axios
      .post("/api/appl/", { cond: { uid: localStorage.getItem("id") } }, config)
      .then((res) => {
        setMyApplications(res.data);
      });

  }, [params.id]);

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  function renderRequirement() {
    return { __html: job.requirements };
  }
  function renderDescription() {
    return { __html: job.description };
  }
  const handleApply = () => {
    const req = {
      rid: job.rid,
      uid: localStorage.getItem("id"),
      lid: job._id,
      title: job.title,
      name_r: "Rupandehi Job",
      salary: job.salary,
    };
    console.clear();
    console.log(req);
    var config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    axios
      .post("/api/appl/add", req, config)
      .then((response) => {
        setSnackMessage("Job Applied successfully");
        setSever("success");
        setOpen(true);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setSnackMessage("You're not Logged In, Please login to continue!");
          setSever("error");
          setOpen(true);
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        }
      });
    setOpen1(false);
  };
  const handleApplied = () => {
    return myApplications.map((app) =>
      app.lid === job._id ? (
        <TableRow key={app._id}>
          <TableCell>{app.title}</TableCell>
          <TableCell>{app.name_r}</TableCell>
          <TableCell>{app.salary}</TableCell>
          <TableCell>
            <Moment format="YYYY/MM/DD">{app.createdAt}</Moment>
          </TableCell>
        </TableRow>
      ) : null
    );
  };

  if (loading) {
    return (
      <div className={classes.root}>
        <Grid
          style={{
            textAlign: "center",
            justifyContent: "center",
            placeItems: "center",
          }}
          container
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ width: "250px" }}>
              <Typography variant="h5" component="h3">
                Loading...
              </Typography>
            </Paper>
            <Grid item xs={12}>
              <Typography variant="h5" component="h3">
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
        <Grid
          style={{
            textAlign: "center",
            justifyContent: "center",
            placeItems: "center",
          }}
          container
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ width: "250px" }}>
              <Typography variant="h5" component="h3">
                Error Getting Job
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  const RenderButton = () => {
    if (myApplications.length > 0) {
      for (let i = 0; i < myApplications.length; i++) {
        if (myApplications[i].lid === job._id) {
          return (
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={handleApplied}
            >
              Applied
            </Button>
          );
        }
      }
    }
    return (
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: "10px" }}
        onClick={handleClickOpen}
      >
        Apply
      </Button>
    );
  };
  function FormDialog() {
    return (
      <div>
        <Dialog
          open={open1}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Application</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to apply for this job?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1} color="primary">
              Cancel
            </Button>
            <Button onClick={handleApply} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={
            loading
              ? "Rupandehi Job"
              : `Job opening for ${job.title} for ${job.applicant_no} at Rupandehi Job`
          }
        />
        <title> {!loading ? `${job.title}` : ""} - Rupandehi Job</title>
      </Helmet>
      <Box justifyContent="center" className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="/assets/images/rupandehi.svg"
              title="rupandehi job"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                A Reputed Company
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                A Reputed Company is looking for a great candidate to join the team.
                The job is for a {job.title}. <br />The job description is below.
                Rupandehi Job urges eligible candidates to apply for this job.<br />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Box>
          <Card className={classes.card}>
            <CardContent>
              <Container>
                <CardContent>
                  <Typography variant="h5" component="strong">
                    Basic Job Information
                  </Typography>
                  <Divider />
                </CardContent>
                <CardContent>
                  <Typography variant="h6" color="secondary" component="p">
                    {job.title}
                  </Typography>
                  {"\t \t \t"}
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="span"
                  >
                    Deadline:
                    <Moment durationFromNow>{job.deadline}</Moment> 
                    {job.deadline<moment(Date()).format("YYYY-MM-DD") ? (
                      <Typography component="strong" color="secondary" variant="h6"> ago. expired</Typography>
                    ) : (
                      ""
                    )}
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <tbody>
                        <TableRow>
                          <TableCell width="33%">Job Category</TableCell>
                          <TableCell width="3%">:</TableCell>
                          <TableCell width="64%">
                            <Link href="#">{job.category}</Link>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Job Level</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>
                            <Link href="/job-level/mid_level/">
                              {job.level}
                            </Link>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>No. of Vacancy/s</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>
                            [ <strong>{job.applicant_no}</strong> ]
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Employment Type</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell itemProp="employmentType">
                            {job.type}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Job Location</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>
                            <span>{job.job_location}</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Offered Salary</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>{job.salary}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            Apply Before<span>(Deadline)</span>
                          </TableCell>
                          <TableCell>:</TableCell>
                          <TableCell>
                            <Moment format="DD-MM-YYYY, hh:mm:ss">
                              {job.deadline}
                            </Moment>
                            <Divider orientation="vertical" />
                            {job.deadline<moment(Date()).format("YYYY-MM-DD") ? (
                      <Typography component="strong" color="secondary" > expired</Typography>
                    ) : (
                      ""
                    )}
                          </TableCell>
                        </TableRow>
                      </tbody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Container>
            </CardContent>
            <Divider className="mt-0 mb-4" />

            <CardContent>
              <Container>
                <CardContent>
                  {" "}
                  <Typography variant="h5" component="strong">
                    Job Specification
                  </Typography>{" "}
                </CardContent>
                <CardContent>
                  <Table>
                    <tbody>
                      <TableRow>
                        <TableCell width="33%">Education Level</TableCell>
                        <TableCell width="3%">:</TableCell>
                        <TableCell width="64%">
                          <span itemProp="educationRequirements">
                            {job.edu_level}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width="33%">Experience Required</TableCell>
                        <TableCell width="3%">:</TableCell>
                        <TableCell width="64%">
                          <span itemProp="experienceRequirements">
                            {job.experience}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width="33%">
                          Professional Skill Required
                        </TableCell>
                        <TableCell width="3%">:</TableCell>
                        <TableCell width="64%">
                          <Typography
                            variant="body1"
                            component="span"
                            itemProp="skills"
                          >
                            {job.skills &&
                              job.skills.map((skill) => (
                                <span key={skill}>
                                  <Typography
                                    color="secondary"
                                    variant="subtitle2"
                                    component="span"
                                  >
                                    {skill}{" "}
                                  </Typography>
                                </span>
                              ))}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </tbody>
                  </Table>
                  <CardContent>
                    <Container>
                      <CardContent>
                        <Typography variant="h6" component={"strong"}>
                          Other Specification
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Typography>
                          <strong>Requirements</strong>
                        </Typography>
                        <div
                          itemProp="requirements"
                          dangerouslySetInnerHTML={renderRequirement()}
                        />
                      </CardContent>
                    </Container>
                  </CardContent>
                </CardContent>
              </Container>
            </CardContent>
            <Divider />

            <CardContent>
              <Container>
                <CardContent>
                  <Typography variant="h6" component="p">
                    {" "}
                    Job Description
                  </Typography>
                  <Container itemProp="description">
                    <div dangerouslySetInnerHTML={renderDescription()} />
                    <p>
                      <Typography component="strong">
                        Applying Procedure:
                      </Typography>
                    </p>
                    <Typography variant="subtitle1" component="strong">
                      {job.apply_note}
                    </Typography>
                    <Typography variant="body1">
                      <strong>OR,</strong>
                    </Typography>
                  </Container>
                </CardContent>
              </Container>
              <Divider />
              <Container>
                {/* <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={() => handleClickOpen()}
                >
                  APPLY NOW
                </Button> */}
                <RenderButton />
                <FormDialog />
              </Container>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Snack
        open={open}
        handleClose={handleClose}
        sever={sever}
        message={snackMessage}
      />
    </>
  );
}
