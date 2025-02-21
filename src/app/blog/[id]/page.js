import Blogcontent from "@/components/Blogcontent";
import Suggested from "@/components/Suggested";

export default function Home({params}) {
  return (
    <main>
      <Blogcontent />
      <Suggested />
    </main>
  );
}
