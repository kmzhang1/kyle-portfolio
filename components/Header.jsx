import Link from "next/link";
import { Button } from "./ui/button";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-2 px-4 flex justify-between items-center text-white bg-pink-50/20">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            kyle z<span className="text-accent">.</span>
          </h1>
        </Link>

        {/* desktop nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>

        {/* social buttons */}
        <div className="hidden xl:flex items-center gap-4">
          <a
            href="https://github.com/kylez56789"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/kyle-zhang-3a6551194/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="/kyle_zhang_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <span className="hidden lg:inline">Download CV</span>
              <FiDownload className="text-lg" />
            </Button>
          </a>
        </div>

        {/* mobile nav*/}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
