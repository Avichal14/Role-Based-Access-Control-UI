import React from "react";
import RoleTable from "../components/RoleTable";
import { Box, Typography } from "@mui/material";

const RolesPage = () => {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#333", fontWeight: "bold", marginBottom: 3 }}
      >
        Roles Management
      </Typography>
      <RoleTable />
    </Box>
  );
};

export default RolesPage;
