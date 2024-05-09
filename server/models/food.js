import mongoose from "mongoose";
import { type } from "os";

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    foodTag: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    status: {
        type : String,
        default : 'not_collected'

    },
    recipient: {
        type : String
    },
    phone: {
        type : String
    }
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
