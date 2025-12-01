import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiDownload, FiMail } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-md"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-primary)",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* banner and logo */}
        <div className="flex items-center gap-4 h-full">
          <Link href="/" className="py-4">
            <h1 className="text-2xl font-light tracking-tight">kyle zhang</h1>
          </Link>
        </div>

        {/* desktop nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>

        {/* social buttons and theme toggle */}
        <div className="hidden xl:flex items-center gap-3">
          <a
            href="mailto:kylemzhang@gmail.com"
            className="text-sm font-light opacity-60 hover:opacity-100 transition-opacity duration-300"
            style={{ color: "var(--color-text)" }}
          >
            kylemzhang@gmail.com
          </a>
          <a
            href="https://github.com/kylez56789"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-300"
            style={{ color: "var(--color-text)" }}
          >
            <FaGithub className="text-lg" />
          </a>
          <a
            href="https://www.linkedin.com/in/kyle-zhang-3a6551194/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-300"
            style={{ color: "var(--color-text)" }}
          >
            <FaLinkedinIn className="text-lg" />
          </a>
          <a
            href="/kyle_zhang_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-sm font-light"
            >
              <span className="hidden lg:inline">CV</span>
              <FiDownload className="text-base" />
            </Button>
          </a>
          <ThemeToggle />
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
