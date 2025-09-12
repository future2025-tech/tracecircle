import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaRegSquare } from "react-icons/fa";

function Employee() {
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", address: "", location: "" });
  const [employee, setEmployee] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false); // to differentiate add vs update

  useEffect(() => {
    fetch("http://localhost:8080/api/employee")
      .then(res => res.json())
      .then(data => setEmployee(data))
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdate) {
      // update call
      fetch(`http://localhost:8080/api/employee/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(updatedEmp => {
          setEmployee(employee.map(emp => (emp.id === updatedEmp.id ? updatedEmp : emp)));
          setShowForm(false);
          setFormData({ id: null, name: "", address: "", location: "" });
          setIsUpdate(false);
        })
        .catch(err => console.error(err));
    } else {
      // add call
      fetch("http://localhost:8080/api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(newEmp => {
          setEmployee([...employee, newEmp]);
          setShowForm(false);
          setFormData({ id: null, name: "", address: "", location: "" });
        })
        .catch(err => console.error(err));
    }
  };

  // Open Update form with pre-filled data
  const handleUpdateClick = (emp) => {
    setFormData(emp);
    setIsUpdate(true);
    setShowForm(true);
  };

  // Open View popup
  const handleViewClick = (emp) => {
    setFormData(emp);
    setShowView(true);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1>Employees</h1>
        <button
          style={{
            height: "40px",
            width: "280px",
            backgroundColor: "green",
            color: "white",
            marginLeft: "auto",
            marginTop: "20px",
            border: "2px solid green",
            borderRadius: "20px",
          }}
          onClick={() => {
            setFormData({ id: null, name: "", address: "", location: "" });
            setIsUpdate(false);
            setShowForm(true);
          }}
        >
          <IoMdAdd /> Add Employee
        </button>
      </div>

      {/* Search Box */}
      <div style={{ height: "150px", width: "100%", border: "2px solid black", borderRadius: "5px" }}>
        <h2 style={{ marginLeft: "25px" }}>Search & Filters</h2>
        <div style={{ display: "flex", gap: "30px", marginLeft: "25px" }}>
          <div style={{ position: "relative", width: "250px" }}>
            <input
              type="text"
              placeholder="Search by name"
              style={{
                width: "100%",
                padding: "10px 35px 10px 10px",
                border: "1px solid #000",
                borderRadius: "8px",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <IoSearch style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
          </div>
          <div style={{ position: "relative", width: "250px", marginLeft: "40px" }}>
            <input
              type="text"
              placeholder="Search by ID"
              style={{
                width: "100%",
                padding: "10px 35px 10px 10px",
                border: "1px solid #000",
                borderRadius: "8px",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <FaRegSquare style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <h1>List of Employees</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", margin: "20px auto" }}>
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Organization</th>
            <th>Department</th>
            <th>Employee Role</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.address}</td>
              <td>{emp.location}</td>
              <td>
                <button
                  style={{ height: "30px", width: "100px", backgroundColor: "#CAFD34", color: "#3C12B2", fontWeight: "bold", border: "1px solid black", borderRadius: "5px", marginRight: "5px" }}
                  onClick={() => handleUpdateClick(emp)}
                >
                  Update
                </button>
                <button
                  style={{ height: "30px", width: "100px", backgroundColor: "#CAFD34", color: "#3C12B2", fontWeight: "bold", border: "1px solid black", borderRadius: "5px", marginRight: "5px" }}
                  onClick={() => handleViewClick(emp)}
                >
                  View
                </button>
                <button style={{ height: "30px", width: "100px", backgroundColor: "red", color: "white", fontWeight: "bold", border: "1px solid black", borderRadius: "5px" }}>
                  Disable
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Form (Add / Update) */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ background: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
            <h2>{isUpdate ? "Update Employee" : "Add Employee"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
              <input type="text" name="address" placeholder="Organization" value={formData.address} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
              <input type="text" name="address" placeholder="Department" value={formData.address} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
               <input type="text" name="location" placeholder="Employee role" value={formData.location} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
               <input type="text" name="location" placeholder="Gender" value={formData.location} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
              <button type="submit" style={{ background: "green", color: "white", padding: "10px", width: "100%", border: "none", borderRadius: "5px" }}>
                {isUpdate ? "Update" : "Submit"}
              </button>
            </form>
            <button onClick={() => setShowForm(false)} style={{ marginTop: "10px", width: "100%", padding: "10px", borderRadius: "5px" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* View Popup */}
      {showView && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ background: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
            <h2>View Organization</h2>
            <p><b>ID:</b> {formData.id}</p>
            <p><b>Name:</b> {formData.name}</p>
            <p><b>Roles:</b> {formData.address}</p>
            <button onClick={() => setShowView(false)} style={{ marginTop: "10px", width: "100%", padding: "10px", borderRadius: "5px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;
