import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiDownload, FiMail } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import QuoteCycler from "./QuoteCycler";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-md"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-primary)",
      }}
    >
      <div className="flex items-center justify-between w-full relative">
        {/* Name on absolute left */}
        <div className="flex items-center pl-4">
          {/* banner and logo */}
          <Link href="/" className="py-4">
            <h1 className="text-2xl font-light tracking-tight">kyle zhang</h1>
          </Link>
        </div>

        {/* Nav and Quote cycler centered */}
        <div className="hidden xl:flex items-center gap-16 absolute left-1/2 transform -translate-x-1/2">
          <Nav />
          <QuoteCycler />
        </div>

        {/* theme toggle at absolute right */}
        <div className="hidden xl:flex items-center gap-3 pr-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
