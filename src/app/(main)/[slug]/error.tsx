"use client"; // Error components must be Client Components

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const path = usePathname();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-8 py-16">
      <h2 className="text-2xl font-bold">Uh oh...</h2>
      <h2 className="font-bold">Unable To Find User</h2>

      <span className="text-red-300">{path.replaceAll("/", "")}</span>

      <button
        className="rounded bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-700"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
