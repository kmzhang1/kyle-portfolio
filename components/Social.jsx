import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedinIn, FaYoutube, FaTwitter } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/kylez56789" },
  {
    icon: <FaLinkedinIn />,
    path: "https://www.linkedin.com/in/kyle-zhang-3a6551194/",
  },
];

const Social = () => {
  return (
    <div className="container mx-auto flex justify-between items-center mb-1">
      <a
        href="/kyle_zhang_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="outline"
          size="lg"
          className="uppercase flex items-center gap-2"
        >
          Download CV
          <FiDownload className="text-xl" />
        </Button>
      </a>
      <div className="mb-8 xl:mb-0">
        <div className="flex gap-6">
          {socials.map((item, index) => {
            return (
              <a
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                href={item.path}
                className="w-10 h-10 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
              >
                {item.icon}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Social;
