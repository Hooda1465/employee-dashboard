const express = require("express");
const Employee = require("../models/employee");
const auth = require("../middleware/auth");
const employee = require("../models/employee");

const router = express.Router();

// create
router.post("/", auth, async(req, res)=>{
    try{
        const{name, email, position, salary} = req.body;

        const employee = new Employee({
            name, 
            email, 
            position, 
            salary, 
            user: req.user.id,
        });
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
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const {name, email, position, salary}= req.body;

    const emp = await Employee.findOneAndUpdate(
        {_id : req.params.id, user: req.user.id}, {name, email, position, salary}, {new : true, runValidators: true});
         
    if(!emp){
            return res.status(404).json({message:"Employee not found"});
        }

    res.json(emp);

    }catch(error){
        res.status(500).json({message:"Server Error"});

    }

    

});

router.delete("/:id", auth , async (req, res)=>{
    try{
 const employee = await Employee.findOneAndDelete({_id: req.params.id, user: req.user.id});
    res.json({message: "user deleted Successfully"});

    if(!employee){
        return res.status(404).json({message:"Employee not found"})
    }

    }catch(error){
        res.status(500).json({message: "Server Error"});


    }
   

});

module.exports = router;