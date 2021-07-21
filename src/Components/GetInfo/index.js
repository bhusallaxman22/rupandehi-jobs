import React,{useState} from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Settings from "@material-ui/icons/Settings";
import Contact from "@material-ui/icons/ContactMail";
import Box from "@material-ui/core/Box";
import {
  TextField,
  Grid,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { School, TouchApp,DynamicFeed } from "@material-ui/icons";
// const QontoConnector = withStyles({
//   alternativeLabel: {
//     top: 10,
//     left: 'calc(-50% + 16px)',
//     right: 'calc(50% + 16px)',
//   },
//   active: {
//     '& $line': {
//       borderColor: '#784af4',
//     },
//   },
//   completed: {
//     '& $line': {
//       borderColor: '#784af4',
//     },
//   },
//   line: {
//     borderColor: '#eaeaf0',
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },
// })(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <Contact />,
    2: <School />,
    3: <TouchApp />,
    4: <Settings />,
    5: <DynamicFeed />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "80px",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
    // marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
  },
  linker: {
    color: "inherit",
    textDecoration: "none",
  },
}));

function getSteps() {
  return [
    "Basic Info",
    "Education",
    "Trainings",
    "Skills and Experience",
    "Miscellaneous"
  ];
}


export default function GetInfo() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
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

  const steps = getSteps();

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
            </form>
          </div>
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
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </div>
    );
  }


  function getStepContent(step) {
    switch (step) {
      case 0:
        return BasicInfo();
      case 1:
        return Education();
      case 2:
        return Trainings();
      case 3:
        return SKillsExperience();
        case 4:
          return "Extra Info";
      default:
        return "Unknown step";
    }
  }
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
