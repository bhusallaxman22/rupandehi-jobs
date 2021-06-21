import {AppBar, Container, makeStyles, Toolbar, Typography} from "@material-ui/core"
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display:"flex",
      alignItems:"center",
    //   padding: theme.spacing(5),
      marginTop:theme.spacing(4)

    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  
  }));
export default function Footer() {
const classes = useStyles()
    return (
        <AppBar className={classes.root} position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                © 2021 Rupandehi Jobs
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}