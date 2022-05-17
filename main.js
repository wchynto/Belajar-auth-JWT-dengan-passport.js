import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoute from "./routes/user_route.js";

import "./config/database.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`App running in PORT ${PORT}`);
});
