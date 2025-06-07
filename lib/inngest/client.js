import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "nexGenai", name: "nexGenai",
    credential:{
        gemini:{
            apiKey:process.env.GOOGLE_API_KEY,
        }
    }
 });
