import type { Post } from "@prisma/client";
import type { FC } from "react";
import { api } from "@/trpc/server";

export const PostsView: FC = async () => {
  const data = await api.post.getAll();

  return (
    <div>
      {data.map((post) => (
        <SinglePostView key={post.id} {...post} />
      ))}
    </div>
  );
};

export const SinglePostView: FC<Post> = ({ content }) => {
  return <div className="border-b border-slate-400 p-8">{content}</div>;
};

export const PostsSkeleton = () => {
  const postSkeleton = (
    <div className="flex animate-pulse flex-col gap-2 border-b border-slate-400 p-2">
      <div className="h-2 w-1/4 rounded-lg bg-slate-700 p-2"></div>
      <div className="h-2 w-1/2 rounded-lg bg-slate-700 p-2"></div>
      <div className="h-2 w-full rounded-lg bg-slate-700 p-2"></div>
    </div>
  );

  return (
    <>
      {postSkeleton}
      {postSkeleton}
      {postSkeleton}
    </>
  );
};
