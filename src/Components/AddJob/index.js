import React, { useState } from "react";
import { Editor } from "nib-core";
import {
  Container,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";

import defaultValue from "./sampleData"

const customTheme = {
  color: {
    highlight: { secondary: "#424242" },
    text: { primary: "#e0e0e0", secondary: "#bdbdbd" },
    background: {
      primary: "#212121",
      secondary: "#424242",
    },
    border: {
      primary: "#636363",
    },
    blurMarker: "#616161",
  },
  border: {
    primary: "1px solid #636363",
  },
  boxShadow: {
    secondary: "#424242 0px 1px 0px",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    marginTop: "80px",
  },
  headerTitle: {
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  quill: {
    marginTop: "20px",
    marginBottom: "20px",
    height: "300px",
  },
}));

 function AddJob() {
  const [requirements, setRequirements] = useState();
  const [job, setValue] = useState([
    {
      title: "",
      applicants_no: "",
      description: "",
      experience: "",
      salary: "",
      level: "",
      category: "",
      deadline: "",
      edu_level: "",
      skills: "",
      apply_note: "",
      location: "",
    },
  ]);
  const handleInputChange = (e, i) => {
    const list = [...job];
    list[i] = e;
    console.log(e);
    setValue(list);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.headerTitle} variant="h4">
        Add Job
      </Typography>
      {/* {job.map((job, i) => (
        <Container key={i}>
          <Typography variant="h6">Job Title</Typography>
          <TextField
            placeholder="Job Title"
            fullWidth
            variant="filled"
            id="title"
            name="title"
            onChange={(e) => handleInputChange(e.target.value, i)}
            value={job.title}
          />
          <Typography variant="h6">Job Description</Typography>
          <Editor
            config={{
              toolbar: {
                options: "top",
              },
            }}
            theme={customTheme}
            onChange={setRequirements}
            defaultValue={defaultValue}
          />
          
        </Container>
      ))} */}
    </div>
  );
}

export default AddJob;