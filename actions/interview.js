"use server"
import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function genrateQuiz() {
    console.log("Starting quiz generation...");
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    });
    if (!user) throw new Error("User Not Found");

    try {
        console.log("Generating quiz for user:", user.industry);
        const prompt = `
        Generate 10 technical interview questions for a ${user.industry}
        professional ${user.skills?.length ? `with expertise in ${user.skills.join(",")}` : ""}.
        Each question should be multiple choice with 4 options.
        Return the response in this JSON format only, no additional text:

        {
        "questions":[
        {
        "question":"string",
        "options": ["string","string","string","string"],
        "correctAnswer":"string",
        "explanation":"string"
        }
        ]
        }
        `;
        console.log("Sending prompt to AI...");
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log("Raw AI response:", text);
        const cleanedText = text.replace(/```(?:json)?\n?/g, " ").trim();
        const quiz = JSON.parse(cleanedText);
        console.log("Parsed quiz data:", quiz);

        return quiz.questions;
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Failed to generate quiz questions");
    }
}

export async function saveQuiz(data) {
    console.log("Starting saveQuiz with data:", data);
    
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    });
    if (!user) throw new Error("User Not Found");

    console.log("Found user:", user.id);

    const { questions, answers, score } = data;

    const questionResult = questions.map((q, index) => ({
        question: q.question,
        answer: q.correctAnswer,
        userAnswer: answers[index],
        isCorrect: q.correctAnswer === answers[index],
        explanation: q.explanation
    }));

    console.log("Processed question results:", questionResult);

    const wrongAnswer = questionResult.filter((q) => !q.isCorrect);
    let improvementTip = null;

    if (wrongAnswer.length > 0) {
        const wrongQuestionText = wrongAnswer.map((ele) => 
            `Question: "${ele.question}"\nCorrect Answer: "${ele.answer}"\nYour Answer: "${ele.userAnswer}"`
        ).join("\n\n");

        console.log("Wrong answers for improvement tip:", wrongQuestionText);

        const improvementPrompt = `
        The user got the following ${user.industry} technical interview question wrong:
        ${wrongQuestionText}

        Based on these mistakes, provide a concise, specific improvement tip.
        Focus on the knowledge gaps revealed by these wrong answers.
        Keep the response under 2 sentences and make it encouraging.
        Don't explicitly mention the mistakes, instead focus on what to learn/practice.
        `;

        try {
            const result = await model.generateContent(improvementPrompt);
            const response = result.response;
            improvementTip = response.text().trim();
            console.log("Generated improvement tip:", improvementTip);
        } catch (error) {
            console.error("Error generating improvement tip:", error);
        }
    }

    try {
        console.log("Creating assessment in database...");
        const assessment = await db.assessment.create({
            data: {
                userId: user.id,
                quizScore: score,
                questions: questionResult,
                category: "Technical",
                improvementTip
            }
        });
        console.log("Assessment created successfully:", assessment);
        return assessment;
    } catch (error) {
        console.error("Error saving assessment:", error);
        throw new Error("Failed to save quiz result");
    }
}

export async function getAssessment() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    });
    if (!user) throw new Error("User Not Found");

    try {
        const assessment =await db.getAssessment.findMany({
            where :{
                userId: user.id
            },
            orderBy:{
                createdAt:"asc",

            },
        })
        return assessment;
    } catch (error) {
        console.log("error fetching assessment");
        
    }
}
