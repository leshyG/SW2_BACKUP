const express = require("express");
const providerRoutes = require("./providerRoutes");

const router = express.Router();

router.use("/storage", providerRoutes);

module.exports = router;