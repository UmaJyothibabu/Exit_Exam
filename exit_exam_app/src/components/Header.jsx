import React from "react";
import {
  AppBar,
  Box,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

// navbar color
const theme = createTheme({
  palette: {
    primary: {
      main: "#11425f",
    },
  },
});

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h5"
              fontWeight="bold"
              component="div"
              sx={{ flexGrow: 1, fontFamily: "Noto Serif, serif" }}
            >
              Todo Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};

export default Header;
