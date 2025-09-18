import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  useTheme,
  Card,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoSearch } from "react-icons/io5";

const roles = [
  {
    id: "ROLE-001",
    name: "Super Admin",
    description: "Full system access",
    level: "Global",
    permissions: "All Permissions",
    users: 1,
    createdOn: "10-09-2025",
  },
  {
    id: "ROLE-002",
    name: "Manufacture Admin",
    description: "Production",
    level: "Organization",
    permissions: "Manage",
    users: 1,
    createdOn: "10-09-2025",
  },
  {
    id: "ROLE-003",
    name: "Product Creator",
    description: "Creation",
    level: "Department",
    permissions: "Create",
    users: 1,
    createdOn: "10-09-2025",
  },
  {
    id: "ROLE-004",
    name: "Supplier Admin",
    description: "Management",
    level: "Organization",
    permissions: "Manage",
    users: 1,
    createdOn: "10-09-2025",
  },
  {
    id: "ROLE-005",
    name: "Supplier Data Entry",
    description: "Data Entry",
    level: "Department",
    permissions: "Write",
    users: 1,
    createdOn: "10-09-2025",
  },
  {
    id: "ROLE-006",
    name: "Logistics Admin",
    description: "Coordination",
    level: "Organization",
    permissions: "Manage",
    users: 1,
    createdOn: "10-09-2025",
  },
  {
    id: "ROLE-007",
    name: "Warehouse Updator",
    description: "Inventory",
    level: "Department",
    permissions: "Update",
    users: 1,
    createdOn: "10-09-2025",
  },
  {
    id: "ROLE-008",
    name: "Logistic Updator",
    description: "Tracking",
    level: "Department",
    permissions: "Update",
    users: 1,
    createdOn: "10-09-2025",
  },
  {
    id: "ROLE-009",
    name: "Retailer Admin",
    description: "Oversight",
    level: "Organization",
    permissions: "Manage",
    users: 1,
    createdOn: "10-09-2025",
  },
  {
    id: "ROLE-010",
    name: "Retailer Updator",
    description: "Updates",
    level: "Department",
    permissions: "Update",
    users: 1,
    createdOn: "10-09-2025",
  },
  {
    id: "ROLE-011",
    name: "Recycle Admin",
    description: "Sustainability",
    level: "Organization",
    permissions: "Manage",
    users: 1,
    createdOn: "10-09-2025",
  },
];

function Super_Admin_Roles() {
  const theme = useTheme();

  const getLevelChip = (level) => {
    let color;
    switch (level) {
      case "Global":
        color = { backgroundColor: "#ffe6e6", color: "#e53935" };
        break;
      case "Organization":
        color = { backgroundColor: "#e0f7fa", color: "#00796b" };
        break;
      case "Department":
        color = { backgroundColor: "#e8f5e9", color: "#2e7d32" };
        break;
      default:
        color = {};
    }
    return <Chip label={level} size="small" sx={{ ...color, fontWeight: "bold" }} />;
  };

  return (
    <Box
      sx={{
        height: "90vh",
        background:
          theme.palette.mode === "light"
            ? "#fafafaff"
            : theme.palette.background.paper,
      }}
    >
        <Box>
            <Typography variant="h4" fontWeight="bold">
                Role Management
            </Typography>
        </Box>
             <Box
                  display="flex"
                  flexDirection="row"
                  width="100%"
                  borderRadius={2}
                  gap={2}
                  marginBottom={5}
                  marginTop={2}
                >
                    
                  {/* Left: Search Bar */}
                  <Box
                    flex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <TextField
                      fullWidth
                      placeholder="Roles name..."
                      variant="outlined"
                      size="small"
                      InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoSearch style={{ color: "#888", fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                  }}
                    />
                  </Box>
        
                  {/* Right: Filters */}
                  <Box
                    flex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    gap={2}
                  >
                    <TextField select size="small" label="All Status" defaultValue="all">
                      <MenuItem value="all">All Roles</MenuItem>
                      <MenuItem value="active">Admin</MenuItem>
                      <MenuItem value="inactive">Users</MenuItem>
                    </TextField>
                  </Box>
                </Box>

      <Card sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{  backgroundColor:
                theme.palette.mode === "light" ? "#f1f3f5" : "#2a2a2a",}}>
            <TableRow>
              <TableCell><strong>Role ID</strong></TableCell>
              <TableCell><strong>Role Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Level</strong></TableCell>
              <TableCell><strong>Permissions</strong></TableCell>
              <TableCell><strong>Users</strong></TableCell>
              <TableCell><strong>Created On</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{getLevelChip(role.level)}</TableCell>
                <TableCell>{role.permissions}</TableCell>
                <TableCell>{`${role.users} user`}</TableCell>
                <TableCell>{role.createdOn}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}

export default Super_Admin_Roles;
