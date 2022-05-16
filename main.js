import express from "express";
import cors from "cors";

import "./config/database.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`App running in PORT ${PORT}`);
});
