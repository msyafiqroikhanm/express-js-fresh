require("dotenv").config();
const router = require("express").Router();

router.get("/", (req, res) => res.send(`${process.env.APP_NAME} App `));

module.exports = router;
