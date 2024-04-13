import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <SignIn appearance={{ baseTheme: dark }} />;
}
