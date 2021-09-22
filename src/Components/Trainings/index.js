// Component to display the trainings with course name, duration and price using material-ui
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  Typography,
  Grid,
  Button,
  CardActions,
  CardActionArea,
  CardHeader,
  Box,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { trainings } from "./training";
const styles = {
  card: {
    maxWidth: 345,
    margin: "10px",
  },
  media: {
    height: 140,
  },
};

function Trainings(props) {
  const { classes } = props;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Trainings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            We provide professional trainings for all your business needs.
            Either you are a new business owner or you are looking to improve
            your business.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Choose your training
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={24}>
        {trainings.map((training) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardHeader
                  title={training.title}
                  subheader={training.duration}
                />
                <CardMedia
                  className={classes.media}
                  image={training.image}
                  title={training.title}
                />
              </CardActionArea>
              <Divider />
              <Typography variant="body1" gutterBottom style={{color:"green"}}>
                {training.price}
                </Typography>
<Typography variant="body1" gutterBottom>
        {training.description.substring(0,100)}...
        </Typography>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`/trainings/${training.title}`}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default withStyles(styles)(Trainings);
