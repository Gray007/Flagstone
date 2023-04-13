import { initTRPC, TRPCError } from "@trpc/server";
import { type Context } from "./context";
// import { clerkClient } from "@clerk/nextjs/server";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
  // if (!ctx.auth.user || ctx.auth.user.privateMetadata['role'] !== 'admin') {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

// const role = await t.middleware(({ next, ctx }) => {
//   if (!ctx.auth.userId) {
//     throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
//   }
//   const user = ctx.auth.userId ? clerkClient.users.getUser(ctx.auth.userId) : null;

//   return next({
//     ctx: {
//       role: null
//     },
//   });
// });

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
// export const adminProcedure = t.procedure.use(role);
