import { useEffect, useState } from "react";
import api from "../utils/api";   // 👈 axios instance
import "../Dashboard.css";


export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [ShowForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null)

  const [formData, setFormData]= useState({
    name: "",
    email: "",
    position: "",
    salary: "",
  });

  const isFormValid =
  formData.name.trim() &&
  formData.email.trim() &&
  formData.position.trim() &&
  formData.salary;

  const fetchUser = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

 


  const fetchEmployees = async () => {
      try {
        const res = await api.get("/employee");

        setEmployees(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchUser();
    fetchEmployees();
  }, []);
// Handle Input Change
const handleChange= (e) =>{
  setFormData({
    ...formData, 
    [e.target.name]: e.target.value
  });
};



// Add Employee
const handleAdd = async (e) =>{
  e.preventDefault();

  if(
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.position.trim() ||
    !formData.salary.trim() 

  ){
    alert("All field are Required!")
    return;
  }


  try{

    await api.post("/employee", formData);
    setFormData({ name: "", email: "", position: "", salary: "" });
    setShowForm(false);
    fetchEmployees();

  }catch(error){
    console.log(error)
  }

}

// Delete Employee

const handleDelete = async (id)=>{
  
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;   // ❌ Delete cancel

try{

  await api.delete(`/employee/${id}`);
  fetchEmployees();

} catch(error){
console.log(error);
}
};



// Start Edit
const startEdit = (emp) =>{
  setEditId(emp._id);
  setFormData(emp);
  setShowForm(true)
}



// Update Employee
const handleUpdate = async (e)=>{
  e.preventDefault();
   if(
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.position.trim() ||
    !formData.salary.trim() 

  ){
    alert("All field are Required!")
    return;
  }

  try{
    
    await api.put(`/employee/${editId}`, formData);
    setEditId(null);
    setShowForm(false);
    setFormData({ name: "", email: "", position: "", salary: "" });
    fetchEmployees();

  } catch(error){
    console.log(error)
  }
};

 return (
  <div className="dashboard-container">
          <h2 className="title">Employee Dashboard</h2>
     <div className="logout-btn-div">
          <h2>Welcome, {user?.name} </h2>
          <button className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >Logout</button>
      </div>
    
    

    

    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.position}</td>
            <td>₹{emp.salary}</td>
            <td>
              <button
                className="edit-btn"
                onClick={() => startEdit(emp)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(emp._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {ShowForm && (
      <form
        className="employee-form"
        onSubmit={editId ? handleUpdate : handleAdd}
      >
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          required
        />
        <input
          name="salary"
          placeholder="Salary"
          type="number"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn" disabled={!isFormValid}>
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    )}
    
        <div className="add-btn-div">
            <button
            className={`add-btn ${ShowForm ? "close-mode" : ""}`}
            onClick={() => {
              if (ShowForm) {
                setShowForm(false);
              } else {
                setShowForm(true);
                setEditId(null);
                setFormData({
                  name: "",
                  email: "",
                  position: "",
                  salary: "",
                });
              }
            }}
          >
            {ShowForm ? "✖ Close Form" : "+ Add New Employee"}
          </button>
        </div>
  </div>
);
}
