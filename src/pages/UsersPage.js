import React, { useState } from "react";
import UserTable from "../components/UserTable";
import UserFormModal from "../components/Modals/UserFormModal";
import { Button, Box, Typography } from "@mui/material";

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const refreshData = () => {
    window.location.reload(); // Simple refresh logic
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h4" sx={{ color: "#333", fontWeight: "bold" }}>
          Users Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add User
        </Button>
      </Box>
      <UserTable />
      <UserFormModal
        open={isModalOpen}
        handleClose={handleModalClose}
        userData={selectedUser}
        refreshData={refreshData}
      />
    </Box>
  );
};

export default UsersPage;
