"use client";

import { ProfileImage } from "@/app/_components/images";
import { SubmitButton } from "@/app/_components/submit-button";
import { createNewPost } from "@/server/actions";
import { useUser } from "@clerk/nextjs";
import { useFormState, useFormStatus } from "react-dom";

export const CreatePostWizard = () => {
  const [state, formAction] = useFormState(createNewPost, {});
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const username = user.username ?? user.web3Wallets?.[0]?.web3Wallet;

  const msg = state.errorMsg;
  const isError = state.errorMsg !== undefined;
  const errorColor = isError ? "text-red-300" : "text-green-500";

  return (
    <form
      key={state.resetKey}
      className="flex w-full flex-col items-center gap-3 p-8"
      action={formAction}
    >
      <div className="flex w-full items-center gap-3">
        <ProfileImage
          imageUrl={user.imageUrl}
          username={username ?? "Anonymous"}
        />
        <EmojiInput />
        <SubmitButton>
          <span>Post</span>
        </SubmitButton>
      </div>
      {msg && <p className={`self-center ${errorColor}`}>{msg}</p>}
    </form>
  );
};

const EmojiInput = () => {
  const { pending } = useFormStatus();

  return (
    <input
      name="content"
      placeholder="Type some emojis"
      type="text"
      className="grow bg-transparent outline-none"
      autoComplete="off"
      disabled={pending}
    />
  );
};
