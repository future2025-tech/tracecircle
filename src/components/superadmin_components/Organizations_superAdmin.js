import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
  Chip,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Organization_superAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [formData, setFormData] = useState({
    organizationId: null,
    organizationName: "",
    organizationLocation: "",
    organizationStatus: "ACTIVE",
  });
  const [organizations, setOrganizations] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();

  // Fetch all organizations
  useEffect(() => {
    fetch("http://localhost:8080/api/organizations")
      .then((res) => res.json())
      .then((data) => setOrganizations(data))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdate) {
      fetch(`http://localhost:8080/api/organizations/${formData.organizationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((updatedOrg) => {
          setOrganizations(
            organizations.map((org) =>
              org.organizationId === updatedOrg.organizationId ? updatedOrg : org
            )
          );
          resetForm();
        })
        .catch((err) => console.error(err));
    } else {
      fetch("http://localhost:8080/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((newOrg) => {
          setOrganizations([...organizations, newOrg]);
          resetForm();
        })
        .catch((err) => console.error(err));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setFormData({
      organizationId: null,
      organizationName: "",
      organizationLocation: "",
      organizationStatus: "ACTIVE",
    });
    setIsUpdate(false);
  };

  const handleUpdateClick = (org) => {
    setFormData(org);
    setIsUpdate(true);
    setShowForm(true);
  };

  const handleViewClick = (org) => {
    setSelectedOrg(org);
    setShowView(true);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/organizations/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setOrganizations(organizations.filter((org) => org.organizationId !== id));
          setMenuAnchor(null);
        }
      })
      .catch((err) => console.error(err));
  };

  const renderStatusChip = (status) => {
    let color = "#ccc";
    let textColor = "#000";
    if (status === "ACTIVE") {
      color = "#e7f5ec";
      textColor = "#1a4d2e";
    } else if (status === "INACTIVE") {
      color = "#ffe3e3";
      textColor = "#b02a37";
    } else if (status === "UNDER_REVIEW") {
      color = "#fff3cd";
      textColor = "#856404";
    }
    return (
      <Chip
        label={status}
        sx={{ backgroundColor: color, color: textColor, fontWeight: "bold" }}
        size="small"
      />
    );
  };

  return (
    <Box
      sx={{
        height: "90vh",
        background:
          theme.palette.mode === "light"
            ? "#fafafa"
            : theme.palette.background.paper,
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center">
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Organizations Management
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: "0.95rem" }}
          >
            Manage companies, locations, and compliance status.
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            ml: "auto",
            borderRadius: "10px",
            textTransform: "none",
            backgroundColor: "#06923E",
            color: "#fff",
            "&:hover": { backgroundColor: "#0a833a" },
          }}
          startIcon={<IoMdAdd />}
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Add Organization
        </Button>
      </Box>

      {/* Search + Filters */}
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
        <Box flex={1} display="flex" alignItems="center">
          <TextField
            fullWidth
            placeholder="Search by Organization ID, Name..."
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
        <Box flex={1} display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
          <TextField select size="small" label="Status" defaultValue="all">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
            <MenuItem value="UNDER_REVIEW">Under Review</MenuItem>
          </TextField>

          <TextField select size="small" label="Location" defaultValue="all">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="Germany">Germany</MenuItem>
            <MenuItem value="Spain">Spain</MenuItem>
          </TextField>
        </Box>
      </Box>
      {/* Table */}
      <Card sx={{ borderRadius: 2 }}>
        <Table size="">
          <TableHead
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "#f1f3f5" : "#2a2a2a",
              
            }}
          >
            <TableRow sx={{ py:1.5 }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((org) => (
                <TableRow
                  key={org.organizationId}
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#2e2e2e" : "#e7f5ec",
                      color:
                        theme.palette.mode === "dark" ? "#fff" : "inherit",
                    },
                  }}
                >
                  <TableCell>{`ORG-${org.organizationId}`}</TableCell>
                  <TableCell>{org.organizationName}</TableCell>
                  <TableCell>{org.organizationLocation}</TableCell>
                  <TableCell>{renderStatusChip(org.organizationStatus)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewClick(org)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleUpdateClick(org)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        setMenuAnchor(e.currentTarget);
                        setSelectedOrg(org);
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Divider />
        <TablePagination
          component="div"
          count={organizations.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      {/* More menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => alert("Report " + selectedOrg?.organizationName)}>
          Report
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedOrg?.organizationId)}>
          Delete
        </MenuItem>
      </Menu>

      {/* Add/Edit Drawer */}
      <Drawer
        anchor="right"
        open={showForm}
        onClose={() => setShowForm(false)}
        PaperProps={{
          sx: { width: "50%", maxWidth: "600px" },
        }}
      >
        <Box p={3} height="100%" display="flex" flexDirection="column">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {isUpdate ? "Update Organization" : "Add Organization"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <TextField
              fullWidth
              name="organizationName"
              label="Organization Name"
              value={formData.organizationName}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="organizationLocation"
              label="Organization Location"
              value={formData.organizationLocation}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              select
              fullWidth
              name="organizationStatus"
              label="Status"
              value={formData.organizationStatus}
              onChange={handleInputChange}
              margin="normal"
              required
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
              <MenuItem value="UNDER_REVIEW">Under Review</MenuItem>
            </TextField>
            <Box mt="auto">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#e7f5ec",
                  color: "#1a4d2e",
                  "&:hover": { backgroundColor: "#d1ecda" },
                }}
              >
                {isUpdate ? "Update" : "Submit"}
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* View Drawer */}
      <Drawer
        anchor="right"
        open={showView}
        onClose={() => setShowView(false)}
        PaperProps={{
          sx: { width: "50%", maxWidth: "600px" },
        }}
      >
        <Box p={3} height="100%">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            View Organization
          </Typography>
          {selectedOrg && (
            <Box>
              <Typography><b>ID:</b> {selectedOrg.organizationId}</Typography>
              <Typography><b>Name:</b> {selectedOrg.organizationName}</Typography>
              <Typography><b>Location:</b> {selectedOrg.organizationLocation}</Typography>
              <Typography><b>Status:</b> {selectedOrg.organizationStatus}</Typography>
            </Box>
          )}
          <Box mt={3}>
            <Button
              onClick={() => setShowView(false)}
              variant="outlined"
              fullWidth
            >
              Close
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Organization_superAdmin;
