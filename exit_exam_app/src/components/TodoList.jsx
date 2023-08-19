import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
  createTheme,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import Header from "./Header";

const TodoList = () => {
  const [add, setAdd] = useState(false);
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);
  const [update, setUpdate] = useState(false); //for checking wheather it is adding new or updating old one
  const navigate = useNavigate();
  const [singleValue, setSingleValue] = useState({}); //for updation form

  useEffect(() => {
    axios
      .get("/api/todolist")
      .then((response) => {
        if (response.data.message === "Unable to load") {
          alert(response.data.message);
        } else {
          console.log(response.data);
          setData(response.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to load data");
      });
  }, []);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // creating transparent button
  const theme = createTheme();
  const TransparentButton = styled(Button)(({ theme }) => ({
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: "none",
    outline: "none",
    cursor: "pointer",
  }));

  const deleteHandler = (id) => {
    axios.delete(`/api/todolist/${id}`).then((response) => {
      if (response.data.message === "Task deleted successfully") {
        alert(response.data.message);
        window.location.reload();
      } else {
        alert("Unable to delete");
        window.location.reload();
      }
    });
    window.location.reload();
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let finalJSX = (
    <>
      <Grid ustifyContent="center" sx={{ paddingTop: "2%" }}>
        <Button
          variant="contained"
          onClick={() => {
            setAdd(true);
          }}
        >
          Add
        </Button>
        {add && (
          <AddTask method="post" data={{ todo_datails: "", status: "" }} />
        )}
      </Grid>
      {!add && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            paddingTop: "15vh",
            paddingBottom: "8vh",
            // backgroundColor: "#cecce0",
          }}
        >
          <Grid item xs={11} sm={11} md={11} lg={11}>
            {loading ? (
              <div style={{ margin: "10% 45%" }}>
                <CircularProgress />
                <h1>Loading</h1>
              </div>
            ) : (
              <Paper
                sx={{
                  width: "98.5%",
                  overflow: "hidden",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
                elevation={6}
              >
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow
                        sx={{
                          "& th": {
                            color: "white",
                            backgroundColor: "#5F2E11",
                            fontSize: "1.25rem",
                            fontFamily: "Tektur, cursive",
                            fontWeight: "500",
                          },
                        }}
                      >
                        <TableCell align="center" style={{ minWidth: 170 }}>
                          No
                        </TableCell>
                        <TableCell align="center" style={{ minWidth: 170 }}>
                          Tasks
                        </TableCell>

                        <TableCell align="center" style={{ minWidth: 170 }}>
                          Status
                        </TableCell>
                        <TableCell align="center" style={{ minWidth: 170 }}>
                          Update/Delete
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, i) => (
                          <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                            <TableCell
                              sx={{
                                fontSize: "1.05rem",
                                fontWeight: "bold",
                                color: "#47301F",
                              }}
                              align="center"
                            >
                              {i + 1}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "1.05rem",
                                fontWeight: "bold",
                                color: "#47301F",
                              }}
                              align="center"
                            >
                              {row.todo_details}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "1.05rem",
                                fontWeight: "bold",
                                color: "#47301F",
                              }}
                              align="center"
                            >
                              {row.status}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "1.05rem",
                                fontWeight: "bold",
                                color: "#47301F",
                              }}
                              align="center"
                            >
                              {" "}
                              <ThemeProvider theme={theme}>
                                <Tooltip title="Update" arrow>
                                  <TransparentButton
                                    onClick={() => {
                                      updateTask(row);
                                    }}
                                  >
                                    <UpdateIcon style={{ color: "#335A71" }} />{" "}
                                    {/* Update */}
                                  </TransparentButton>
                                </Tooltip>
                              </ThemeProvider>
                              &nbsp;
                              <ThemeProvider theme={theme}>
                                <Tooltip title="Delete" arrow>
                                  <TransparentButton
                                  // variant="contained"

                                  // onClick={() => {
                                  //   deleteHandler(row._id);
                                  // }}
                                  >
                                    <DeleteIcon
                                      color="error"
                                      onClick={() => {
                                        deleteHandler(row._id);
                                      }}
                                    />
                                  </TransparentButton>
                                </Tooltip>
                              </ThemeProvider>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  sx={{ backgroundColor: "#F2F2F2" }}
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
  const updateTask = (val) => {
    setUpdate(true);
    setSingleValue(val);
  };

  if (update) {
    finalJSX = <AddTask method="put" data={singleValue} />;
  }
  return (
    <>
      <Header />
      {finalJSX}
    </>
  );
};

export default TodoList;
