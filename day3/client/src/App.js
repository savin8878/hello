import React, { useState } from "react";
import { Paper } from "@mui/material";
import Navbar from "./components/Navbar";
import Common from "./components/Common";
import ReactVirtualizedTable from "./components/Trip";
import "./App.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Collapse from "./components/Collapse";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [dates, setDates] = useState([]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  const backgroundClassName = darkMode ? "background dark-mode" : "background";

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ minHeight: "100vh" }}>
        <Navbar check={darkMode} change={() => setDarkMode(!darkMode)} />
        <div style={{ backgroundColor: darkMode ? "" : "white" }} className={backgroundClassName}>
        </div>
        <Common check={darkMode} change={() => setDarkMode(!darkMode)} />
        {/* <div className="tripClass">Trip Plan</div> */}
        {/* <ReactVirtualizedTable /> */}
        {/* <Collapse date={date} index={index} check={darkMode} /> */}
        <div className="button-container">
          <button className="clear-button">Clear</button>
          <button className="submit-button">Submit</button>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
