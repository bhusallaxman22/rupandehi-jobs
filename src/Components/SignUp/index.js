import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import validator from "validator";
import axios from "axios";
import Snack from "../common/snack";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
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
    margin: theme.spacing(3, 0, 2),
  },
  linker: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [password, setPassword] = useState("");
  const [lname, setLname] = useState("");
  const [Contact, setContact] = useState("");
  const [password_r, setPasswordR] = useState("");

  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [sever, setSever] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function onSubmit(e) {
    e.preventDefault();
    if (validator.isEmpty(Contact)) {
      setOpen(true);
      setSnackMessage("Contact Cannot be empty");
      setSever("warning");
      return;
    }
    if (!validator.isInt(Contact)) {
      setOpen(true);
      setSnackMessage("Contact should be Integer!");
      setSever("warning");
    }
    if (Contact.trim().length !== 10) {
      setOpen(true);
      setSnackMessage("Contact should be an Nepali Number of 10 Digits!");
      setSever("warning");
      return;
    }

    const newUser = {
      Name: fname + " " + lname,
      Email: email,
      type: "A",
      password: password,
      password_r: password_r,
      Contact: parseInt(Contact.trim()),
    };

    axios
      .post("api/user/register", newUser)
      .then((res) => {
        setOpen(true);
        setSnackMessage("Successfully Registered");
        setSever("success");
        setTimeout(() => {
          window.location.href = "/#login";
        }, 3000);
      })
      .catch((err) => {
        if (err.response.data) {
          setOpen(true);
          setSnackMessage(err.response.data);
          setSever("error");
        }
      });
  }

  return (
    <>
      <Helmet>
        <title>Sign Up - Rupandehi Job</title>
        <meta name="description" content="Sign Up for rupandehi job" />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={onSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
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
                  fullWidth
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={Contact}
                  onChange={(e) => setContact(e.target.value)}
                  type="text"
                  id="contact"
                  label="Contact No."
                  name="email"
                  autoComplete="contact"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={password_r}
                  onChange={(e) => setPasswordR(e.target.value)}
                  name="password_r"
                  label="Confirm Password"
                  type="password"
                  id="password+r"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" className={classes.linker}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
          <Snack
            handleClose={handleClose}
            open={open}
            message={snackMessage}
            sever={sever}
          />
        </div>
        <Box mt={5}></Box>
      </Container>
    </>
  );
}
