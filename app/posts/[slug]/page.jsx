import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { IoHome } from "react-icons/io5";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const postsDirectory = path.join(process.cwd(), "posts");

export async function generateStaticParams() {
  const filesnames = fs.readdirSync(postsDirectory);
  return filesnames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ""),
  }));
}

export default async function Page({ params }) {
  const { slug } = params;
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return (
    <>
      <Link href="/guides">
        <Button
          className="mt-20 mx-20 bg-accent px-6 py-2
            font-semibold rounded-lg text-slate-950"
        >
          <IoHome />
        </Button>
      </Link>
      <div
        className="my-20 px-2 mx-auto prose prose-headings:text-slate-400 prose-p:text-slate-300 prose-ul:text-slate-300 prose-ol:text-slate-300
      prose-li:text-slate-300"
      >
        <MDXRemote source={content} />
      </div>
    </>
  );
}
