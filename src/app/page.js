import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Suggested from "@/components/Suggested";

export const metadata = {
  title: "Home - My Blog App",
  description: "Welcome to My Blog App, a modern blog application built with Next.js.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Main />
      <Suggested />
    </main>
  );
}
