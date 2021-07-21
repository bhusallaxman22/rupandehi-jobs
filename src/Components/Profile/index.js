import { Paper, Box, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
const useStyle = makeStyles({
  root: {
    marginTop: "80px",
    minHeight: "75vh",
  },
});
export default function Profile() {
  const classes = useStyle();
  // const [email, setEmail] = useState("");
  // const [name, setname] = useState("");
  // const [password, setPassword] = useState("");
  // const [Contact, setContact] = useState("");
  const [dp, setDp] = useState("");
  const [edu, setEdu] = useState([]);
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("type") !== "A") window.location.href = "/#404";
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    axios.get("/api/user/edu", config).then((res) => {
      setEdu(res.data);
    });
    axios.get("/api/user/skills", config).then((res) => {
      setSkills(res.data);
    });
    axios.get("/api/user/auth", config).then(async (res) => {
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
    });

}, [user.dp]);
  console.log(user);
  if(user.Bio ==="You can edit to add Bio!"||"Bio"){
    window.location.href="/#/get-info"
  }

  return (
    <Box>
      <Paper main="true" className={classes.root}>
        <Typography variant={"h3"} component="strong">
          Profile
        </Typography>
        <div className="card-body">
          <div className="row pb-3">
            <div className="col-md-3 pt-md-0 pt-3">
              <img
                className="rounded-circle d-flex mr-3"
                style={{ height: "100px", width: "100px" }}
                src="https://www.kumarijob.com/new-assets/images/avatar_man.png"
                alt="Profile"
              />
            </div>
            <div className="col-md-9 pt-md-0 pt-2">
              <h5 className="mt-0">Mr. {user.Name}</h5>
              <div className="personal-info">
                <span>Address: Kaushaltar</span>
                <br />
                <span>Phone: {user.Contact}</span>
                <br />
                <span>
                  Email: <a href={`${user.Email}`}>{user.Email}</a>
                </span>
                <br />
                <span>Date of Birth: May 4, 2000</span>
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
              <div className="dropdown-divider"></div>
              <div className="row pb-3">
                <div className="col-md-3">
                  <span className="icon-calendar mr-2"></span>
                  Running
                </div>
                <div className="col-md-9">
                  <h6>
                    <span className="icon-circle-check mr-2"></span>(Bachelor) -
                    Bsc. Csit
                  </h6>
                  <div>
                    <span className="icon-building mr-2"></span>
                    Bhaktapur Multiple Campus
                    <span>, Tribhuvan University </span>
                  </div>
                </div>
              </div>
              <div className="row pb-3">
                <div className="col-md-3">
                  <span className="icon-calendar mr-2"></span>
                  August, 2018
                </div>
                <div className="col-md-9">
                  <h6>
                    <span className="icon-circle-check mr-2"></span>
                    (Intermediate) - Science CGPA 3.13
                  </h6>
                  <div>
                    <span className="icon-building mr-2"></span>
                    Prasadi Academy<span>, National Examination Board </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <h5>
                <span className="icon-training mr-2"></span>{" "}
                Training/Certificates
              </h5>
              <div className="dropdown-divider"></div>
              <div className="row pb-3">
                <div className="col-md-3">
                  <span className="icon-calendar mr-2"></span>
                  May, 2019 (3 Months )
                </div>
                <div className="col-md-9">
                  <h6>
                    <span className="icon-circle-check mr-2"></span>Full Stack
                    Web Developer
                  </h6>
                  <div>
                    <span className="icon-building mr-2"></span>
                    Udemy
                  </div>
                </div>
              </div>
            </div>
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
                  <span
                    title="Technical"
                    className="badge badge-secondary mr-1"
                  >
                    Technical
                  </span>
                  <span
                    title="Verbal Communication"
                    className="badge badge-secondary mr-1"
                  >
                    Verbal Communication
                  </span>
                  <span
                    title="Critical Thinking"
                    className="badge badge-secondary mr-1"
                  >
                    Critical Thinking
                  </span>
                  <span
                    title="Javascript"
                    className="badge badge-secondary mr-1"
                  >
                    Javascript
                  </span>
                  <span
                    title="Problem Solving"
                    className="badge badge-secondary mr-1"
                  >
                    Problem Solving
                  </span>
                  <span title="React" className="badge badge-secondary mr-1">
                    React
                  </span>
                  <span
                    title="React Native"
                    className="badge badge-secondary mr-1"
                  >
                    React Native
                  </span>
                  <span title="Github" className="badge badge-secondary mr-1">
                    Github
                  </span>
                  <span title="Git" className="badge badge-secondary mr-1">
                    Git
                  </span>
                  <span title="Express" className="badge badge-secondary mr-1">
                    Express
                  </span>
                  <span
                    title="Web Scrapping"
                    className="badge badge-secondary mr-1"
                  >
                    Web Scrapping
                  </span>
                  <span
                    title="Website Development"
                    className="badge badge-secondary mr-1"
                  >
                    Website Development
                  </span>
                  <span title="Css3" className="badge badge-secondary mr-1">
                    Css3
                  </span>
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
                  Gender: Male
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Permanent Address: Siyari 06, Rupandehi
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Current Address: Kaushaltar
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Marital Status: Unmarried
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Religion: Hinduism
                </div>
                <div className="offset-md-3 col-md-9">
                  <span className="icon-circle-check mr-2"></span>
                  Nationality: Nepali
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
      </Paper>
    </Box>
  );
}
