import type { FC } from "react";
import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import type { AppRouterOutput } from "@/server/api/root";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filterUsernameForClient } from "@/server/api/routers/post";

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
          <span className="align-text-bottom text-slate-300">{`@${author.username}`}</span>
          <div className="px-2">·</div>
          <span className="font-thin text-slate-400">
            {dayjs(post.createdAt).fromNow()}
          </span>
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

export const CreatePostWizard = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return null;
  }

  return (
    <div className="flex w-full gap-3 p-8">
      <ProfileImage
        imageUrl={user.imageUrl}
        username={filterUsernameForClient(user)}
      />
      <input
        placeholder="Type some emojis"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

export const ProfileImage: FC<{
  imageUrl: string;
  username: string | null;
}> = ({ imageUrl, username }) => {
  return (
    <Image
      src={imageUrl}
      alt={`@${username} Profile Image`}
      className="rounded-full"
      width={50}
      height={50}
    />
  );
};
