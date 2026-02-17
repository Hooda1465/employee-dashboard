const express = require("express");
const Employee = require("../models/employee");
const auth = require("../middleware/auth");
const employee = require("../models/employee");

const router = express.Router();

// create
router.post("/", auth, async(req, res)=>{
    try{
        const employee = new Employee({...req.body, user: req.user.id});
        await employee.save();
        res.status(201).json(employee);
    } catch(error){
        res.status(501).json({message:error.message})
    };
});

router.get("/", auth, async (req, res)=>{
const employees = await Employee.find({user: req.user.id});
res.json(employees);
});

router.put("/:id", auth , async (req, res)=>{
    const emp = await Employee.findByIdAndUpdate(
        {_id : req.params.id, user: req.user.id}, req.body, {new : true});
    res.json(emp);

});

router.delete("/:id", auth , async (req, res)=>{
    await Employee.findByIdAndDelete({_id: req.params.id, user: req.user.id});
    res.json({message: "user deleted Successfully"});
});

module.exports = router;