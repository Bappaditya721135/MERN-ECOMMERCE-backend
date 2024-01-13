import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "shipping address is required"],
        },
        city: {
            type: String,
            required: [true, "city is required"],
        },
        state: {
            type: String,
            required: [true, "state is required"],
        },
        pinCode: {
            type: Number,
            required: [true, "pin code is required"],
        },
        country: {
            type: String,
            required: [true, "country is required"],
        },
        phoneNo: {
            type: Number,
            required: [true, "phone no is required"],
        }
    },
    orderedItems: [
        {
            name: {
                type: String,
                required: [true, "product name is required"],
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "product id is required"],
            },
            quantity: {
                type: Number,
                required: [true, "quantity is required"],
            },
            price: {
                type: Number,
                required: [true, "price is required"],
            },
            image: {
                type: String,
                required: [true, "product image is required"],
            },
        },
    ],
    paidAt: {
        type: Date,
        required: [true, "paidtime is required"],
    },
    paymentInfo: {
        id: {
            type: String,
            required: [true, "payment id is required"],
        },
        status: {
            type: String,
            required: [true, "payment status is requird"],
        }
    },
    itemsPrice: {
        type: Number,
        required: [true, "items price is requird"],
    },
    taxPrice: {
        type: Number,
        required: [true, "tax price is required"],
    },
    shippingPrice: {
        type: Number,
        required: [true, "shipping price is required"],
    },
    totalPrice: {
        type: Number,
        required: [true, "total price is required"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "user is required"],
    },
    orderStatus: {
        type: String,
        required: [true, "order status is required"],
        default: "processing",
    },
    deleveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


export const Order = mongoose.model("Orders", orderSchema);