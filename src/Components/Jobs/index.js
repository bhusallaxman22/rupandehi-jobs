import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"

import { Link } from 'react-router-dom';
import { jobs } from '../JobCard/jobs';
const useStyles = makeStyles((theme) => ({
    root: {
        display:"grid",

        marginTop: "80px",
        padding: "0px 20px",
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    text: {
        textAlign: "center",
        justifyContent: "center"
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    jobPaper: {
        margin: "10px 10px 10px 10px"
    },
    linker: {
        color: "inherit",
        textDecoration: "none"

    },
    salary: {
        color: "#4ee44e"
    }
}));

export default function Jobs() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography variant="h4" className={classes.text}>
                Job listings.
            </Typography>
            <Grid container>
                {
                    jobs.map(job => {
                        const name = job.name.replace(" ", "-").toLowerCase()
                        return (
                            <Grid item key={job.name} className={classes.jobPaper}>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <ButtonBase className={classes.image}>
                                                <img className={classes.img} alt="complex" src={job.image} />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography color="primary" gutterBottom variant="subtitle1">
                                                        {job.name}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {job.jobType}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Level: {job.jobLevel}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Link className={classes.linker} to={`/jobs/${name}`}>
                                                        <Button size="small" color="secondary" variant="outlined" >
                                                            View Job
                                                        </Button>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" style={{ marginLeft: "5px" }} color="textSecondary">
                                                    Salary:
                                                </Typography>
                                                <Typography variant="subtitle1" className={classes.salary}>{job.salary}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>

        </Box>
    );
}
