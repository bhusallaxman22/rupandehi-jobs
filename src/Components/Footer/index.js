import React from "react";
import { Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import LinkM from "@material-ui/core/Link";

import { Facebook, Instagram, LinkedIn } from "@material-ui/icons";
const useStyle = makeStyles({
  root:{
    gridRowStart: 2,
    gridRowEnd: 3
  },
  list:{
    listStyle:"none",
    display:"inline"
  }
})
const Footer = () => {
const classes = useStyle()
  return (
    <Paper id="footer" style={{ marginTop: "30px" }}>
      <Container className="tata">
        <Grid container>
          <Grid item lg={4}>
            <Typography variant="h6" component="strong" color="textSecondary" className="">Our Address:</Typography>
            <p className="text-muted f-14">
              Butwal, {"\n"} Milanchwok,Rupandehi {"\n"} Nepal
            </p>
            <Typography variant="subtitle1" component="div" color="textSecondary" className="">Email: <LinkM href="mailto:applyjob@gmail.com"> applyjob@gmail.com</LinkM></Typography>
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
            <p>© Rupandehi Job 2021</p>
          </Grid>
        </Grid>
      </Container>
    </Paper>

  );
};

export default Footer;
