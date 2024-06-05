const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/userController");

router.get("/users", usercontroller.getUser);
router.post("/add-user", usercontroller.addUser);
router.get(`/users/:id`, usercontroller.getUserById);
router.patch(`/edit-user/:id`, usercontroller.patchUser);
router.delete(`/delete-user/:id`, usercontroller.deleteUser);

module.exports = router;
