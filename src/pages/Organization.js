// import { Typography } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { IoMdAdd } from "react-icons/io";
// import { IoSearch } from "react-icons/io5";

// function Organization() {
//   const [showForm, setShowForm] = useState(false);
//   const [showView, setShowView] = useState(false);
//   const [formData, setFormData] = useState({ id: null, name: "", address: "", location: "" });
//   const [organizations, setOrganizations] = useState([]);
//   const [isUpdate, setIsUpdate] = useState(false); // to differentiate add vs update

//   useEffect(() => {
//     fetch("http://localhost:8080/api/organizations")
//       .then(res => res.json())
//       .then(data => setOrganizations(data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Create or Update
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isUpdate) {
//       // update call
//       fetch(`http://localhost:8080/api/organizations/${formData.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       })
//         .then(res => res.json())
//         .then(updatedOrg => {
//           setOrganizations(organizations.map(org => (org.id === updatedOrg.id ? updatedOrg : org)));
//           setShowForm(false);
//           setFormData({ id: null, name: "", address: "", location: "" });
//           setIsUpdate(false);
//         })
//         .catch(err => console.error(err));
//     } else {
//       // add call
//       fetch("http://localhost:8080/api/organizations", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       })
//         .then(res => res.json())
//         .then(newOrg => {
//           setOrganizations([...organizations, newOrg]);
//           setShowForm(false);
//           setFormData({ id: null, name: "", address: "", location: "" });
//         })
//         .catch(err => console.error(err));
//     }
//   };

//   // Open Update form with pre-filled data
//   const handleUpdateClick = (org) => {
//     setFormData(org);
//     setIsUpdate(true);
//     setShowForm(true);
//   };

//   // Open View popup
//   const handleViewClick = (org) => {
//     setFormData(org);
//     setShowView(true);
//   };

//   return (
//     <div>
//       <div style={{ display: "flex" }}>
//         <h1>Organizations</h1>
//         <button style={{height: "40px", width: "280px", backgroundColor: "green", color: "white", marginLeft: "auto", marginTop: "20px", border: "2px solid green", borderRadius: "20px"}}
//           onClick={() => {
//             setFormData({ id: null, name: "", address: "", location: "" });
//             setIsUpdate(false);
//             setShowForm(true);
//           }}
//         >
//           <IoMdAdd /> Add Organization
//         </button>
//       </div>

//       {/* Search Box */}
//       <div style={{ height: "150px", width: "100%", border: "2px solid black", borderRadius: "5px" }}>
//         <h2 style={{ marginLeft: "25px" }}>Search & Filters</h2>
//         <div style={{ display: "flex", gap: "30px", marginLeft: "25px" }}>
//           <div style={{ position: "relative", width: "250px" }}>
//             <input
//               type="text"
//               placeholder="Search by name"
//               style={{
//                 width: "100%",
//                 padding: "10px 35px 10px 10px",
//                 border: "1px solid #000",
//                 borderRadius: "8px",
//                 outline: "none",
//                 fontSize: "14px",
//               }}
//             />
//             <IoSearch style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
//           </div>
//           <div style={{ position: "relative", width: "250px", marginLeft: "40px" }}>
//             <input
//               type="text"
//               placeholder="Search by location"
//               style={{
//                 width: "100%",
//                 padding: "10px 35px 10px 10px",
//                 border: "1px solid #000",
//                 borderRadius: "8px",
//                 outline: "none",
//                 fontSize: "14px",
//               }}
//             />
//             <IoSearch style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <h1>List of Organizations</h1>
//       <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", margin: "20px auto" }}>
//         <thead style={{ backgroundColor: "#f0f0f0" }}>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Address</th>
//             <th>Location</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {organizations.map((org) => (
//             <tr key={org.id}>
//               <td>{org.id}</td>
//               <td>{org.name}</td>
//               <td>{org.address}</td>
//               <td>{org.location}</td>
//               <td>
//                 <button
//                   style={{ height: "30px", width: "100px", backgroundColor: "#CAFD34", color: "#3C12B2", fontWeight: "bold", border: "1px solid black", borderRadius: "5px", marginRight: "5px" }}
//                   onClick={() => handleUpdateClick(org)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   style={{ height: "30px", width: "100px", backgroundColor: "#CAFD34", color: "#3C12B2", fontWeight: "bold", border: "1px solid black", borderRadius: "5px", marginRight: "5px" }}
//                   onClick={() => handleViewClick(org)}
//                 >
//                   View
//                 </button>
//                 <button style={{ height: "30px", width: "100px", backgroundColor: "red", color: "white", fontWeight: "bold", border: "1px solid black", borderRadius: "5px" }}>
//                   Disable
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Popup Form (Add / Update) */}
//       {showForm && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div style={{ background: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//             <h2>{isUpdate ? "Update Organization" : "Add Organization"}</h2>
//             <form onSubmit={handleSubmit}>
//               <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
//               <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
//               <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
//               <button type="submit" style={{ background: "green", color: "white", padding: "10px", width: "100%", border: "none", borderRadius: "5px" }}>
//                 {isUpdate ? "Update" : "Submit"}
//               </button>
//             </form>
//             <button onClick={() => setShowForm(false)} style={{ marginTop: "10px", width: "100%", padding: "10px", borderRadius: "5px" }}>Cancel</button>
//           </div>
//         </div>
//       )}

//       {/* View Popup */}
//       {showView && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div style={{ background: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//             <h2>View Organization</h2>
//             <p><b>ID:</b> {formData.id}</p>
//             <p><b>Name:</b> {formData.name}</p>
//             <p><b>Address:</b> {formData.address}</p>
//             <p><b>Location:</b> {formData.location}</p>
//             <button onClick={() => setShowView(false)} style={{ marginTop: "10px", width: "100%", padding: "10px", borderRadius: "5px" }}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Organization;


import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useTheme } from "@mui/material/styles";

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
    setFormData(org);
    setShowView(true);
  };

  const theme = useTheme(); 

  return (
    <Box>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Organizations
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<IoMdAdd />}
          sx={{ ml: "auto", borderRadius: "20px" }}
          onClick={() => {
            setFormData({ id: null, name: "", address: "", location: "" });
            setIsUpdate(false);
            setShowForm(true);
          }}
        >
          Add Organization
        </Button>
      </Box>

      {/* Search & Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Search & Filters
          </Typography>
          <Box display="flex" gap={3}>
            <Box sx={{ position: "relative", width: "250px" }}>
              <TextField
                fullWidth
                placeholder="Search by name"
                variant="outlined"
                size="small"
              />
              <IconButton
                sx={{ position: "absolute", right: "5px", top: "5px" }}
              >
                <IoSearch />
              </IconButton>
            </Box>
            <Box sx={{ position: "relative", width: "250px" }}>
              <TextField
                fullWidth
                placeholder="Search by location"
                variant="outlined"
                size="small"
              />
              <IconButton
                sx={{ position: "absolute", right: "5px", top: "5px" }}
              >
                <IoSearch />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Table */}
      <Typography variant="h5" gutterBottom>
        List of Organizations
      </Typography>
      <Table>
      <TableHead
  sx={{
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900] // dark background
        : theme.palette.grey[200], // light background
  }}
>
  <TableRow>
    <TableCell sx={{ color: theme.palette.text.primary }}>ID</TableCell>
    <TableCell sx={{ color: theme.palette.text.primary }}>Name</TableCell>
    <TableCell sx={{ color: theme.palette.text.primary }}>Address</TableCell>
    <TableCell sx={{ color: theme.palette.text.primary }}>Location</TableCell>
    <TableCell sx={{ color: theme.palette.text.primary }}>Actions</TableCell>
  </TableRow>
</TableHead>
        <TableBody>
          {organizations.map((org) => (
            <TableRow key={org.id}>
              <TableCell>{org.id}</TableCell>
              <TableCell>{org.name}</TableCell>
              <TableCell>{org.address}</TableCell>
              <TableCell>{org.location}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{
                    mr: 1,
                    backgroundColor: "#CAFD34",
                    color: "#3C12B2",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleUpdateClick(org)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    mr: 1,
                    backgroundColor: "#CAFD34",
                    color: "#3C12B2",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleViewClick(org)}
                >
                  View
                </Button>
                <Button variant="contained" color="error">
                  Disable
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add / Update Dialog */}
      <Dialog open={showForm} onClose={() => setShowForm(false)}>
        <DialogTitle>
          {isUpdate ? "Update Organization" : "Add Organization"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              color="success"
            >
              {isUpdate ? "Update" : "Submit"}
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={showView} onClose={() => setShowView(false)}>
        <DialogTitle>View Organization</DialogTitle>
        <DialogContent>
          <Typography>
            <b>ID:</b> {formData.id}
          </Typography>
          <Typography>
            <b>Name:</b> {formData.name}
          </Typography>
          <Typography>
            <b>Address:</b> {formData.address}
          </Typography>
          <Typography>
            <b>Location:</b> {formData.location}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowView(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Organization;
