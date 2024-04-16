import type { FC } from "react";
import { api } from "@/trpc/server";
import type { AppRouterOutput } from "@/server/api/root";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ProfileImage } from "@/app/_components/images";
import Link from "next/link";

dayjs.extend(relativeTime);

export const PostsView: FC = async () => {
  const data = await api.post.getAll();

  return (
    <div>
      {data.map((fullPost) => (
        <SinglePostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

type PostWithUser = AppRouterOutput["post"]["getAll"][number];

export const SinglePostView: FC<PostWithUser> = ({ post, author }) => {
  return (
    <div className="flex gap-3 border-b border-slate-400 p-4">
      <ProfileImage imageUrl={author.imageUrl} username={author.username} />
      <div className="flex flex-col">
        <div className="flex">
          <Link href={`@${author.username}`}>
            <span className="align-text-bottom text-slate-300">{`@${author.username}`}</span>
          </Link>
          <div className="px-2">·</div>
          <Link href={`/post/${post.id}`}>
            <span className="font-thin text-slate-400">
              {dayjs(post.createdAt).fromNow()}
            </span>
          </Link>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
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
