const express = require("express");

const authControllers = require("../controllers/authControllers");

const router = new express.Router();

// sample API
router.get("/api", authControllers.api);

// Register api
router.post("/api/register-user", authControllers.register);

// Login api
router.post("/api/login", authControllers.login);

// Update password api
router.put("/api/update-password", authControllers.updatePassword);

// Delete account api
router.delete("/api/delete-account", authControllers.deleteAccount);

module.exports = router;
