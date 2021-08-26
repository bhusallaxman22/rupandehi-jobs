import React, { useEffect, useState } from "react";
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
import Select from "@material-ui/core/Select";
import {
  TextField,
  Grid,
  Container,
  CssBaseline,
  InputLabel,
  MenuItem,
  Paper,
  Divider,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { FormControl } from "@material-ui/core";
import { School, TouchApp, DynamicFeed } from "@material-ui/icons";
import moment from "moment";
import axios from "axios";
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
    marginTop: "20px",
    minHeight: "70vh",
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  chipp: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
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
    "Miscellaneous",
  ];
}

export default function GetInfo() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [religion, setReligion] = useState("");
  const [nationality, setNationality] = useState("Nepali");
  const [gender, setGender] = useState("");
  const [skill, setSkill] = useState([]);
  const [special, setSpecial] = useState([]);
  const [yoe, setYoe] = useState("");

  const [marital_status, setMaritalStatus] = useState("Single");
  const [inputList, setInputList] = useState([
    { insti: "", starty: "", endy: "", cgpa: "", course: "", level: "" },
  ]);
  const [inputList2, setInputList2] = useState([
    { insti: "", duration: "", complete_date: "", course: "", remark: "" },
  ]);

  const [chipData, setChipData] = React.useState([]);
  const [chipData1, setChipData1] = React.useState([]);

  useEffect(() => {
    // use axios to fetch data from the /api/user/auth route
    let config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    axios
      .get("/api/user/auth", config)
      .then((res) => {
        setName(res.data.Name);
        setEmail(res.data.Email);
        setContact(res.data.Contact);
        setAddress(res.data.Address);
        setDob(moment(res.data.dob).format("YYYY-MM-DD"));
        setBio(res.data.Bio);
        setReligion(res.data.religion);
        setYoe(res.data.yoe);
        setNationality(res.data.nationality);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChipData = (e) => {
    e.preventDefault();
    const newChip = [...chipData, skill];
    console.log(newChip);
    setChipData(newChip);
    setSkill("");
  };
  const handleChipData1 = () => {
    const newChip = [...chipData1, special];
    console.log(newChip);
    setChipData1(newChip);
    setSpecial("");
  };

  const handleSkillSubmit = () => {
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    for (let index = 0; index < chipData.length; index++) {
      var req = {
        uid: localStorage.getItem("id"),
        Name: chipData[index],
      };
      axios
        .post("/api/user/skills/add/", req, config)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          if (err.response.data) alert(err.response.data);
        });
    }
  };
  const handleSpecialSubmit = () => {
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    for (let index = 0; index < chipData1.length; index++) {
      var req = {
        uid: localStorage.getItem("id"),
        Name: chipData1[index],
      };
      axios
        .post("/api/user/special/add/", req, config)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          if (err.response.data) alert(err.response.data);
        });
    }
  };

  const onAddInfo = async (e) => {
    e.preventDefault();
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const data = {
      Name: name,
      Email: email,
      Contact: contact,
      Address: address,
      dob: dob,
      yoe: yoe,
      Bio: bio,
      gender: gender,
      marital_status: marital_status,
      nationality,
      religion,
    };
    await axios
      .post("/api/user/profile", data, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setName("");
          setEmail("");
          setContact("");
          setAddress("");
          setDob("");
          setBio("");
          setGender("");
          setYoe("");
          setMaritalStatus("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };
  const handleDelete1 = (chipToDelete) => () => {
    setChipData1((chips) => chips.filter((chip) => chip !== chipToDelete));
  };
  const handleInputChange1 = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList2];
    list[index][name] = value;
    setInputList2(list);
  };
  const onAddEdu = async (e, i) => {
    e.preventDefault();
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "content-type": "application/json",
        "Access-Control-Allow-Headers": "Origin",
      },
    };
    const req = {
      edu: {
        institute: inputList[i].insti,
        level: inputList[i].level,
        course: inputList[i].course,
        start_year: inputList[i].starty,
        end_year: inputList[i].endy,
        cgpa: inputList[i].cgpa,
        uid: localStorage.getItem("id"),
      },
    };
    console.log(req);

    await postRequest();
    // post req to route /api/user/edu/update with config using axios
    async function postRequest() {
      axios
        .post("/api/user/edu/update", req, config)
        .then((response) => {
          if (response.status === 200) {
            console.log("Success");
          } else {
            console.log("Error");
          }
        })
        .catch((err) => {
          if (err.response.data) alert(err.response.data);
        });
    }
  };
  const onAddTraining = async (e, i) => {
    e.preventDefault();
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "content-type": "application/json",
        "Access-Control-Allow-Headers": "Origin",
      },
    };
    const req = {
      traning: {
        institute: inputList2[i].insti,
        duration: inputList2[i].duration,
        course: inputList2[i].course,
        completion_date: inputList2[i].complete_date,
        remark: inputList2[i].remark,
        uid: localStorage.getItem("id"),
      },
    };
    console.log(req);
    await postRequest();
    // post req to route /api/user/edu/update with config using axios
    async function postRequest() {
      axios
        .post("/api/user/traning/update", req, config)
        .then((response) => {
          if (response.status === 200) {
            console.log("Success");
            setInputList2([
              {
                insti: "",
                duration: "",
                complete_date: "",
                course: "",
                remark: "",
              },
            ]);
          } else {
            console.log("Error");
          }
        })
        .catch((err) => {
          if (err.response.data) alert(err.response.data);
        });
    }
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleRemoveClick1 = (index) => {
    const list = [...inputList2];
    list.splice(index, 1);
    setInputList2(list);
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { insti: "", starty: "", endy: "", cgpa: "", course: "", level: "" },
    ]);
  };
  const handleAddClick1 = () => {
    setInputList2([
      ...inputList2,
      { insti: "", duration: "", complete_date: "", course: "", remark: "" },
    ]);
  };

  const steps = getSteps();

  const BasicInfo = () => {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form key={"form-1"} onSubmit={onAddInfo} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    id="standard-textarea"
                    label="Full Name"
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
                    onChange={(event) => setAddress(event.target.value)}
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="marital_status">Marital Status</InputLabel>
                  <Select
                    fullWidth
                    value={marital_status}
                    onChange={(event) => setMaritalStatus(event.target.value)}
                    id="marital-status"
                    label="Marital Status"
                    name="marital_status"
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                    <MenuItem value="Widowed">Widowed</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    fullWidth
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    id="gender"
                    label="Gender"
                    name="gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="religion"
                    name="religion"
                    variant="outlined"
                    value={religion}
                    required
                    onChange={(e) => setReligion(e.target.value)}
                    fullWidth
                    id="Religion"
                    label="Religion"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={nationality}
                    onChange={(event) => setNationality(event.target.value)}
                    id="nationality"
                    label="Nationality"
                    name="nationality"
                    autoComplete="nationatility"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    fullWidth
                    type="text"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    id="bio"
                    label="Bio"
                    name="bio"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    focused
                    type="number"
                    value={yoe}
                    onChange={(event) => setYoe(event.target.value)}
                    fullWidth
                    id="yoe"
                    label="Years os work Experience"
                    name="yoe"
                    autoComplete="yoe"
                  />
                </Grid>
                <Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                  >
                    Save
                  </Button>
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
        <Container maxWidth="xs">
          <CssBaseline />

          <div className={classes.paper}>
            {inputList.map((x, i) => {
              return (
                <form className={classes.form} onSubmit={(e) => onAddEdu(e, i)}>
                  <Grid key={i} container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete=""
                        name="insti"
                        variant="outlined"
                        value={x.insti}
                        onChange={(e) => handleInputChange(e, i)}
                        required
                        fullWidth
                        id="institute"
                        label="Institute Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete=""
                        name="course"
                        variant="outlined"
                        value={x.course}
                        onChange={(e) => handleInputChange(e, i)}
                        required
                        fullWidth
                        id="course"
                        label="Course"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Level
                        </InputLabel>
                        <Select
                          fullWidth
                          name="level"
                          labelId="level"
                          id="level"
                          value={x.level}
                          onChange={(e) => handleInputChange(e, i)}
                        >
                          <MenuItem value={"Masters"}>Masters</MenuItem>
                          <MenuItem value={"Bachelor"}>Bachelor</MenuItem>
                          <MenuItem value={"+2"}>+2</MenuItem>
                          <MenuItem value={"S.E.E"}>S.E.E</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        value={x.starty}
                        onChange={(event) => handleInputChange(event, i)}
                        fullWidth
                        id="syear"
                        label="Start Year"
                        name="starty"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={x.endy}
                        onChange={(event) => handleInputChange(event, i)}
                        id="eyear"
                        label="End Year"
                        name="endy"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={x.cgpa}
                        onChange={(event) => handleInputChange(event, i)}
                        id="cgpa"
                        label="CGPA"
                        name="cgpa"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="text"
                        size="large"
                        color="secondary"
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        {inputList.length !== 1 && (
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleRemoveClick(i)}
                            >
                              Remove
                            </Button>
                          </Grid>
                        )}
                        {inputList.length - 1 === i && (
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddClick}
                            >
                              Add
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              );
            })}
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
            {inputList2.map((x, i) => {
              return (
                <form
                  onSubmit={(e) => onAddTraining(e, i)}
                  className={classes.form}
                >
                  <Grid key={i} container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete=""
                        name="insti"
                        variant="outlined"
                        value={x.insti}
                        onChange={(e) => handleInputChange1(e, i)}
                        required
                        fullWidth
                        id="train-Institute"
                        label="Institute Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        value={x.course}
                        onChange={(e) => handleInputChange1(e, i)}
                        fullWidth
                        id="course-name"
                        label="Course Name"
                        name="course"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={x.duration}
                        onChange={(e) => handleInputChange1(e, i)}
                        id="course-duration"
                        label="Course Duration"
                        name="duration"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={x.complete_date}
                        onChange={(e) => handleInputChange1(e, i)}
                        id="endyear"
                        label="Course Completion Date"
                        name="complete_date"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        // required
                        fullWidth
                        value={x.remark}
                        onChange={(e) => handleInputChange1(e, i)}
                        id="remarks"
                        label="Remarks"
                        name="remark"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="text"
                        size="large"
                        color="secondary"
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        {inputList2.length !== 1 && (
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleRemoveClick1(i)}
                            >
                              Remove
                            </Button>
                          </Grid>
                        )}
                        {inputList2.length - 1 === i && (
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddClick1}
                            >
                              Add
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }

  function SKillsExperience() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Typography variant="h5">Skills</Typography>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <form onSubmit={(e) => handleChipData(e)}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    id="skills"
                    label="Add Skills"
                    name="skills"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="text"
                    size="large"
                    color="secondary"
                  >
                    Add
                  </Button>
                </Grid>
              </form>
              <Grid item xs={12}>
                <Paper component="ul" className={classes.chipp}>
                  {chipData.map((data) => (
                    <li key={Math.random() * 56842555 + data}>
                      <Chip
                        label={data}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                      />
                    </li>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSkillSubmit()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <Typography variant="h5">Specializations</Typography>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <form onSubmit={handleChipData1}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={special}
                    onChange={(e) => setSpecial(e.target.value)}
                    id="specialization"
                    label="Add Specilization"
                    name="skills"
                    onSubmit={() => handleChipData1()}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="text"
                    size="large"
                    color="secondary"
                    onClick={() => handleChipData1()}
                  >
                    Add
                  </Button>
                </Grid>
              </form>
              <Grid item xs={12}>
                <Paper component="ul" className={classes.chipp}>
                  {chipData1.map((data) => (
                    <li key={Math.random() * 56842555 + data}>
                      <Chip
                        label={data}
                        onDelete={handleDelete1(data)}
                        className={classes.chip}
                      />
                    </li>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={() => handleSpecialSubmit()}>Save</Button>
              </Grid>
            </Grid>
          </div>
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
