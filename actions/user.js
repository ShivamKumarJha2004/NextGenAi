"use server";
import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server"
import { generateAiInsights } from "./dashboard";

export async function updateUser(data) {
  try {
    // console.log("data", data);
    const { userId } = await auth();
    // console.log("userId", userId);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    if (!db) {
      throw new Error("Database connection not initialized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const formatedIndustry = `${data.industry} - ${data.subIndustry}`.toLowerCase().replace(/\s+/g, "-");

    const result = await db.$transaction(async (tx) => {
      // First, check if industry insights exist
      let industryInsights = await tx.IndustryInsight.findUnique({
        where: { industry: formatedIndustry },
      });

      // If not, create them first
      if (!industryInsights) {
        const insights = await generateAiInsights();
        industryInsights = await tx.IndustryInsight.create({
          data: {
            industry: formatedIndustry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      }

      // Then update the user with the same industry
      const updateUser = await tx.user.update({
        where: { clerkUserId: userId },
        data: {
          industry: formatedIndustry, // Use the same formatted industry
          experiance: data.experiance,
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { updateUser, industryInsights };
    }, {
      timeout: 10000,
    });

    return { success: true, user: result.updateUser };

  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error.message || "Failed to update user");
  }
}

export async function fetchingUserOnboarding() {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("User not authenticated");
  }
  
  try {
    
    const dbUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
      select: {
        industry: true,
      },
    });
    
    return {
      isOnboarded: !!dbUser?.industry,
    };
  } catch (error) {
    throw new Error(`Failed to fetch user onboarding status: ${error.message}`);
  }
}