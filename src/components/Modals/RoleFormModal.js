import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import axios from "axios";

const RoleFormModal = ({ open, handleClose, roleData, refreshData }) => {
  const [formData, setFormData] = useState({
    name: "",
    permissions: [],
  });
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Fetch available permissions for selection
    axios
      .get("http://localhost:3001/permissions")
      .then((res) => setPermissions(res.data));

    // Populate form with existing role data if editing
    if (roleData) {
      setFormData(roleData);
    } else {
      setFormData({
        name: "",
        permissions: [],
      });
    }
  }, [roleData]);

  const handlePermissionChange = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = () => {
    if (roleData) {
      // Update existing role
      axios
        .put(`http://localhost:3001/roles/${roleData.id}`, formData)
        .then(() => refreshData());
    } else {
      // Create new role
      axios
        .post("http://localhost:3001/roles", formData)
        .then(() => refreshData());
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{roleData ? "Edit Role" : "Add Role"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <FormGroup>
          {permissions.map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={formData.permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
              }
              label={permission}
            />
          ))}
        </FormGroup>
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

export default RoleFormModal;
