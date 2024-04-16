"use client";

import Image from "next/image";
import type { FC } from "react";

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
