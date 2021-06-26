import { AppBar, Container, makeStyles, Toolbar, Typography, Grid } from "@material-ui/core"
import { Link } from "react-router-dom"
import { Facebook, LinkedIn, Mail, Twitter } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    //   padding: theme.spacing(5),
    marginTop: theme.spacing(2)

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  copy: {
    textAlign: "center"
  },
  ah: {
    color: "inherit",
    "&:hover": {
      color: "blue"
    }
  },
  linker:{
    textDecoration:"none"
  }

}));
export default function Footer() {
  const classes = useStyles()
  return (
    <AppBar className={classes.root} position="static" color="default">
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6} sm={4}>
          
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
            <Typography variant="h6">Connect:</Typography>

              <Typography variant="body1" color="inherit">
                Butwal,Milanchwok <br />{" Rupandehi, Nepal"}
              </Typography>
              <Typography variant="subtitle1" color="inherit" component="strong">
                Contact no.: 980000000
              </Typography>
            </Grid>
            <br />
            <Grid item>
              <Grid container>
                <Grid item >
                  <a href="https://facebook.com" className={classes.ah}>
                    <Facebook />
                  </a>
                </Grid>
                <Grid item>
                  <a href="https://twitter.com" className={classes.ah}>
                    <Twitter />
                  </a>
                </Grid>
                <Grid item>
                  <a href="https://linkedin.com" className={classes.ah}>
                    <LinkedIn />
                  </a>
                </Grid>                <Grid item>
                  <a href="mailto:applyjob@gmail.com" className={classes.ah}>
                    <Mail />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Typography variant="h6" color="inherit">
            Quick Links:
          </Typography>
          <ul style={{listStyle:"none"}}>
            <li item><Link className={classes.linker} to={"/about-us"}>About Us</Link></li>
            <li item><Link  className={classes.linker} to={"/faq"}>FAQs</Link></li>
            <li item> <Link className={classes.linker} to={"/signup"}>Register!</Link></li>
          </ul>


          <Grid container >
            <Grid item></Grid>
          </Grid>
        </Grid>        <Grid item xs={6} sm={4}>
          <Typography variant="body1" color="inherit">
            © 2021 Rupandehi Jobs
          </Typography>
        </Grid>
      </Grid>
      <Container maxWidth={"md"} className={classes.copy}>
        <Toolbar>
          <Typography variant="body1" color="inherit">
            © 2021 Rupandehi Jobs
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}