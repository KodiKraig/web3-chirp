import { PostsSkeleton, SinglePostView } from "@/app/_components/posts";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const fullPost = await api.post.getById({ id: params.id });

  return {
    title: `${fullPost?.post.content} - @${fullPost?.author.prettyUsername}`,
    description: "View post information.",
  };
};

export type Props = {
  params: { id: string };
};

const ViewPostContent = async ({ params }: Props) => {
  const fullPost = await api.post.getById({ id: params.id });

  if (!fullPost) {
    return <div>Post not found</div>;
  }

  return <SinglePostView {...fullPost} />;
};

const SinglePostPage = async (props: Props) => {
  return (
    <>
      <Suspense fallback={<PostsSkeleton />}>
        <ViewPostContent {...props} />
      </Suspense>
    </>
  );
};

export default SinglePostPage;
