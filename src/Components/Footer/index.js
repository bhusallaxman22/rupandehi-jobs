import { AppBar, Container, makeStyles, Toolbar, Typography, Grid, Link } from "@material-ui/core"
import { Facebook, LinkedIn, Twitter } from "@material-ui/icons";
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
  copy:{
    textAlign:"center"
  }

}));
export default function Footer() {
  const classes = useStyles()
  return (
    <AppBar className={classes.root} position="static" color="default">
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6} sm={4}>
          <Grid container  direction="column" justify="center" alignItems="center">
            <Grid item>
              <Typography variant="body1" color="inherit">
                Butwal,Milanchwok <br />{" Rupandehi Nepal"}
              </Typography>
            </Grid>
            <br />
            <Grid item>
              <Grid container>
                <Grid item >
                  <Link href="https://facebook.com" variant="body1" color="inherit">
                    <Facebook />
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="https://twitter.com" variant="body1" color="inherit">
                    <Twitter />
                  </Link>
                </Grid>            <Grid item>
                  <Link href="https://linkedin.com" variant="body1" color="inherit">
                    <LinkedIn />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Typography variant="body1" color="inherit">
            © 2021 Rupandehi Jobs
          </Typography>
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