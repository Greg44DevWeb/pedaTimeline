import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
// import { useLogoutMutation } from "../slices/usersApiSlice";
// import { logout } from "../slices/authSlice";
import { setCredentials } from "../slices/authSlice";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../utils/yup";
import initialValues from "../utils/formik";
import Loader from "./Loader";

// import * as Yup from "yup";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  //** MUI STYLES */
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "#07712f",
  };
  const submitButtonStyle = {
    marginTop: "15px",
  };
  const boxStyle = {
    margin: "auto",
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const onSubmit = async ({ email, password }) => {
    try {
      const res = await login({ email, password }).unwrap();

      dispatch(
        setCredentials({
          ...res,
        })
      );
      console.log(res);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container>
        <Paper elevation={10} style={paperStyle}>
          <Box align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Connexion</h2>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  name="email"
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="off"
                  type="Email"
                  label="Email"
                  id="Email"
                  helperText={<ErrorMessage name="email" />}
                />
                <Field
                  as={TextField}
                  name="password"
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="off"
                  type="password"
                  label="Mot de passe"
                  id="password"
                  helperText={<ErrorMessage name="password" />}
                />
                <Box style={boxStyle}>
                  <Button
                    onClick={() => {
                      console.log("click");
                    }}
                    size="small"
                    fullWidth
                    type="submit"
                    variant="contained"
                    style={submitButtonStyle}
                  >
                    {isLoading ? <Loader /> : " SE CONNECTER"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
