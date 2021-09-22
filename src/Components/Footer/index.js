import React from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import LinkM from "@material-ui/core/Link";
import { Link } from "react-router-dom";

import { Facebook, Instagram, LinkedIn } from "@material-ui/icons";
const useStyle = makeStyles({
  root: {
    gridRowStart: 2,
    gridRowEnd: 3,
  },
  list: {
    listStyle: "none",
    display: "inline",
  },
  listed: {
    listStyle: "none",
  },
  linker: {
    textDecoration: "none",
  },
});
const Footer = () => {
  const classes = useStyle();
  return (
    <Paper id="footer" style={{ marginTop: "30px" }}>
      <Container className="tata">
        <Grid container>
          <Grid item lg={4}>
            <Typography variant="h6" component="strong" color="textSecondary">
              Our Address:
            </Typography>
            <p className="text-muted f-14">
              Butwal, {"\n"} Milanchwok,Rupandehi {"\n"} Nepal
            </p>
            <Typography
              variant="subtitle1"
              component="div"
              color="textSecondary"
            >
              Email:{" "}
              <LinkM href="mailto:applyjob@gmail.com">
                {" "}
                applyjob@gmail.com
              </LinkM>
            </Typography>
            <ul className={classes.list}>
              <li className={classes.list}>
                <LinkM href="https://www.facebook.com/Rupandehijobpvtltd">
                  <Facebook />
                </LinkM>
              </li>
              <li className={classes.list}>
                <LinkM href="https://instagram.com">
                  <Instagram />
                </LinkM>
              </li>
              <li className={classes.list}>
                <LinkM href="https://linkedin.com">
                  <LinkedIn />
                </LinkM>
              </li>
            </ul>
          </Grid>
          <Grid item md={5}>
            <Typography variant="h6" component="strong" color="textSecondary">
              Quick Links
            </Typography>
            <ul className={classes.listed} color="textSecondary">
              <li className={classes.listed}>
                <Link className={classes.linker} to="/">
                <Typography
              variant="subtitle1"
              component="div"
              color="textSecondary"
            > Home
              </Typography>
                </Link>
              </li>
              <li className={classes.listed}>
                <Link className={classes.linker} to="/about-us">
                <Typography
              variant="subtitle1"
              component="div"
              color="textSecondary"
            >About Us </Typography>
                </Link>
              </li>
              <li className={classes.listed}>
                <Link className={classes.linker} to="/contact">
                <Typography
              variant="subtitle1"
              component="div"
              color="textSecondary"
            >  Contact Us </Typography>
                </Link>
              </li>
              <li className={classes.listed}>
                <Link className={classes.linker} to="/jobs">
                <Typography
              variant="subtitle1"
              component="div"
              color="textSecondary"
            > Jobs List </Typography>
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item md={3}>
            <ul className={classes.listed} color="textSecondary"><br />
              <li className={classes.listed}>
                <Link className={classes.linker} to="/login">
                <Typography
              variant="subtitle1"
              component="div"
              color="textSecondary"
            >  Login </Typography>
                </Link>
              </li>
              <li className={classes.listed}>
                <Link className={classes.linker} to="/signup">
                <Typography
              variant="subtitle1"
              component="div"
              color="textSecondary"
            >  Register </Typography>
                </Link>
              </li>
              <li className={classes.listed}>
                <Link className={classes.linker} to="/training">
                <Typography
              variant="subtitle1"
              component="div"
              color="textSecondary"
            >  Trainings </Typography>
              </Link>
              </li>
              <br />
              <li className={classes.listed}>
              <Typography
              variant="subtitle1"
              component="div"
              color="textSecondary"
            >
                  © Rupandehi Job 2021
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Footer;
