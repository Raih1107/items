import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route from react-router-dom
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
// hi  
function App() {
  const [colorMode, setColorMode] = useState("light");

  // Create a theme based on the colorMode
  const theme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  // Function to toggle between light and dark mode
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your routes */}
      <Navbar toggleColorMode={toggleColorMode} colorMode={colorMode} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
