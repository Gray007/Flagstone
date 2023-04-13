import { clerkClient } from "@clerk/nextjs/server";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return `you can see this secret message!`;
  }),
  getAdmin: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.auth.userId
      ? await clerkClient.users.getUser(ctx.auth.userId)
      : null;

    if (user?.privateMetadata.role == "admin") {
      return true;
    } else {
      return false;
    }
  }),
});
