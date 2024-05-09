// import { Router } from "express";
// import axios from "axios";
// import Food from "../models/food.js";
// import User from "../models/user.js";

// const router = Router();

// // Route to handle food donation form submission
// router.post("/fooddonation", async (req, res) => {
//     try {
//         // console.log(req)
//         console.log(req.body)
//         const { foodName, foodTag, quantity, expiryDate, address, email, image } = req.body;
//         console.log("ivde image")
//         console.log(image);
//         return ""
//         // const user = await User.findOne({ email });


//         // var formData = new FormData();
//         // formData.append('image',image);

//         // const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//         //     headers: {
//         //         'Content-Type': 'multipart/form-data' // Set the Content-Type header for FormData
//         //     }
            
//         // });
//         // const food = await Food.create({
//         //     foodName,
//         //     quantity,
//         //     expiryDate,
//         //     address,
//         //     foodTag,
//         //     user: user._id,
//         // });

//         // await food.save();
//         // user.food.push(food._id);

//         // res.status(201).json(food);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// export default router;



import { Router } from "express";

import Food from "../models/food.js";
import User from "../models/user.js";

const router = Router();

// Route to handle food donation form submission
router.post("/fooddonation", async (req, res) => {
    try { 
        console.log('1')
        const { foodName, foodTag, quantity, expiryDate, address, email , number} = req.body;
        console.log('2')
        const user = await User.findOne({ email });
        console.log('dfs')
        // Save the form data to the database

        const food = await Food.create({
            foodName,
            quantity,
            expiryDate,
            address,
            foodTag, 
            user: user._id,
            status : 'not_collected',
            recipient : '',
            phone : '',
        });
        console.log('3')
        await food.save();
        user.food.push(food._id);

        res.status(201).json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;