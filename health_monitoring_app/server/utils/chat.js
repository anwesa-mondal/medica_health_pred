import {Client} from "@gradio/client";

const client = await Client.connect("http://127.0.0.1:7860/");
        const result = await client.predict("/chat", { 		
                message: message, 
        });

print(result.data);