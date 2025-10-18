require("dotenv").config();

const express = require("express");
const routes = require("./routes/providerRoutes");

const app = express();

// Middleware global (JSON, logs, etc.)
app.use(express.json());

// Usamos las rutas centralizadas
app.use("/", routes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});