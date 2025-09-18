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
  useTheme,
  InputAdornment,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Manufacture_Admin_Departments() {
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [formData, setFormData] = useState({
    departmentId: null,
    departmentName: "",
    departmentActions: "",
    departmentOrganization: "",
  });
  const [departments, setDepartments] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();

  // Fetch all departments
  useEffect(() => {
    fetch("http://localhost:8080/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdate) {
      fetch(`http://localhost:8080/departments/${formData.departmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((updatedDept) => {
          setDepartments(
            departments.map((d) =>
              d.departmentId === updatedDept.departmentId ? updatedDept : d
            )
          );
          resetForm();
        })
        .catch((err) => console.error(err));
    } else {
      fetch("http://localhost:8080/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((newDept) => {
          setDepartments([...departments, newDept]);
          resetForm();
        })
        .catch((err) => console.error(err));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setFormData({
      departmentId: null,
      departmentName: "",
      departmentActions: "",
      departmentOrganization: "",
    });
    setIsUpdate(false);
  };

  const handleUpdateClick = (dept) => {
    setFormData(dept);
    setIsUpdate(true);
    setShowForm(true);
  };

  const handleViewClick = (dept) => {
    setSelectedDept(dept);
    setShowView(true);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/departments/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setDepartments(departments.filter((d) => d.departmentId !== id));
          setMenuAnchor(null);
        }
      })
      .catch((err) => console.error(err));
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
            Departments Management
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: "0.95rem" }}
          >
            Manage departments, actions, and organizations.
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
          Add Department
        </Button>
      </Box>

      {/* Search */}
      <Box
        display="flex"
        flexDirection="row"
        width="50%"
        borderRadius={2}
        gap={2}
        marginBottom={5}
        marginTop={2}
      >
        <Box 
          flex={1} 
          display="flex" 
          alignItems="center">
          <TextField
            fullWidth
            placeholder="Search by Department ID, Name..."
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
      </Box>

      {/* Table */}
      <Card sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "#f1f3f5" : "#2a2a2a",
            }}
          >
            <TableRow>
              <TableCell><b>DEPT ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>ORG ID</b></TableCell>
              <TableCell><b>Organization</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dept) => (
                <TableRow
                  key={dept.departmentId}
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#2e2e2e" : "#e7f5ec",
                      color:
                        theme.palette.mode === "dark" ? "#fff" : "inherit",
                    },
                  }}
                >
                  <TableCell>{`DEPT-${dept.departmentId}`}</TableCell>
                  <TableCell>{dept.departmentName}</TableCell>
                  <TableCell>{dept.departmentActions}</TableCell>
                  <TableCell>{dept.departmentOrganization}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewClick(dept)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleUpdateClick(dept)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        setMenuAnchor(e.currentTarget);
                        setSelectedDept(dept);
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
          count={departments.length}
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
        <MenuItem onClick={() => alert("Report " + selectedDept?.departmentName)}>
          Report
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedDept?.departmentId)}>
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
            {isUpdate ? "Update Department" : "Add Department"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <TextField
              fullWidth
              name="departmentName"
              label="Department Name"
              value={formData.departmentName}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="departmentActions"
              label="Department Actions"
              value={formData.departmentActions}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="departmentOrganization"
              label="Department Organization"
              value={formData.departmentOrganization}
              onChange={handleInputChange}
              margin="normal"
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
            View Department
          </Typography>
          {selectedDept && (
            <Box>
              <Typography><b>ID:</b> {selectedDept.departmentId}</Typography>
              <Typography><b>Name:</b> {selectedDept.departmentName}</Typography>
              <Typography><b>Actions:</b> {selectedDept.departmentActions}</Typography>
              <Typography><b>Organization:</b> {selectedDept.departmentOrganization}</Typography>
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

export default Manufacture_Admin_Departments;
