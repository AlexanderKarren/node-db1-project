const express = require("express");

const accountRouter = require('./accountRouter.js');
const employeeRouter = require('./employeeRouter.js');

const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter);
server.use("/api/employees", employeeRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });

module.exports = server;