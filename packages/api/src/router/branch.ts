import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const branchRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.branch.findMany();
  }),
  // getAllByStatus: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  //   return ctx.prisma.branch.findMany({ where: { status: input } });
  // }),
  // getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  //   return ctx.prisma.branch.findFirst({ where: { id: input } });
  // }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.branch.create({
        data: {
          name: input.name,
        },
      });
    }),
});
