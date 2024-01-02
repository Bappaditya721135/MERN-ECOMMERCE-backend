import express from "express";
import dotenv from "dotenv";
import { connect_DB } from "./config/database.js";
import { productRouter } from "./routes/productRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

// UNCAUGHT express error s
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log("shuting down server due to uncaughtExpression error")
    process.exit(1);
})



// PATH FOR ENV VARIABLES 
dotenv.config({
    path: "config/config.env",
})


// MIDDLEWARE 
app.use(express.json());
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);


// CONNECTING TO DATABASE 
connect_DB();


const server = app.listen(process.env.PORT, () => {
    console.log(`server is live on http://localhost:${process.env.PORT}`);
})


// UNHANDLED PROMISE REJECTION 
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`)
    console.log("server is shuting down due to unhandled Promise rejection")
    server.close(() => {
        process.exit(1);
    })
})

// GLOBAL ERROR HANDLER 
app.use(errorHandler)