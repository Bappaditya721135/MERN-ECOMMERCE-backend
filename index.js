import express from "express";
import dotenv from "dotenv";
// DATABASE 
import { connect_DB } from "./db/database.js";
// ROUTERS 
import { productRouter } from "./routes/productRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { orderRouter } from "./routes/orderRouter.js";
import { errorHandler } from "./middleware/error.js";
import cookieParser from "cookie-parser";

import cors from "cors";

const app = express();




// MIDDLEWARE 
app.use(express.json());
app.use(cookieParser());
// // THIS IS CORS  in express 
// app.use(cors({
//     origin: "https://startling-bubblegum-cbab19.netlify.app",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
// }))

// PATH FOR ENV VARIABLES 
dotenv.config({
    path: "config/config.env",
})

// ROUTES 
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);

app.use("/api/v1", orderRouter);

// CONNECTING TO DATABASE 
connect_DB();




// UNCAUGHT express error s
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log("shuting down server due to uncaughtExpression error")
    process.exit(1);
})






app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "this is the / page"
    })
})



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