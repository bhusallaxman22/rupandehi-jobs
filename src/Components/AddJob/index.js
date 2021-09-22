import React, { useState } from "react";
// import Editor from "nib-core";
import {
  Container,
  Typography,
  makeStyles,
  TextField,
  Select,
  MenuItem,
  Grid,
  Chip,
  Button,
  Divider,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import Snack from "../common/snack";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import GlobalStyle from "../Nav/styles/GlobalStyle";
import draftToHtml from "draftjs-to-html";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    marginTop: "20px",
    minHeight: "70vh",
  },
  headerTitle: {
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  quill: {
    marginTop: "20px",
    marginBottom: "20px",
    minHeight: "300px",
  },
  selectField: {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

function AddJob() {
  const classes = useStyles();

  // create empty state for the job title, description, and requirements,applicants_no,experience,salary,skills,location,apply_note,edu_level,level, job categorey,deadline,job type
  const [jobTitle, setJobTitle] = useState();
  const [jobRequirements, setJobRequirements] = useState(
    EditorState.createEmpty()
  );
  const [jobApplicantsNo, setJobApplicantsNo] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [jobSalary, setJobSalary] = useState();
  const [skill, setSkill] = useState("");
  const [jobLocation, setJobLocation] = useState();
  const [jobApplyNote, setJobApplyNote] = useState();
  const [jobEduLevel, setJobEduLevel] = useState();
  const [jobLevel, setJobLevel] = useState();
  const [jobCategory, setJobCategory] = useState();
  const [jobDeadline, setJobDeadline] = useState();
  const [jobType, setJobType] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [chipData, setChipData] = React.useState([]);

  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [sever, setSever] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChipData = (e) => {
    e.preventDefault();
    const newChip = [...chipData, skill];
    setChipData(newChip);
    setSkill("");
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const addJob = (e) => {
    e.preventDefault();
    // Get token from local storage
    var job = {
      title: jobTitle,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      requirements: draftToHtml(
        convertToRaw(jobRequirements.getCurrentContent())
      ),
      applicant_no: parseInt(jobApplicantsNo),
      curr_app: 0,
      accepted: 0,
      experience: jobExperience,
      salary: jobSalary,
      postedOn: new Date(),
      skills: chipData,
      job_location: jobLocation,
      apply_note: jobApplyNote,
      edu_level: jobEduLevel,
      level: jobLevel,
      category: jobCategory,
      deadline: jobDeadline,
      type: jobType,
      rid: localStorage.getItem("id"),
    };
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "content-type": "application/json",
        "Access-Control-Allow-Headers": "Origin",
      },
    };
    // Upload job to the server using axios
    axios
      .post("/api/list/add", job, config)
      .then((res) => {
        if (res.status === 200) {
          console.log("Job added successfully");
          setOpen(true);
          setSnackMessage("Job added successfully");
          setSever("success");
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
        setSnackMessage(`Error adding job ${err}`);
        setSever("error");
      });
  };
  if (localStorage.getItem("type") !== "R") {
    window.location.href = "/#404";
  }

  return (
    <div className={classes.root}>
      <GlobalStyle />
      <Typography className={classes.headerTitle} variant="h4">
        Add Job
      </Typography>
      <Container>
        <form>
          <Typography variant="h6">Job Title</Typography>
          <TextField
            required
            placeholder="Job Title"
            fullWidth
            variant="filled"
            id="title"
            name="title"
            onChange={(e) => setJobTitle(e.target.value)}
            value={jobTitle}
          />
          <Typography variant="h6">Job Description</Typography>
          <Paper className={classes.quill}>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={setEditorState}
            />
          </Paper>
          <Typography variant="h6">Job Requirements</Typography>
          <Paper className={classes.quill}>
            <Editor
              editorState={jobRequirements}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={setJobRequirements}
            />
          </Paper>
          <Typography variant="h6">Job Applicants No</Typography>
          <TextField
            required
            placeholder="Job Applicants No"
            fullWidth
            variant="filled"
            id="applicants_no"
            name="applicants_no"
            onChange={(e) => setJobApplicantsNo(e.target.value)}
            value={jobApplicantsNo}
          />
          <Typography variant="h6">Job Experience</Typography>

          {/* option input filed with No experience, 0-1 years,1-2 years, 2-5 years, 5-7 years, 7-10 years, 10+ years as options */}
          <Select
            required
            className={classes.selectField}
            variant="filled"
            id="experience"
            name="experience"
            onChange={(e) => setJobExperience(e.target.value)}
            value={jobExperience}
          >
            <MenuItem value="No experience">No experience</MenuItem>
            <MenuItem value="0-1 years">0-1 years</MenuItem>
            <MenuItem value="1-2 years">1-2 years</MenuItem>
            <MenuItem value="2-5 years">2-5 years</MenuItem>
            <MenuItem value="5-7 years">5-7 years</MenuItem>
            <MenuItem value="7-10 years">7-10 years</MenuItem>
            <MenuItem value="10+ years">10+ years</MenuItem>
          </Select>

          <Typography variant="h6">Job Salary</Typography>
          <TextField
            required
            placeholder="Job Salary"
            fullWidth
            variant="filled"
            id="salary"
            name="salary"
            onChange={(e) => setJobSalary(e.target.value)}
            value={jobSalary}
          />
          <Typography variant="h6">Job Skills</Typography>
          <Grid container spacing={2}>
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
                onClick={(e) => handleChipData(e)}
              >
                Add
              </Button>
            </Grid>
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
          </Grid>
          <Typography variant="h6">Job Location</Typography>
          <TextField
            required
            placeholder="Job Location"
            fullWidth
            variant="filled"
            id="location"
            name="location"
            onChange={(e) => setJobLocation(e.target.value)}
            value={jobLocation}
          />
          <Typography variant="h6">Job Apply Note</Typography>
          <TextField
            required
            placeholder="Job Apply Note"
            fullWidth
            variant="filled"
            id="apply_note"
            name="apply_note"
            onChange={(e) => setJobApplyNote(e.target.value)}
            value={jobApplyNote}
          />
          <Typography variant="h6">Job Edu Level</Typography>
          {/* option input field with Bachelors,Masters,Higher Secondary, Secondary, Primary as options */}
          <Select
            required
            className={classes.selectField}
            value={jobEduLevel}
            onChange={(e) => setJobEduLevel(e.target.value)}
          >
            <MenuItem value="Masters">Masters</MenuItem>
            <MenuItem value="Bachelors">Bachelors</MenuItem>
            <MenuItem value="Higher Secondary">Higher Secondary</MenuItem>
            <MenuItem value="Secondary">Secondary</MenuItem>
            <MenuItem value="Primary">Primary</MenuItem>
          </Select>
          <Typography variant="h6">Job Level</Typography>
          {/* option input field with Junior, Mid, Senior as options */}
          <Select
            required
            className={classes.selectField}
            value={jobLevel}
            onChange={(e) => setJobLevel(e.target.value)}
          >
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="Intern">Intern</MenuItem>
            <MenuItem value="Mid">Mid</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
          </Select>
          <Typography variant="h6">Job Category</Typography>
          <TextField
            required
            placeholder="Job Categorey"
            fullWidth
            variant="filled"
            id="category"
            name="category"
            onChange={(e) => setJobCategory(e.target.value)}
            value={jobCategory}
          />
          <Typography variant="h6">Job Deadline</Typography>
          <TextField
            required
            placeholder="Job Deadline"
            fullWidth
            type="date"
            variant="filled"
            id="deadline"
            name="deadline"
            onChange={(e) => setJobDeadline(e.target.value)}
            value={jobDeadline}
          />
          <Typography variant="h6">Job Type</Typography>
          {/* option input field with Full Time, Part Time, Contract as options */}
          <Select
            required
            className={classes.selectField}
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </Select>
          <Divider />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            onClick={(e) => addJob(e)}
          >
            Submit
          </Button>
        </form>
      </Container>
      <Snack
        handleClose={handleClose}
        open={open}
        message={snackMessage}
        sever={sever}
      />
    </div>
  );
}

export default AddJob;
