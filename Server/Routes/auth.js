const express = require("express");
const { signin, signUp, isAuth, logout, loginWithGoogle, editImage, editUser, addAddress, getNotifications } = require("../Controllers/userController");
const { upload } = require("../helpers/products");

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", signin);
router.put("/:id", editUser);
router.put("/addAddress/:id", addAddress);
router.put("/uploadImage/:id",upload.single('image'), editImage);
router.get("/isAuth", isAuth);
router.get("/notifications/:userId", getNotifications);
router.get("/google/callback", loginWithGoogle);
router.post("/logout", logout);

module.exports = router;