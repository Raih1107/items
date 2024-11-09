import React from "react";
import { Button, Container, Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = ({ toggleColorMode, colorMode }) => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height={64}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "center",
            background: "linear-gradient(to right, cyan, blue)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: { xs: "28px", sm: "32px" },
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Product Store 🛒
          </Link>
        </Typography>

        <Box display="flex" alignItems="center" spacing={2}>
          <Link to="/create">
            <Button variant="contained" startIcon={<FaPlusSquare />}>
              Add Product
            </Button>
          </Link>

          <IconButton onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Navbar;
