import mongoose from "mongoose";

const DATABASE_URL = "mongodb://localhost:27017/login_jwt";

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});

let db = mongoose.connection;

db.on("error", () => {
  console.log("Failed to connect database");
});

db.once("connected", () => {
  console.log("Database connected");
});
