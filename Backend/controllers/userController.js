const connection = require("../utils/db");

const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());


const getUser = async (req, res) => {
  try {
    console.log("Inside getuser");
    const obj = await connection.query("SELECT * FROM appointment_table");
    console.log("Obj in try block of getUser ", obj[0]);
    res.status(200).json(obj[0]);
    
  } catch (err) {
    console.log("Error in getting user in getUser ", getUser);
    res.status(500).send("Failed to fetch users error is ", err);
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const sql = "SELECT * FROM appointment_table WHERE id = ?";
    const result = await connection.query(sql, [userId]);
    if (result[0].length === 0) {
      return res.status(404).send("User not found.");
    }
    res.status(200).json(result[0]);
  } catch (err) {
    console.log("Error in fetching user ", err);
    res.status(500).send("Failed to fetch user.");
  }
};
const addUser = async (req, res) => {
  try {
      // console.log("req.body in adduser ", req.body);
    const { name, email, number } = req.body;
    if (!name || !email || !number)
      return res.status(400).send("All three fields are mandatory ");
    console.log(name, email, number);
    const sql =
      "insert into  appointment_table (name,email,number) VALUES (?,?,?)";
    const result = await connection.query(sql, [name, email, number]);
    console.log("Result in addUser  is ==>", result);
    res.status(201).send(`appointment_table added  with insertId ${result[0].insertId}`);
  } catch (err) {
    console.log("Error in adding user ", err);
    res.status(500).json(result[0]);
  }
};
const patchUser = async (req, res) => {
  try {
    console.log("req.params ", req.params);
    const userId = req.params.id;
    const { name, number, email } = req.body;
    console.log(name, number, email, "in patch ");
    if (!name || !number || !email) {
      return res.status(400).send("All fields are required");
    }
    const sql =
      "update appointment_table set name = ?, number =? , email=? where id = ?";
    const result = await connection.query(sql, [name, number, email, userId]);
    if (result[0].affectedRows === 0) {
      return res.status(404).send("user not found ");
    }
    res.status(200).send(`user with id ${userId} updated successfully`);
  } catch (err) {
    res.status(500).send("Fail to update user ");
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const sql = "delete from appointment_table where id=?";
    const result = await connection.query(sql, [userId]);
    if (result[0].affectedRows == 0) {
      return res.status(404).send("User not found.");
    }
    res.status(200).send(`User with ID: ${userId} deleted successfully.`);
  } catch (err) {
    console.log("Error in deleting user ", err);
    res.status(500).send("Failed to delete user.");
  }
};

module.exports = { getUser, addUser,getUserById,patchUser,deleteUser };
