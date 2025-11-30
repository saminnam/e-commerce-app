import React from "react";
import GlobalHero from "../../components/GlobalHero";
import BlogsCard from "./BlogsCard";

const BlogPage = () => {
  return (
    <section>
      <GlobalHero title={"✍️ Our Blogs"} />
      <BlogsCard />
    </section>
  );
};

export default BlogPage;
