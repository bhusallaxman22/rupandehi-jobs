import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Fuse from "fuse.js";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Search } from "@material-ui/icons";
import { InputBase, Grid } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Snack from "../common/snack";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "title", numeric: false, disablePadding: true, label: "Job Title" },
  {
    id: "applicants",
    numeric: true,
    disablePadding: false,
    label: "Applicants",
  },
  { id: "postedOn", numeric: false, disablePadding: false, label: "Posted On" },
  { id: "accepted", numeric: true, disablePadding: false, label: "Accepted" },
  { id: "deadline", numeric: false, disablePadding: false, label: "Deadline" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Jobs List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "70vh",
    marginTop: "80px",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "210px",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  actionBut: {
    margin: "10px 10px 10px 10px",
  },
  applicants: {
    color: "#32CD32",
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("deadline");
  // const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [severe, setSevere] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

  const fuse = new Fuse(jobs, {
    keys: ["title"],
    includeScore: true,
    threshold: 0.3,
  });

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setSearchResult(fuse.search(e.target.value));
  };

  React.useEffect(() => {
    if (localStorage.getItem("type") !== "R") {
      window.location.href = "/#404";
    }
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    axios
      .get("/api/list/rid", config)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jobs.rid]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, jobs.length - page * rowsPerPage);

  function onDeleteJob(e) {
    // jobs = jobs.filter((n) => n.id !== e.id);
    // setSelected([]);

    // window.location.href = "/#job-list";
    var config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    var req = {
      id: e,
    };
    console.log(e.title);
    axios
      .post("/api/list/delete", req, config)
      .then((res) => {
        setOpen(true);
        setMsg("Job deleted");
        setSevere("success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (localStorage.getItem("type") !== "R") {
    window.location.href = "/#404";
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid item>
          <Paper component="form" className={classes.search}>
            <InputBase
              className={classes.input}
              value={search}
              onChange={(e) => onChangeSearch(e)}
              onSubmit={(e) => e.preventDefault()}
              placeholder="search jobs by name"
              inputProps={{ "aria-label": "search job list" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <Search />
            </IconButton>
          </Paper>{" "}
        </Grid>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={jobs.length}
            />
            <TableBody>
              {stableSort(
                searchResult.length > 0
                  ? searchResult.map((job) => job.item)
                  : jobs,
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`${row._id}`}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        <Link to={`/jobs/${row._id}`}>{row.title}</Link>
                      </TableCell>
                      <TableCell align="center">{row.curr_app}</TableCell>
                      <TableCell align="center">
                        <Moment format="YYYY-MM-DD hh:mm:ss">
                          {new Date(row.postedOn)}
                        </Moment>
                      </TableCell>
                      <TableCell align="center">{row.accepted}</TableCell>
                      <TableCell align="center">{row.deadline}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          value="delete"
                          className={classes.actionBut}
                          onClick={() => onDeleteJob(row)}
                        >
                          Delete
                        </Button>
                        <Link to={{ pathname: "/edit", state: { e: row } }}>
                          <Button
                            variant="contained"
                            className={classes.actionBut}
                            color="primary"
                            size="small"
                            value="delete"
                          >
                            Edit
                          </Button>
                        </Link>
                        {row.curr_app !== 0 ? (
                          <Link to={`/appls/${row._id}`}>
                            <Button
                              variant="outlined"
                              className={
                                classes.applicants && classes.actionBut
                              }
                              size="medium"
                            >
                              Applicants
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            variant="outlined"
                            className={classes.applicants && classes.actionBut}
                            size="medium"
                          >
                            No Applicants
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={searchResult.length > 0 ? searchResult.length : jobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Snack open={open} message={msg} severity={severe} />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
