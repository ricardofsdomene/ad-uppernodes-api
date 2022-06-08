require("dotenv").config();
const express = require("express");
const cors = require("cors");
var path = require("path");
const mongoose = require("mongoose");

fs = require("fs");

const leadRoutes = require("./routes/Lead");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const server = `mongodb+srv://${user}:${password}@0.28cdt.mongodb.net/${database}?retryWrites=true&w=majority`;

const config = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(server, config).then(() => {
  console.log("Database connection successfully!");
});

const port = 5556;

app.use("/images", express.static(path.join(__dirname, "assets")));

app.use(`/lead`, leadRoutes);

app.listen(port, () => {
  console.log("Servidor rodando na porta", port);
});
