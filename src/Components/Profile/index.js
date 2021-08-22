import { Paper, Box, makeStyles, Typography, Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import Snack from "../common/snack";
import Moment from "react-moment";
import "./style.css";
import axios from "axios";
const useStyle = makeStyles({
  root: {
    marginTop: "80px",
    minHeight: "75vh",
  },
  image: {
    width: "100px",
    height: "100px",
  },
});
export default function Profile() {
  const classes = useStyle();
  const [dp, setDp] = useState("");
  const [edu, setEdu] = useState([]);
  const [socials, setSocial] = useState([]);
  const [traning, setTraning] = useState([]);
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [sever, setSever] = useState("");
  useEffect(() => {
    if (localStorage.getItem("type") !== "A") window.location.href = "/#404";
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    axios.get("/api/user/skills", config).then((res) => {
      setSkills(res.data);
    });
    axios
      .get("/api/user/auth", config)
      .then(async (res) => {
        setUser(res.data);
        if (user.dp) {
          try {
            const result = await axios.get(
              "/api/dp/download/" + localStorage.getItem("id"),
              {
                responseType: "blob",
              }
            );
            setDp(URL.createObjectURL(result.data));
          } catch (error) {
            if (error.response && error.response.status === 400) {
              alert("Error while downloading DP file. Try again later");
            }
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          setOpen(true);
          setSnackMessage(error.response.data + " You'll Be logged out soon");
          setSever("error");
          setTimeout(() => {
            localStorage.clear();
            window.location.href = "/#login";
          }, 6000);
        }
      });

    // get data from /api/user/edu and update the state
    axios.get("/api/user/edu", config).then(async (res) => {
      setEdu(res.data);
    });
    axios.get("/api/user/traning", config).then(async (res) => {
      setTraning(res.data);
    });
  }, [user.dp]);

  console.log(user);
  console.log(edu);
  if (user.Bio === "You can edit to add Bio!" || "Bio") {
    // window.location.href="/#/get-info"
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box>
      <Paper main="true" className={classes.root}>
        <Typography variant={"h3"} component="strong">
          Profile
        </Typography>
        <div className="card-body">
          <div className="row pb-3">
            <div className="col-md-3 pt-md-0 pt-3">
              <Avatar
                src={dp}
                className={classes.image}
                alt={user.Name}
              ></Avatar>
            </div>
            <div className="col-md-9 pt-md-0 pt-2">
              <h5 className="mt-0">Mr. {user.Name}</h5>
              <div className="personal-info">
                <span>Address: {user.Address}</span>
                <br />
                <span>Phone: {user.Contact}</span>
                <br />
                <span>
                  Email: <a href={`${user.Email}`}>{user.Email}</a>
                </span>
                <br />
                <span>
                  Date of Birth:{" "}
                  <Moment format="MMM D, YYYY" withTitle>
                    {user.dob}
                  </Moment>{" "}
                </span>
                <br />
              </div>
            </div>
          </div>
          <div className="row user-detail">
            <div className="col-md-12 mt-3">
              <h5>
                <span className="icon-list mr-2"></span> Objective
              </h5>
              <div className="dropdown-divider"></div>
              <div className="container">
                <p className="word-wrap"></p>
                <p>{user.Bio}</p>
                <p></p>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <h5>
                <span className="icon-graduation mr-2"></span> Education
              </h5>
              {edu.map((edu, i) => (
                <div key={i}>
                  <div className="dropdown-divider"></div>
                  <div className="row pb-3">
                    <div className="col-md-3">
                      <span className="icon-calendar mr-2"></span>
                      {edu.end_year}
                    </div>
                    <div className="col-md-9">
                      <h6>
                        <span className="icon-circle-check mr-2"></span>
                        {`(${edu.level})`} -{edu.course}
                      </h6>
                      <div>
                        <span className="icon-building mr-2"></span>
                        {edu.institute}
                        <span>, CGPA: {edu.cgpa} </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {traning.length !== 0 ? (
              <div className="col-md-12 mt-3">
                <h5>
                  <span className="icon-training mr-2"></span>{" "}
                  Training/Certificates
                </h5>
                {traning.map((training, i) => (
                  <div key={i}>
                    <div className="dropdown-divider"></div>
                    <div className="row pb-3">
                      <div className="col-md-3">
                        <span className="icon-calendar mr-2"></span>
                        {`${training.completion_date}`}{" "}
                        {`(${training.duration})`}
                      </div>
                      <div className="col-md-9">
                        <h6>
                          <span className="icon-circle-check mr-2"></span>
                          {training.course}
                        </h6>
                        <div>
                          <span className="icon-building mr-2"></span>
                          {training.institute}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="col-md-12 mt-3">
              <h5>
                <span className="icon-id-card mr-2"></span>
                Job Preference
              </h5>
              <div className="dropdown-divider"></div>
              <div className="row">
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Looking for: Entry Level
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Job Categories: Creative / Graphics / Designing, IT &amp;
                  Telecommunication
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Available for: Full Time
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Expected Salary: (Above) NRs 15,000.00
                  <span className="badge badge-secondary">Monthly</span>
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Total Experience: 1 year
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Job Preference Location:
                  <span className="badge badge-pill badge-secondary">
                    Kathmandu
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <h5>
                <span className="icon-language mr-2"></span> Language
              </h5>
              <div className="dropdown-divider"></div>
              <div className="icon col-md-12"></div>
              <div className="row pb-3">
                <div className="col-md-3"></div>
                <div className="col-md-9">
                  <h6>English (Avg: 4.75)</h6>
                  <span className="icon-circle-check mr-1"></span>Reading
                  <span className="mr-2 bade badge-success ">5</span>
                  <span className="icon-circle-check mr-1"></span>Speaking
                  <span className="mr-2 badge badge-secondary ">4</span>
                  <span className="icon-circle-check mr-1"></span>Writing
                  <span className="mr-2 badge badge-success ">5</span>
                  <span className="icon-circle-check mr-1"></span>Listening
                  <span className="mr-2 badge badge-success ">5</span>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <h5>
                <span className="icon-idea mr-2"></span> Specializations and
                Skills
              </h5>
              <div className="dropdown-divider"></div>
              <div className="row pb-3">
                <div className="offset-md-3 col-md-9">
                  <h6>
                    <span className="icon-circle-check mr-2"></span>
                    Specializations
                  </h6>
                  <span className="badge badge-secondary mr-1">
                    Full Stack Web Developer
                  </span>
                  <span className="badge badge-secondary mr-1">
                    Reactjs And React-Native
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="offset-md-3 col-md-9">
                  <h6>
                    <span className="icon-circle-check mr-2"></span>Skills
                  </h6>
                  {skills.map((skill, i) => (
                    <span key={skill.id} className="badge badge-secondary mr-1">
                      {skill.Name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <h5>
                <span className="icon-id-card mr-2"></span>
                Personal Information
              </h5>
              <div className="dropdown-divider"></div>
              <div className="row">
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Gender: {user.gender}
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Current Address: {user.Address}
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Marital Status: {user.marital_status}
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Religion: {user.religion}
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Nationality: {user.nationality}
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <h5>
                <span className="icon-share mr-2"></span>
                Social Account
              </h5>
              <div className="dropdown-divider"></div>
              <div className="row">
                <div className="offset-md-3 col-md-9">
                  <a href="https://facebook.com/l.b057">
                    https://facebook.com/l.b057
                  </a>
                </div>
                <div className="offset-md-3 col-md-9">
                  <a href="https://twitter.com/laxmanbhusal22">
                    https://twitter.com/laxmanbhusal22
                  </a>
                </div>
                <div className="offset-md-3 col-md-9">
                  <a href="https://github.com/bhusallaxman22">
                    https://github.com/bhusallaxman22
                  </a>
                </div>
                <div className="offset-md-3 col-md-9">
                  <a href="https://bhusallaxman22.github.io/">
                    https://bhusallaxman22.github.io/
                  </a>
                </div>
                <div className="offset-md-3 col-md-9">
                  <a href="https://instagram.com/lakshman.22">
                    https://instagram.com/lakshman.22
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <h5>
                <span className="icon-id-card mr-2"></span>
                Other Information
              </h5>
              <div className="dropdown-divider"></div>
              <div className="row">
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Willing to travel outside of residing location during the job:
                  No
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Willing to temporarily relocate outside of residing location
                  during the job period: No
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Two Wheeler License: Yes
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Four Wheeler License: No
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Own Two Wheeler: No
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Own Four Wheeler: No
                </div>
              </div>
            </div>
          </div>
        </div>
        <Snack
          handleClose={handleClose}
          open={open}
          message={snackMessage}
          sever={sever}
        />
      </Paper>
    </Box>
  );
}
