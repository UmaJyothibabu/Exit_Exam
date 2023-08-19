import React from "react";
import "../Styles/addTask.css";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useFormik } from "formik";
import { AddSchema } from "../Schema/AddSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = (props) => {
  const navigate = useNavigate();
  const {
    values,
    handleSubmit,
    handleChange,
    handleReset,
    handleBlur,
    touched,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues: props.data,
    validationSchema: AddSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        if (props.method === "post") {
          axios
            .post(`http://localhost:8000/todolist`, values)
            .then((response) => {
              if (response.data.message === "Task added successfully") {
                alert(response.data.message);
                window.location.reload();
                // navigate("/todolist");
              } else {
                alert("Unable to add");
                window.location.reload();
              }
            });
        }
        if (props.method === "put") {
          axios
            .put(`http://localhost:8000/todolist/${values._id}`, values)
            .then((response) => {
              if (response.data.message === "Task updated successfully") {
                alert(response.data.message);
                window.location.reload();
              }
            });
        }
      } catch (error) {}
    },
  });
  return (
    <>
      <Grid justifyContent="center" className="addform">
        <Paper elevation={12}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Tooltip title="Back to Student table" arrow>
              <Button>
                <SkipPreviousIcon
                  sx={{
                    height: "50px",
                    width: "50px",
                    color: "#3F708D",
                  }}
                  onClick={() => {
                    window.location.reload();
                  }}
                />
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8}>
            <Typography
              variant="h4"
              gutterbottom
              className="register"
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              {props.method === "post" ? "Add Task" : "Update Task"}
            </Typography>
          </Grid>
          <Grid container>
            <form className="form">
              <Grid
                container
                justifyContent="center"
                align="center"
                spacing={2}
              >
                <Grid item xs={12} sm={12} md={12} lg={8}>
                  <TextField
                    sx={{ m: 2 }}
                    fullWidth
                    label="Task details"
                    name="todo_details"
                    value={values.todo_details}
                    variant="outlined"
                    multiline
                    maxRows={4}
                    onChange={handleChange}
                    onBulur={handleBlur}
                  ></TextField>
                  <Box pl={3}>
                    {errors.todo_details && touched.todo_details ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.todo_details}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    sx={{ m: 2, minWidth: 200 }}
                    fullwidth
                    select
                    name="status"
                    value={values.status}
                    label="Task status"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem key={1} value="Completed">
                      Completed
                    </MenuItem>
                    <MenuItem key={2} value="Ongoing">
                      Ongoing
                    </MenuItem>
                  </TextField>
                  <Box pl={3}>
                    {errors.status && touched.status ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.status}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      padding: "2%",
                      marginBottom: "6%",
                      backgroundColor: "#3F708D",
                    }}
                    // disabled={isSubmitting}
                  >
                    {props.method === "post"
                      ? "Register Student"
                      : "Update Student"}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{
                      padding: "2%",
                      marginBottom: "6%",
                      backgroundColor: "#3F708D",
                    }}
                    onClick={handleReset}
                    disabled={isSubmitting}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default AddTask;
