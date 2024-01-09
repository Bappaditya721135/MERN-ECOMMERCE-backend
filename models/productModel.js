import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "ente a name"],
    },
    discription: {
        type: String,
        required: [true, "enter discription"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        maxlength: [8, "price can not exceed 8 characters"]
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: [true, "name required for reviews"],
            },
            rating: {
                type: Number,
                required: [true, "rating required"],
            },
            comment: {
                type: String,
                required: [true, "comment is required"],
            }
        }
    ],
    ratings: {
        type: Number,
        default: 0,
    },
    
    stocks: {
        type: Number,
        default: 1,
        maxlength: [4, "stocks can not be more than 4"],
        required: [true, "enter product stocks"]
    },
    category: {
        type: String,
        required: [true, "enter a category"]
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const Product = mongoose.model("Product", productSchema);