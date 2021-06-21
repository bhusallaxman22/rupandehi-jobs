import { Grid, Button, AppBar, Toolbar, MenuItem, Menu, Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import { Link } from "react-router-dom"
const styles = makeStyles({

    row: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    container: {
        width: 1170,
        margin: "auto"
    },
    buttonFontSize: {
        fontSize: "11px",
        color: "#a1a1a1"
    },

    AppBar: {
        //height:400,
        //background: `url("http://lorempixel.com/1920/1080/nature") no-repeat center center`,
        backgroundColor: "#fff",
        backgroundSize: "cover"
    },
    mainLogo: {
        color: "#a1a1a1",
        justifyContent: "left",
        '&:hover': {
            background: "transparent"
        }
    },

    avatar: {
        height: "100%",
        borderRadius: 0,
    },
linker:{
    color:"inherit",
    textDecoration:"none"
    
},
    loginButton: {
        background: "#e91e63",
        color: "#fff",
        borderRadius: "25px",
        padding: "0px 25px",

        '&:hover': {
            background: 'blue',
            boxShadow: "0px 2px 10px #888888"
        }
    }

});

// withStyles(styles)

export default function Nav(props) {

    const [anchorEl, setAnchor] = useState(null);

    const handleMenu = event => {
        setAnchor(event.currentTarget);
        console.log(event.currentTarget)
    };

    const handleClose = () => {
        setAnchor(null);
    };


    const classes = styles();
    // const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.AppBar}>
                <Grid item sm={12} xs={12} className={classes.container}>
                    <Toolbar>
                        <Grid className={classes.grow}>
                           <Link className={classes.linker} to={"/"}> <Button className={[classes.mainLogo]}>
                                <Avatar src="https://uploads.codesandbox.io/uploads/user/3e41a372-fc65-4387-bca0-70a050914db8/VIR9-logo.jpg" className={classes.avatar} />
                            </Button></Link>
                        </Grid>
                        <Button color="inherit" onClick={handleMenu} className={classes.buttonFontSize}>Discover</Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                        <Button color="inherit" className={classes.buttonFontSize}>Training</Button>
                        <Link to={"/login"} className={classes.linker} ><Button color="inherit" className={[classes.buttonFontSize, classes.loginButton]}>Login</Button> </Link >
                    </Toolbar>
                </Grid>
            </AppBar>
        </div>
    )

}