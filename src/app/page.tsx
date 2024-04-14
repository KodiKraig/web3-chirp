import { AuthButton } from "@/app/_components/auth";
import {
  CreatePostWizard,
  PostsSkeleton,
  PostsView,
} from "@/app/_components/posts";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full border-x border-slate-200 md:max-w-2xl">
        <div className="flex flex-col items-center border-b">
          <h1 className="p-8 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Web3 <span className="text-[hsl(280,100%,70%)]">Chirp</span>
          </h1>

          <div className="pb-8">
            <AuthButton />
          </div>

          <CreatePostWizard />
        </div>

        <div className="flex flex-col">
          <Suspense fallback={<PostsSkeleton />}>
            <PostsView />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
