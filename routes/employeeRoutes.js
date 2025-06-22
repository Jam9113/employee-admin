const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


router.post('/', async (req, res) => {
  const { name, department, position } = req.body;
  if (!name || !department || !position) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newEmp = new Employee({ name, department, position });
    await newEmp.save();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add employee' });
  }
});

router.put('/:id', async (req, res) => {
  const { name, department, position } = req.body;    
  if (!name || !department || !position) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    const updatedEmp = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, department, position },
      { new: true }
    );
    if (!updatedEmp) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee updated successfully', employee: updatedEmp });
  } catch (err) {
    res.status(500).json({ message: 'Error updating employee' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
});

module.exports = router;
