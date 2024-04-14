"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export const AuthButton = () => {
  const user = useUser();

  if (!user.isLoaded) return null;

  return (
    <div className="rounded-lg border-b border-slate-400 bg-slate-900 px-8 py-2 hover:bg-gray-800">
      {!user.isSignedIn && <SignInButton />}
      {!!user.isSignedIn && <SignOutButton />}
    </div>
  );
};
