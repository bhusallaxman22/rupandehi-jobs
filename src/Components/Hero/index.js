import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SearchBar from "./SearchBar"
import SideCard from "./SideCard"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "300px",
        background:`url("/assets/images/office2.jpg")`,
        margin: "20px 20px 20px 20px",
        backgroundRepeat:"no-repeat",
        backgroundBlendMode:"screen",
        backgroundSize:"cover"
    },
    text: {
        textAlign: "center",
        fontWeight:"bolder",
        color:"light-blue"
    },

}));

export default function Hero() {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <Container>
                <Grid container justify="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <Grid item xs={12} >
                            <Typography className={classes.text}>
                                We make your dream come true.</Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <SearchBar />
                        </Grid></Grid>
                    <Divider orientation="vertical" />
                    <Grid item xs={6} sm={2}>
                        <SideCard />
                    </Grid>
                </Grid>
            </Container>
        </div>

    );
}
