import { Grid, Button, AppBar, Toolbar, MenuItem, Menu, Avatar,useMediaQuery } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

import { useState } from "react";
import { Link } from "react-router-dom"
const styles = makeStyles({
    root: {
    },
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
        width: "90px",
        borderRadius: 0,
    },
    linker: {
        color: "inherit",
        textDecoration: "none"

    },
    loginButton: {
        background: "#e91e63",
        color: "#fff",
        // borderRadius: "25px",
        padding: "0px 25px 0px",

        '&:hover': {
            background: 'blue',
            boxShadow: "0px 2px 10px #888888"
        }
    }

});


export default function Nav() {
    // const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const [anchorEl, setAnchor] = useState(null);

    const handleMenu = event => {
        setAnchor(event.currentTarget);
        console.log(event.currentTarget)
    };

    const handleClose = () => {
        setAnchor(null);
    };


    const classes = styles();
    const open = Boolean(anchorEl);

    return (
        <div className={classes.root}>
            <AppBar position="absolute" color="default" className={classes.AppBar}>
                <Grid item sm={12} xs={12} className={classes.container}>
                    <Toolbar>
                        <Grid className={classes.grow}>
                            <Link className={classes.linker} to={"/"}> <Button className={[classes.mainLogo]}>
                                <Avatar src="/assets/images/rupandehi.jpg" className={classes.avatar} />
                            </Button></Link>
                        </Grid>
                        <Menu color="inherit" className={classes.buttonFontSize}>Training</Menu>
                        <Menu color="inherit" onClick={handleMenu} className={classes.buttonFontSize}>Discover</Menu>
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
                            <MenuItem onClick={handleClose}>About Us</MenuItem>
                            <MenuItem onClick={handleClose}>FAQs</MenuItem>
                        </Menu>
                        <Link to={"/login"} className={classes.linker} ><Button color="inherit" size="medium" className={[classes.buttonFontSize, classes.loginButton]}>Login</Button> </Link >
                        <Link to={"/signup"} className={classes.linker} > <Button color="inherit" variant="outlined" className={classes.buttonFontSize}>Register</Button></Link>

                    </Toolbar>
                </Grid>
            </AppBar>
        </div>
    )

}