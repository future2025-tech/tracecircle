import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaRegSquare } from "react-icons/fa";
import { Box } from "@mui/material"

function Product() {
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [formData, setFormData] = useState({ productid: null, productname: "", category: "", description: "" });
  const [products, setProducts] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false); // to differentiate add vs update

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
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
      fetch(`http://localhost:8080/api/products/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(updatedProduct => {
          setProducts(products.map(prod => (prod.id === updatedProduct.id ? updatedProduct : prod)));
          setShowForm(false);
          setFormData({ productid: null, productname: "", category: "", description: "" });
          setIsUpdate(false);
        })
        .catch(err => console.error(err));
    } else {
      // add call
      fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(newProd => {
          setProducts([...products, newProd]);
          setShowForm(false);
          setFormData({ productid: null, productname: "", category: "", description: "" });
        })
        .catch(err => console.error(err));
    }
  };

  // Open Update form with pre-filled data
  const handleUpdateClick = (Prod) => {
    setFormData(Prod);
    setIsUpdate(true);
    setShowForm(true);
  };

  // Open View popup
  const handleViewClick = (Prod) => {
    setFormData(Prod);
    setShowView(true);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1>Products Master</h1>
        <button style={{height: "40px", width: "280px", backgroundColor: "green", color: "white", marginLeft: "auto", marginTop: "20px", border: "2px solid green", borderRadius: "20px"}}
          onClick={() => {
            setFormData({ productid: null, productname: "", category: "", description: "" });
            setIsUpdate(false);
            setShowForm(true);
          }}
        >
          <IoMdAdd /> Add Product
        </button>
      </div>

      {/* Search Box */}
      <div style={{ height: "150px", width: "100%", border: "2px solid black", borderRadius: "5px" }}>
        <h2 style={{ marginLeft: "25px" }}>Search & Filters</h2>
        <div style={{ display: "flex", gap: "30px", marginLeft: "25px" }}>
          <div style={{ position: "relative", width: "250px" }}>
            <input
              type="text"
              placeholder="Search by name or ID"
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
              placeholder="Search by name or ID"
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
      <h1>List of Products</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", margin: "20px auto" }}>
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.productid}>
              <td>{prod.productid}</td>
              <td>{prod.productname}</td>
              <td>{prod.category}</td>
              <td>{prod.description}</td>
              <td>
                <button
                  style={{ height: "30px", width: "100px", backgroundColor: "#CAFD34", color: "#3C12B2", fontWeight: "bold", border: "1px solid black", borderRadius: "5px", marginRight: "5px" }}
                  onClick={() => handleUpdateClick(prod)}
                >
                  Update
                </button>
                <button
                  style={{ height: "30px", width: "100px", backgroundColor: "#CAFD34", color: "#3C12B2", fontWeight: "bold", border: "1px solid black", borderRadius: "5px", marginRight: "5px" }}
                  onClick={() => handleViewClick(prod)}
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
            <h2>{isUpdate ? "Update Product details" : "Add Product"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="productid" placeholder="Product ID" value={formData.productid} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
              <input type="text" name="productname" placeholder="Product Name" value={formData.productname} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
              <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
              <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
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
            <h2>View Product</h2>
            <p><b>Product ID:</b> {formData.productid}</p>
            <p><b>Product Name:</b> {formData.productname}</p>
            <p><b>Category:</b> {formData.category}</p>
            <p><b>Description:</b> {formData.description}</p>
            <button onClick={() => setShowView(false)} style={{ marginTop: "10px", width: "100%", padding: "10px", borderRadius: "5px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;