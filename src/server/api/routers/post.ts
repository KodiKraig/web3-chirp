import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { delay } from "@/utils";
import { clerkClient } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

export const filterUsernameForClient = (user: User) => {
  if (user.username) {
    return user.username;
  }

  if (user.web3Wallets?.length === 0) {
    return null;
  }

  const address = user.web3Wallets?.[0]?.web3Wallet;

  if (!address) {
    return null;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: filterUsernameForClient(user),
    imageUrl: user.imageUrl,
  };
};

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

    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
    });

    const users = (
      await clerkClient.users.getUserList({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
    ).map(filterUserForClient);

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);

      if (!author?.username) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Author for post not found",
        });
      }

      return {
        post,
        author: {
          ...author,
          username: author.username,
        },
      };
    });
  }),

  create: privateProcedure
    .input(
      z.object({
        content: z.string().emoji().min(1).max(280),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUser.userId;

      if (!authorId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated",
        });
      }

      const post = await ctx.db.post.create({
        data: {
          authorId,
          content: input.content,
        },
      });

      return {
        post,
      };
    }),
});
