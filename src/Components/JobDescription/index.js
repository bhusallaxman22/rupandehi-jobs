import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box, Divider, Container, Button,Paper, TableContainer,Table,TableCell,TableRow, Link } from '@material-ui/core';
import { Helmet } from 'react-helmet';
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    placeItems: "center",
    margin: "85px 20px 20px 20px",
  },
  card: {
    margin:"20px"
  },
  media: {
    height: 140,
  },

});

export default function JobDescription() {
  const classes = useStyles();

  return (
    <Box justifyContent="center" className={classes.root}>
      <Helmet>
        <title>{"Teacher"}</title>
        <meta name="description" content="Job opening for 2 teacher. See more at Rupandehi Jobs" />
      </Helmet>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/assets/images/rupandehijob.jpg"
            title="rupandehi job"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              A Reputed Company
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box>
      <Card className={classes.card}>
        <CardContent className="card-group">
          <Container className="card border-0">
            <CardContent className="card-header p-2"><Typography variant="h5" component="strong" >Basic Job Information</Typography></CardContent>
            <CardContent className="card-body p-0 Table-responsive">
              <TableContainer component={Paper}>
              <Table className="Table Table-hover Table-no-border m-0">
                <tbody><TableRow>
                  <TableCell width="33%">Job Category</TableCell>
                  <TableCell width="3%">:</TableCell>
                  <TableCell width="64%">
                    <Link href="/category/teaching-education/">Teaching / Education</Link>
                  </TableCell>
                </TableRow>
                  <TableRow>
                    <TableCell>Job Level</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell><Link href="/job-level/mid_level/">
                      Mid Level
                    </Link></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No. of Vacancy/s</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>[ <strong>1</strong> ]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employment Type</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell itemProp="employmentType">
                      Full Time
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Job Location</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>
                      <span className="clearfix">Kathmandu</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Offered Salary</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>
                      Negotiable
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Apply Before<span className="mx-2">(Deadline)</span></TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>Jul. 05, 2021 23:55
                      (1&nbsp;week, 3&nbsp;days from now)
                    </TableCell>
                  </TableRow>
                </tbody></Table>
                </TableContainer>
            </CardContent>
          </Container>
        </CardContent>
        <Divider className="mt-0 mb-4" />


        <CardContent className="card-group">
          <Container className="card border-0">
            <CardContent className="card-header p-2"> <Typography variant="h5" component="strong">Job Specification</Typography> </CardContent>
            <CardContent className="card-body p-0 Table-responsive">
              <Table className="Table Table-hover Table-no-border m-0">
                <tbody><TableRow>
                  <TableCell width="33%">Education Level</TableCell>
                  <TableCell width="3%">:</TableCell>
                  <TableCell width="64%">
                    <span itemProp="educationRequirements">Bachelor</span>
                  </TableCell>
                </TableRow>
                  <TableRow>
                    <TableCell width="33%">Experience Required</TableCell>
                    <TableCell width="3%">:</TableCell>
                    <TableCell width="64%">
                      <span itemProp="experienceRequirements">More than or equals to 2 years</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="33%">Professional Skill Required</TableCell>
                    <TableCell width="3%">:</TableCell>
                    <TableCell width="64%">
                      <span itemProp="skills">
                        <span className="badge badge-secondary">Interpersonal</span>
                        <span className="badge badge-secondary">Leadership</span>
                        <span className="badge badge-secondary">Communication</span>
                        <span className="badge badge-secondary">Problem Solving</span>
                        <span className="badge badge-secondary">Presentation</span>
                      </span>
                    </TableCell>
                  </TableRow>
                </tbody></Table>
              <CardContent className="card-group">
                <Container className="card border-0">
                  <CardContent className="card-body p-2"><Typography variant="h6" component={"strong"} className="mb-1">Other Specification
                  </Typography></CardContent>
                  <CardContent className="card-text p-2">
                    <Container>
                    <Typography><strong>Requirements</strong></Typography>
                    <ul style={{listStyle:"inside"}}>
                      <li>Bachelor's Degree in related field</li>
                      <li>2 years of experience.</li>
                      <li>Thorough knowledge of teaching best practices</li>
                      <li>Willingness to follow the school’s policies and procedures</li>
                      <li>Excellent spoken and written command in English</li>
                      <li>Excellent communicability and interpersonal skills</li>
                      <li>Well-organized and committed</li>
                      <li>Creative and energetic</li>
                    </ul>
                    <span><strong>Salary</strong>: NO BAR for deserving candidate</span><br /><p></p>
                    </Container>
                  </CardContent>

                </Container>
              </CardContent>
            </CardContent>
          </Container>
        </CardContent>
        <Divider className="mt-0 mb-4" />


        <CardContent className="card-group">
          <Container className="card border-0">
            <CardContent className="card-body p-2"><Typography variant="h6" component="p"> Job Description</Typography>
              <Container className="card-text p-2" itemProp="description">
                <ul style={{listStyle:"inside"}}> 
                  <li><Typography variant="body1" component="span">Create conducive learning environment in the classroom with proper classroom management</Typography></li>
                  <li><Typography component="span">Prepare and deliver lessons to classes of different ages and abilities</Typography></li>
                  <li><Typography component="span"> Help students develop social skills for their meaningful existence in the society</Typography></li>
                  <li><Typography component="span">Help students be familiar with national and international TableRowends/affairs according to their level</Typography></li>
                  <li><Typography component="span">Motivate students for learning new things and shaping positive behaviour</Typography></li>
                </ul>
                <p><Typography component="strong">Applying Procedure:</Typography></p>
                <p>Interested Candidates must send detailed CV with Cover letter to<strong>&nbsp;<Link href="mailto:info@maTableRowibhumischool.edu.np">info@maTableRowibhumischool.edu.np</Link></strong></p>
                <p><strong>OR,</strong></p>
              </Container>
            </CardContent>
          </Container>
          <Divider className="mt-0 mb-4" />


          <Container className="mt-3">
            <Button variant="contained" size="small" color="secondary">
              <span className="icon-circle-add mr-2"></span>APPLY NOW
            </Button>
          </Container>
        </CardContent>
      </Card>
      </Box>
    </Box>
  );
}
