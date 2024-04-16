"use server";

import { api } from "@/trpc/server";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";

export interface InitialNewPostState {
  successMsg?: string;
  errorMsg?: string;
  resetKey?: string;
}

export const createNewPost = async (
  state: InitialNewPostState,
  payload: FormData,
): Promise<InitialNewPostState> => {
  try {
    const { post } = await api.post.create({
      content: payload.get("content") as string,
    });

    revalidatePath("/");

    return { resetKey: post.id, successMsg: "Post successfully created!" };
  } catch (e) {
    console.error(`POST ERROR`, e);

    if (e instanceof TRPCError) {
      if (e.code === "BAD_REQUEST") {
        return {
          resetKey: state.resetKey,
          errorMsg: "Invalid post content. You can only use Emojis. 😊",
        };
      }

      return {
        resetKey: state.resetKey,
        errorMsg: e.message,
      };
    }

    return {
      resetKey: state.resetKey,
      errorMsg: "Unable to create post. Please try again.",
    };
  }
};
