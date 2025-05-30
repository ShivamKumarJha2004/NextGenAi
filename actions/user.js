"use server";
import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server"


export async function updateUser(data) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const result = await db.$transaction(async (tx) => {
      // find if user exists
      const industryInsights = await tx.industryInsights.findUnique({
        where: { industry: data.industry },
      });

      // if industry does not exist create it with default values - will replace with ai later
      if (!industryInsights) {
        await tx.industryInsights.create({
          data: {
            industry: data.industry,
            salaryRanges: [],
            growthRates: 0,
            demandLevel: "Medium",
            topSkills: [],
            marketOutlook: "Stable",
            keyTrends: [],
            recommendedSkills: [],
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          },
        });
      }

      // update user with industry
      const updateUser = await tx.user.update({
        where: { clerkUserId: userId },
        data: {
          industry: data.industry,
          experiance: data.experiance,
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { updateUser, industryInsights };
    }, {
      timeout: 10000, // <- moved this into correct position as 2nd argument to $transaction
    });

    return result.user;

  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
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
        console.log("Error fetching user onboarding status:", error);
        throw new Error("Failed to fetch user onboarding status");
    }
}

