import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Menu,
  MenuItem,
  Chip,
  TablePagination,
  useTheme,
  Divider,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { InputAdornment } from "@mui/material";


function Organization() {
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    address: "",
    location: "",
  });
  const [organizations, setOrganizations] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();

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
      fetch(`http://localhost:8080/api/organizations/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((updatedOrg) => {
          setOrganizations(
            organizations.map((org) =>
              org.id === updatedOrg.id ? updatedOrg : org
            )
          );
          setShowForm(false);
          setFormData({ id: null, name: "", address: "", location: "" });
          setIsUpdate(false);
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
          setShowForm(false);
          setFormData({ id: null, name: "", address: "", location: "" });
        })
        .catch((err) => console.error(err));
    }
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

  return (
    <Box sx={{
      height:"90vh",
      background:
            theme.palette.mode === "light"
              ? "#fafafaff"
              : theme.palette.background.paper,
    }}>
      
      {/* Header */}

       <Box display="flex" alignItems="center">
          <Box sx={{mb:2}}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Organizations Management
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: "0.95rem" }}
            >
              Manage companies, departments, and compliance status.
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              ml: "auto",
              borderRadius: "10px",
              textTransform: "none",
              backgroundColor: "#06923E",
              color: "#ffffffff",
              "&:hover": { backgroundColor: "#0a833aff" },
            }}
            startIcon={<IoMdAdd />}
            onClick={() => {
              setFormData({ id: null, name: "", address: "", location: "" });
              setIsUpdate(false);
              setShowForm(true);
            }}
          >
            Add Organization
          </Button>
          
        </Box>
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
  //      border={`1px solid ${
  //   theme.palette.mode === "dark" ? "#444" : "#e0e0e0ff"
  // }`}
      borderRadius={2}
      // p={2}
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
          placeholder="Search Organizations ID, Organization Name..."
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
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

        <TextField select size="small" label="All Location" defaultValue="all">
          <MenuItem value="all">All Location</MenuItem>
          <MenuItem value="india">India</MenuItem>
          <MenuItem value="germany">Germany</MenuItem>
          <MenuItem value="spain">Spain</MenuItem>
        </TextField>
      </Box>
    </Box>

      {/* Table */}
      <Card sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "#f1f3f5" : "#2a2a2a",
            }}
          >
            <TableRow>
              <TableCell><b>Organization ID</b></TableCell>
              <TableCell><b>Organization Name</b></TableCell>
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
                  key={org.id}
                   sx={(theme) => ({
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark" ? "#2e2e2e" : "#e7f5ec",
      color: theme.palette.mode === "dark" ? "#fff" : "inherit",
    },
  })}
                >
                  <TableCell>{`ORG-${org.id}`}</TableCell>
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{org.location}</TableCell>
                  <TableCell>
                    <Chip
                      label="Active"
                      sx={{
                        backgroundColor: "#e7f5ec",
                        color: "#1a4d2e",
                        fontWeight: "bold",
                      }}
                      size="small"
                    />
                  </TableCell>
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
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#e7f5ec !important",
              color: "#1a4d2e !important",
              fontWeight: "bold",
            },
          }}
        />
      </Card>

      {/* More menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => alert("Report " + selectedOrg?.name)}>
          Report
        </MenuItem>
        <MenuItem onClick={() => alert("Archived " + selectedOrg?.name)}>
          Archive
        </MenuItem>
      </Menu>

      {/* Edit/Add Drawer */}
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
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleInputChange}
              margin="normal"
              required
            />
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
              <Typography>
                <b>ID:</b> {selectedOrg.id}
              </Typography>
              <Typography>
                <b>Name:</b> {selectedOrg.name}
              </Typography>
              <Typography>
                <b>Address:</b> {selectedOrg.address}
              </Typography>
              <Typography>
                <b>Location:</b> {selectedOrg.location}
              </Typography>
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

export default Organization;
