import {Router} from 'express';
import { Client } from "@gradio/client"
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const router = Router();


const getChat = async (req, res) => {
    const message = req.body.message;
    if (!message) {
        throw new ApiError(400, "Message is required");
    }
    try {
        const client = await Client.connect("http://127.0.0.1:7860/");
        const result = await client.predict("/chat", { 		
                message: message, 
        });

        return res.status(200).json(
            new ApiResponse(200, result.data, "success")
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error");
    }
}

router.post('/', getChat);

export default router;