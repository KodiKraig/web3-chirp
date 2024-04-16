export const metadata = {
  title: "Sign In",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-black">
      {children}
    </main>
  );
}