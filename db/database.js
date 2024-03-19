import mongoose from "mongoose";

export const connect_DB = () => {
    mongoose.connect(process.env.MONGODB_URI, {dbName: "MERN-Ecommerce"}).then(data => {
        console.log(`mongodb is connected with ${data.connection.host}`)
    })
}