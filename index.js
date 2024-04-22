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
import path from "path";


const app = express();




// MIDDLEWARE 
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve("./dist")))

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
    const abPath = path.resolve("./dist/index.html")
    res.sendFile(abPath)
})


app.get("*", (req, res) => {
    const abPath = path.resolve("./dist/index.html")
    res.sendFile(abPath)
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