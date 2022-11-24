const express = require("express");
const app = express();
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db");
const routes = require("./routes");

app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(volleyball);
app.use("/api", routes);

db.sync({ force: false })
  .then(() => {
    app.listen(3001, () => {
      console.log(`Servidor corriendo en el puerto 3001`);
    });
  })
  .catch(console.error);
