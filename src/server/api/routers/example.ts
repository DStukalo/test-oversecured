import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { inputSchema } from "~/utils/zodShemas";

export const exampleRouter = createTRPCRouter({
  getAllPersons: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.example.findMany({
        select: {
          surname: true,
          name: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),

  addPerson: publicProcedure
    .input(inputSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.example.create({
          data: {
            surname: input.surname,
            name: input.name,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  updatePerson: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        surname: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.example.update({
          where: {
            id: input.id,
          },
          data: {
            surname: input.surname,
            name: input.name,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.example.delete({ where: { id: input } });
  }),
});
