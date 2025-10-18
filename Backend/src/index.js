require("dotenv").config();

const express = require("express");
const routes = require("./routes/providerRoutes");

const app = express();

// Middleware global (JSON, logs, etc.)
app.use(express.json());

// Usamos las rutas centralizadas
app.use("/", routes);

app.listen(3000, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:3000`);
});
