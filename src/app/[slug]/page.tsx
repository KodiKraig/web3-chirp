import { api } from "@/trpc/server";
import { type Metadata } from "next";
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

const ProfileView: FC<{ username: string }> = async ({ username }) => {
  const user = await api.profile.getUserByUsername({
    username,
  });

  return (
    <>
      <h1>{user.id} Profile Page</h1>
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
