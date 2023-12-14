import express from "express";
import dotenv from "dotenv";
import { connect_DB } from "./config/database.js";
import { productRouter } from "./routes/productRouter.js";

const app = express();


// PATH FOR ENV VARIABLES 
dotenv.config({
    path: "config/config.env",
})


// MIDDLEWARE 
app.use(express.json());
app.use("/api/v1", productRouter);


// CONNECTING TO DATABASE 
connect_DB();

console.log(process.env.MONGODB_URI)


app.listen(process.env.PORT, () => {
    console.log(`server is live on http://localhost:${process.env.PORT}`);
})