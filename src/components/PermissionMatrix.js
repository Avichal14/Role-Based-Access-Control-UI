import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";

const PermissionMatrix = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Fetch roles and permissions
    axios.get("http://localhost:3001/roles").then((res) => setRoles(res.data));
    axios
      .get("http://localhost:3001/permissions")
      .then((res) => setPermissions(res.data));
  }, []);

  const togglePermission = (roleId, permission) => {
    const updatedRoles = roles.map((role) => {
      if (role.id === roleId) {
        const updatedPermissions = role.permissions.includes(permission)
          ? role.permissions.filter((perm) => perm !== permission)
          : [...role.permissions, permission];
        return { ...role, permissions: updatedPermissions };
      }
      return role;
    });

    setRoles(updatedRoles);

    // Update the role in the server
    const updatedRole = updatedRoles.find((role) => role.id === roleId);
    axios
      .put(`http://localhost:3001/roles/${roleId}`, updatedRole)
      .catch((err) => {
        console.error(err);
        // Revert on failure
        setRoles(roles);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            {permissions.map((permission) => (
              <TableCell key={permission} align="center">
                {permission}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              {permissions.map((permission) => (
                <TableCell key={permission} align="center">
                  <Checkbox
                    checked={role.permissions.includes(permission)}
                    onChange={() => togglePermission(role.id, permission)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PermissionMatrix;
