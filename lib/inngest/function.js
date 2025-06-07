import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../prisma";
import { inngest } from "./client";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper function to clean industry name
const cleanIndustryName = (name) => {
    return name
        .toLowerCase()
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();
};

export const genrateIndustryInsights = inngest.createFunction(
    {
        name: "Generate Industry Insights"
    },
    {
        cron: "0 0 * * 0"
    },
    async ({ step }) => {
        const industries = await step.run("Fetch industries", async () => {
            const result = await db.IndustryInsight.findMany({
                select: { industry: true }
            });
            return result.map(item => item.industry);
        });

        for (const industry of industries) {
            const cleanIndustry = cleanIndustryName(industry);
            const prompt = `
                Analyze the current state of the ${cleanIndustry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
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

            try {
                const res = await step.ai.wrap("gemini", async (p) => {
                    return await model.generateContent(p);
                }, prompt);

                const text = res.response.candidates[0].content.parts[0].text || "";
                const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
                const insights = JSON.parse(cleanedText);

                await step.run(`Update ${industry} insights`, async () => {
                    await db.IndustryInsight.update({
                        where: { industry },
                        data: {
                            ...insights,
                            lastUpdated: new Date(),
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        },
                    });
                });
            } catch (error) {
                console.error(`Error processing industry ${industry}:`, error);
                // Continue with next industry even if one fails
                continue;
            }
        }
    }
);