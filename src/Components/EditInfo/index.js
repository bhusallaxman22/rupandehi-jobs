import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  TextField,
  Grid,
  Container,
  CssBaseline,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { School,RecentActors, TouchApp, Public, DynamicFeed } from "@material-ui/icons";
import Settings from "@material-ui/icons/Settings";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box key={value} p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
    key: { index },
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "80px",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    minHeight: "75vh",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
  },
  linker: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddredd] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [user, setUser] = useState({});
  const [edu, setEdu] = useState([]);
  const [insti, setInsti] = useState("");
  const [starty, setStarty] = useState("");
  const [endy, setEndy] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [dp, setDp] = useState("");
  // const [course, setCourse] = useState("");
  // const [trainings, setTraning] = useState([]);
  const [tinist, setTinist] = useState("");
  const [tcourse, setTcourse] = useState("");
  const [duration, setDuration] = useState("");
  const [remark, setRemark] = useState("");
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const BasicInfo = () => {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form key={"form-1"} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    id="standard-textarea"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    id="contact"
                    label="Contact No."
                    name="contact"
                    autoComplete="Phone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={address}
                    onChange={(event) => setAddredd(event.target.value)}
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    fullWidth
                    type="email"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    id="bio"
                    label="Bio"
                    name="bio"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    focused
                    type="date"
                    value={dob}
                    onChange={(event) => setDob(event.target.value)}
                    fullWidth
                    id="dob"
                    label="Date of Birth"
                    name="dob"
                    autoComplete="DOB"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Cancel
              </Button>
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </div>
    );
  };
  function Education() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete=""
                    name="Institute"
                    variant="outlined"
                    value={insti}
                    onChange={(event) => setInsti(event.target.value)}
                    required
                    fullWidth
                    id="institute"
                    label="Institute Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    value={starty}
                    onChange={(event) => setStarty(event.target.value)}
                    fullWidth
                    id="syear"
                    label="Start Year"
                    name="syear"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={endy}
                    onChange={(event) => setEndy(event.target.value)}
                    id="eyear"
                    label="End Year"
                    name="eyear"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={cgpa}
                    onChange={(event) => setCgpa(event.target.value)}
                    id="cgpa"
                    label="CGPA"
                    name="cgpa"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Cancel
              </Button>
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </div>
    );
  }
  function Trainings() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete=""
                    name="Institute"
                    variant="outlined"
                    value={tinist}
                    onChange={(e) => setTinist(e.target.value)}
                    required
                    fullWidth
                    id="institute"
                    label="Institute Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    value={tcourse}
                    onChange={(e) => setTcourse(e.target.value)}
                    fullWidth
                    id="course-name"
                    label="Course Name"
                    name="course-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    id="course-duration"
                    label="Course Duration"
                    name="eyear"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    // required
                    fullWidth
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    id="remarks"
                    label="Remarks"
                    name="remarks"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Cancel
              </Button>
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </div>
    );
  }
  function SKillsExperience() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete=""
                    name="skill"
                    variant="outlined"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    required
                    fullWidth
                    id="skill"
                    label="Your Skill"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="course-name"
                    label="Course Name"
                    name="course-name"
                  />
                </Grid> */}
                {/*  <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={"3 months"}
                    id="course-duration"
                    label="Course Duration"
                    name="eyear"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    // required
                    fullWidth
                    value={"Remarks"}
                    id="remarks"
                    label="Remarks"
                    name="remarks"
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Cancel
              </Button>
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </div>
    );
  }
  function OtherInfo() {
    return <div></div>;
  }

  useEffect(() => {
    if (localStorage.getItem("type") !== "A") window.location.href = "/#404";
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    axios.get("/api/user/edu", config).then((res) => {
      setEdu(res.data);
    });
    axios.get("/api/user/skills", config).then((res) => {
      setSkills(res.data);
    });
    axios.get("/api/user/auth", config).then(async (res) => {
      setUser(res.data);
      if (user.dp) {
        try {
          const result = await axios.get(
            "/api/dp/download/" + localStorage.getItem("id"),
            {
              responseType: "blob",
            }
          );
          setDp(URL.createObjectURL(result.data));
        } catch (error) {
          if (error.response && error.response.status === 400) {
            alert("Error while downloading DP file. Try again later");
          }
        }
      }
    });
  });

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Edit Info"
        className={classes.tabs}
      >
        <Tab dp={dp} icon={<RecentActors/>} label={`Basic Info`} {...a11yProps(0)} />
        <Tab icon={<School />} edu={edu} label="Education" {...a11yProps(1)} />
        <Tab icon={<TouchApp />}  label="Trainings" {...a11yProps(2)} />
        <Tab icon={<Settings />} skills={skills} label="Skills and Experience" {...a11yProps(3)} />
        {/* <Tab icon={<Public />} label="Social Accounts" {...a11yProps(4)} /> */}
        <Tab icon={<DynamicFeed />} label="Other Info" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography component="h2" variant="strong">
          Basic Information
        </Typography>
        {BasicInfo()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography component="h2" variant="strong">
          Education
        </Typography>
        {Education()}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography component="h2" variant="strong">
          Trainings
        </Typography>
        {Trainings()}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography component="h2" variant="strong">
          Skills and Experience
        </Typography>
        {SKillsExperience()}
      </TabPanel>
      {/* <TabPanel value={value} index={4}>
        <Typography component="h2" variant="strong">
          Social Accounts
        </Typography>
        {SocialAccounts()}
      </TabPanel> */}
      <TabPanel value={value} index={5}>
        <Typography component="h2" variant="strong">
          Other Information
        </Typography>
        {OtherInfo()}
      </TabPanel>
    </div>
  );
}
