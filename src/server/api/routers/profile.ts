import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { delay } from "@/utils";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { filterUserForClient } from "@/server/helpers/filters";

export const profileRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      await delay(3000);

      const username = decodeURIComponent(input.username);

      const [user] = await clerkClient.users.getUserList({
        username: [username],
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return filterUserForClient(user);
    }),
});
