import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

import { useState } from "react";
import { useEffect } from "react";

export default function ButtonAppBar() {
  // const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [auth, setAuth] = useState(false);

  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setAuth(true);
    }
  }, [userInfo]);
  // console.log("INFO : ", userInfo);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap;
      dispatch(logout());
      setAuth(false);
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="appbar"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography>
            MANAGEMENT DES ATELIERS DE PRATIQUES CULINAIRES
          </Typography>
          <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
          {auth && (
            <Box marginRight={10}>
              <Typography variant="h6">{userInfo.firstname}</Typography>
              <Typography variant="h6" fontSize={14}>
                {userInfo.job}
              </Typography>
            </Box>
          )}
          {auth && <LogoutIcon onClick={logoutHandler} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
