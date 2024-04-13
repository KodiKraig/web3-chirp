"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export const AuthButton = () => {
  const user = useUser();

  return (
    <div className="rounded-lg bg-black px-8 py-2 hover:bg-gray-800">
      {!user.isSignedIn && <SignInButton />}
      {!!user.isSignedIn && <SignOutButton />}
    </div>
  );
};
