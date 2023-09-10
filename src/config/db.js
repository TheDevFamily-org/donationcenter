import { set, connect } from "mongoose";
import { MONGO_URI } from "../config/config.js";
set("strictQuery", true);

// creating connection with MongoDB
connect(MONGO_URI)
  .then(() => {
    console.log("Database Connection is done...");
  })
  .catch((err) => {
    console.log(err);
  });
