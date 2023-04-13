import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const parcelRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.parcel.findMany();
  }),
  getAllByStatus: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.parcel.findMany({ where: { status: input } });
  }),
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.parcel.findFirst({ where: { id: input } });
  }),
  getAllByClientId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.parcel.findMany({ where: { clientId: input } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        // deliveredAt: z.string().datetime(),
        clientId: z.string(),
        // status: z.string(),
        shippedFrom: z.string(),
        shippedTo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.parcel.create({
        data: {
          // deliveredAt: input.deliveredAt,
          clientId: input.clientId,
          // status: input.status,
          shippedFrom: input.shippedFrom,
          shippedTo: input.shippedTo,
        },
      });
    }),
});
