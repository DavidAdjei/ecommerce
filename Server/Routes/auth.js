const express = require("express");
const { signin, signUp, isAuth } = require("../Controllers/userController");

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", signin);
router.get("/isAuth", isAuth)

module.exports = router;