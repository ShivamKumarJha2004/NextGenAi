import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/prisma";

export const checkUser = async () => {
    const { userId } = auth();
    if (!userId) {
        return null;
    }
    try {
        const logedInUser = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });
        if(logedInUser) {
            return logedInUser;
        }
        return null;
    } catch (error) {
        console.error("Error checking user:", error);
        return null;
    }
}
