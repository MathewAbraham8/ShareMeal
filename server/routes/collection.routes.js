import { Router } from "express";
import Food from "../models/food.js";


const router = Router();

router.post("/collection", async (req, res) => {
    try {
        console.log('enteres')
        console.log(req.body.key)
        const key = req.body.key
        const recipient = req.body.recipient
        const number = req.body.number
        console.log(key)
        // const id = new Food(key);
        const result = await Food.updateOne(
            {
                _id : key
            },
            {
                $set : { 'status' :  'collected' , 'recipient' : recipient , 'phone' : number}  
            }
        );

        if (result.modifiedCount === 1) {
            console.log('Document updated successfully');
            res.status(200).json('updatef');
          } else {
            console.log('Document not found or not updated');
          }
      
    }catch(error) {
        console.error('Error updating document:', error);

    } 

});

export default router;
