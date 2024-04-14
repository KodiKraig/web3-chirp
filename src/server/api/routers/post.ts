import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { delay } from "@/utils";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    await delay();

    return ctx.db.post.findMany();
  }),
});
