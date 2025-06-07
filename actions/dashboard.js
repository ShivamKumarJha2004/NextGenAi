"use server"
import { auth, currentUser } from "@clerk/nextjs/server";
import {GoogleGenerativeAI} from "@google/generative-ai";
import { db } from "../lib/prisma";


const genAI=new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model=genAI.getGenerativeModel({model: "gemini-1.5-flash"});

export const generateAiInsights=async(industry)=>
{
    const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "High" | "Medium" | "Low",
      "topSkills": ["skill1", "skill2"],
      "marketOutlook": "Positive" | "Neutral" | "Negative",
      "keyTrends": ["trend1", "trend2"],
      "recommendedSkills": ["skill1", "skill2"]
    }
    
    IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
    Include at least 5 common roles for salary ranges.
    Growth rate should be a percentage.
    Include at least 5 skills and trends.
  `;

  const result=await model.generateContent(prompt);
  const response=result.response;
  const text=response.text();
  const cleanedText=text.replace(/```(?:json)?\n?/g, " ").trim();
  return JSON.parse(cleanedText);



}
    
export const getIndustryInsights = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error("User not authenticated");
        }
        const dbUser = await db.user.findUnique({
            where: { clerkUserId: user.id },
            include: {
                industryInsight: true
            }
        });
        if (!dbUser) {
            throw new Error("User not found");
        }
        if (!dbUser.industryInsight) {
            throw new Error("Industry insights not found");
        }
        return { industryInsights: dbUser.industryInsight };
    } catch (error) {
        console.error("Error fetching industry insights:", error);
        throw error;
    }
}
