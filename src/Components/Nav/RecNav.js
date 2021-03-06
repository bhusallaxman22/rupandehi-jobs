import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
// import { Logo } from "./icons";
import { Link } from "react-router-dom";
import { AddOutlined, Dashboard, PowerSettingsNew } from "@material-ui/icons";
import Search from "@material-ui/icons/AssignmentInd";
import { Tooltip } from "@material-ui/core";
import Snack from "../common/snack";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  linker: {
    color: "inherit",
    textDecoration: "none",
  },
  img: {
    // width: "auto",
    height: "50px",
  },
}));

export default function RecNav() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [sever, setSever] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    setOpen(true);
    setSnackMessage("Loged Out Successfully.");
    setSever("info");
    setTimeout(() => {
      localStorage.setItem("loggedin", false);
      localStorage.clear();
      window.location.href = "/#/";
      window.location.reload();
    }, 3000);
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/job-list" className={classes.linker}>
        <MenuItem>
          <IconButton aria-label="to my-apps" color="inherit">
            <Dashboard />
          </IconButton>
          <p>JobList</p>
        </MenuItem>
      </Link>
      <Link to="/jobs" className={classes.linker}>
        <MenuItem>
          <IconButton aria-label="to jobs" color="inherit">
            <Search />
          </IconButton>
          <p>Jobs</p>
        </MenuItem>
      </Link>
      <Link to="/add-job" className={classes.linker}>
        <MenuItem>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <AddOutlined />
        </IconButton>
        <p>Add Job</p>
      </MenuItem>
      </Link>
      <MenuItem onClick={handleLogout}>
        <IconButton aria-label="logout" color="inherit">
          <PowerSettingsNew />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar color="textSecondary" position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Link to="/" className={classes.linker}>
              {/* <ButtonBase className={classes.image}> */}
              <img
                className={classes.img}
                alt="complex"
                src={"assets/images/rupandehi.svg"}
              />
              {/* </ButtonBase>{" "} */}
            </Link>
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/job-list" className={classes.linker}>
              <Tooltip title="Jobs List">
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Dashboard />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/jobs" className={classes.linker}>
              <Tooltip title="Jobs">
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Search />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/add-job" className={classes.linker}>
              <Tooltip title="Add Job">
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AddOutlined />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title="Logout">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleLogout}
              >
                <PowerSettingsNew />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Snack
        handleClose={handleClose}
        open={open}
        message={snackMessage}
        sever={sever}
      />
    </div>
  );
}
