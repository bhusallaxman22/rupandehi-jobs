import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  TextField,
  Grid,
  // FormControlLabel,
  Container,
  CssBaseline,
  // Checkbox,
  Button,
} from "@material-ui/core";

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
        <Box p={3}>
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
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "80px",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "75vh",
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
  const classes = useStyles();
  const [value, setValue] = useState(0);
  // const [renderInfoForm, setInfoForm] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function BasicInfo() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    value={"Laxman"}
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    value={"Bhushal"}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={"laxmanbhusal612@gmail.com"}
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
                    value={"9823830282"}
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
                    value={"Siyari 06, Rupandehi, Nepal"}
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    focused
                    type="date"
                    value={"2000-05-04"}
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
  }
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
                    value={"Prasadi Academy"}
                    required
                    fullWidth
                    id="institute"
                    label="Institute Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    value={"2016"}
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
                    value={"2018"}
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
                    value={"3.19"}
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
  function SKillsExperience() {
    return (
      <div>
        <h2>Education and Trainings</h2>
      </div>
    );
  }
  function SocialAccounts() {
    return (
      <div>
        <h2>Social Accounts</h2>
      </div>
    );
  }
  function OtherInfo() {
    return (
      <div>
        <h2>Other Infrmation</h2>
      </div>
    );
  }

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
        <Tab label="Basic Info" {...a11yProps(0)} />
        <Tab label="Education" {...a11yProps(1)} />
        <Tab label="Skills and Experience" {...a11yProps(2)} />
        <Tab label="Social Accounts" {...a11yProps(3)} />
        <Tab label="Other Info" {...a11yProps(4)} />
        {/* <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography component="h2" variant="strong">
          Basic Information
        </Typography>
        <BasicInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography component="h2" variant="strong">
          Education
        </Typography>
        <Education />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SKillsExperience />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SocialAccounts />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <OtherInfo />
      </TabPanel>
    </div>
  );
}
