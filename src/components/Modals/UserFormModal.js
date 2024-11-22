import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const UserFormModal = ({ open, handleClose, userData, refreshData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active",
    roles: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    } else {
      setFormData({
        name: "",
        email: "",
        status: "Active",
        roles: "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const url = userData
      ? `http://localhost:3001/users/${userData.id}`
      : "http://localhost:3001/users";

    const method = userData ? "put" : "post";

    axios[method](url, formData)
      .then(() => {
        refreshData();
        handleClose();
      })
      .catch((error) => {
        console.error("Error saving user:", error.response || error.message);
        alert(`Failed to save user: ${error.response?.data || error.message}`);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{userData ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <TextField
          label="Roles"
          name="roles"
          value={formData.roles}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormModal;
