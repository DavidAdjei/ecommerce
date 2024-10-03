const express = require("express");
const { signin, signUp, isAuth, logout, loginWithGoogle } = require("../Controllers/userController");

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", signin);
router.get("/isAuth", isAuth);
router.get("/google/callback", loginWithGoogle);
router.post("/logout", logout);

module.exports = router;