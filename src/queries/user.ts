import { db, eq, User } from "astro:db";

export async function getDBUser(userId: string) {
    const dbUser = await db.select().from(User).where(
        eq(User.clerkUserId, userId),
    ).get();
    return dbUser;
}
