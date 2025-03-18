import Hero from '@/components/Hero';
import Main from '@/components/Main';
import Suggested from '@/components/Suggested';

const getBlogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`);
  const data = await res.json();
  return data.success ? data.blogs : [];
};

const Page = async () => {
  const blogs = await getBlogs(); // Fetch data once on the server

  return (
    <div>
      <Hero blogs={blogs} />
      <Main blogs={blogs} />
      <Suggested blogs={blogs} />
    </div>
  );
};

export default Page;
