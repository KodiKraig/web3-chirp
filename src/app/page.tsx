import { AuthButton } from "@/app/_components/auth";
import { api } from "@/trpc/server";

export default async function Home() {
  const data = await api.post.getAll();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Web3 <span className="text-[hsl(280,100%,70%)]">Chirp</span>
        </h1>
        <AuthButton />
        <div>
          {data.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
