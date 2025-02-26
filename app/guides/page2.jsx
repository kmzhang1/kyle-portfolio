"use client";

//import Articles from "@/components/Articles";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

export const articletypes = [
  {
    num: "01",
    title: "Blogs",
    description: "Random personal stuff.",
    href: "/guides/blogs",
    postsref: "blogs",
  },
  {
    num: "02",
    title: "Notes",
    description: "System design and general programming notes.",
    href: "/guides/notes",
    postsref: "notes",
  },
  {
    num: "03",
    title: "Leetcode",
    description: "Competitive programming or Leetcode algorithms.",
    href: "leetcode",
  },
  {
    num: "04",
    title: "Papers and Articles",
    description: "Stuff I have read recently.",
    href: "papers",
  },
];

const Guides = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {articletypes.map((article, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div
                    className="text-5xl font-extrabold text-outline 
                  text-transparent group-hover:text-outline-hover 
                  transition-all duration-500"
                  >
                    {article.num}
                  </div>
                  <Link
                    href={article.href}
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all
                  duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* title */}
                <h2
                  className="text-[42px] font-bold leading-none text-white 
                group-hover:text-accent transition-all duration-500"
                >
                  {article.title}
                </h2>
                {/* description */}
                <p className="text-white/60">{article.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Guides;
