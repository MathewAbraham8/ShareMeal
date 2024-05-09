import { Router } from "express";
import Food from "../models/food.js";
import User from "../models/user.js";
import mongoose from "mongoose";

const router = Router();

router.get("/allfoods", async (req, res) => {
    const user_type = req.query.user_type;
    const email = req.query.email;

    if (user_type === "reciver") {
        console.log('entered');
        try {
            const allFood = await Food.find();
            res.status(200).json(allFood);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    } else {
        console.log('elsed');
        try {
            const user = await User.findOne({ email });
            const id = user._id
            console.log(id)
            const food = await Food.find({user : user});
            console.log(food)
            res.status(200).json(food);
        } catch(error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    }
});

export default router;
