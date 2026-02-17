
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routers/auth");
const userRoutes =require("./routers/user");
const employeeRoutes = require("./routers/employeeRoutes")
const cors = require("cors");



app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/me", userRoutes);
app.use("/api/employee", employeeRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected!!")
);
app.get("/", (req,res)=>{
    res.send("Backend is Running")
});

const PORT = 5000;

app.listen(PORT, ()=>{
   console.log(`Server Started at port:${PORT}`)
});
