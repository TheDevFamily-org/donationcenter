import express from "express";
import { PORT } from "../src/config/config.js";
import "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import campaignRoute from './routes/campaign.route.js';
import donationRoute from "./routes/donation.route.js";
import subscriptionRoute from "./routes/subscription.route.js";

const app = express();

app.use(cors({origin:"http://localhost:3000", credentials:true}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use('/api/campaign', campaignRoute);
app.use('/api/donation', donationRoute);
app.use("/api/subscription", subscriptionRoute);

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
})

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
