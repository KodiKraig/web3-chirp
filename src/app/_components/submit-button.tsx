"use client";

import type { FC } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton: FC<{ children?: React.ReactElement }> = ({
  children,
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-4 rounded-lg bg-pink-500 px-4 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
    >
      {children ?? "Submit"}
      {pending && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 animate-spin"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      )}
    </button>
  );
};
