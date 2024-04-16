import { PostsSkeleton, SinglePostView } from "@/app/_components/posts";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import Image from "next/image";
import { type FC, Suspense } from "react";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const user = await api.profile.getUserByUsername({
    username: params.slug,
  });

  return {
    title: `${user.prettyUsername} Profile`,
    description: "View profile information.",
  };
};

export type Props = {
  params: { slug: string };
};

const ProfileFeed = async (props: { userId: string }) => {
  const posts = await api.post.getPostsByUserId({ userId: props.userId });

  if (posts.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div className="flex flex-col">
      {posts.map((fullPost) => (
        <SinglePostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

const ProfileView: FC<{ username: string }> = async ({ username }) => {
  const user = await api.profile.getUserByUsername({
    username,
  });

  return (
    <>
      <div className="relative h-36 border-b bg-slate-600">
        <Image
          src={user.imageUrl}
          alt={`${user.username}'s profile pic`}
          width={128}
          height={128}
          className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black"
        />
      </div>
      <div className="h-[64px]" />
      <h1 className="p-4 text-2xl font-bold">{`@${user.prettyUsername}`}</h1>
      <div className="w-full border-b border-slate-400" />
      <Suspense fallback={<PostsSkeleton />}>
        <ProfileFeed userId={user.id} />
      </Suspense>
    </>
  );
};

export default async function Page({ params }: Props) {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileView username={params.slug} />
      </Suspense>
    </main>
  );
}
