// an about us page with map and contact info and a list of the team members and their roles using material-ui
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Rupandehi Job Pvt.Ltd is the only job site of its kind, matching Job
            Seekers with quality all level job positions. The company's mission
            is to simplify the job search by creating the industry's most
            intuitive user experience, making it easy for professionals to stand
            out in the application process — and for employers to source the
            best talent.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7491.396599256831!2d83.46071697778736!3d27.688969075624893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399687be99c20783%3A0x6e5d60d90fef5a85!2sRupandehi%20Job%20Pvt.Ltd!5e0!3m2!1sen!2snp!4v1632309863451!5m2!1sen!2snp"
            width="400"
            height="300"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </Grid>
        {/* List our services */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Our Services
          </Typography>
          <Typography variant="h6" gutterBottom>
            We provide the following services:
          </Typography>
          <Typography variant="h6" gutterBottom>
            1. Job Search
          </Typography>
          <Typography variant="h6" gutterBottom>
            2. Job Posting
          </Typography>
          <Typography variant="h6" gutterBottom>
            3. Job Application
          </Typography>
          <Typography variant="h6" gutterBottom>
            4. Job Interview
          </Typography>
          <Typography variant="h6" gutterBottom>
            5. Trainings
          </Typography>
        </Grid>
        {/* show contact information */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              component={Link}
              to="/contact"
            >
              Contact Us
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
