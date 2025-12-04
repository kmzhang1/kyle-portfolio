"use client";

import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer
      className="w-full border-t transition-colors duration-300 relative"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Social links on the absolute left of screen */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10">
        <a href="/Kyle_Resume.pdf" target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-sm font-light"
          >
            <span className="hidden lg:inline">resume/cv</span>
            <FiDownload className="text-base" />
          </Button>
        </a>
        <a
          href="https://github.com/kmzhang1"
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
          href="https://www.instagram.com/kaiyohhh/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-300"
          style={{ color: "var(--color-text)" }}
        >
          <FaInstagram className="text-lg" />
        </a>
        <a
          href="mailto:kylemzhang@gmail.com"
          className="text-sm font-light opacity-60 hover:opacity-100 transition-opacity duration-300"
          style={{ color: "var(--color-text)" }}
        >
          kylemzhang@gmail.com
        </a>
      </div>

      {/* Center content */}
      <div className="container mx-auto py-8 flex justify-center items-center">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium tracking-widest relative inline-block shine-text">
            learn collaborate create
          </p>
          <p className="text-black/50 dark:text-white/50 text-sm">
            © 2025 Kyle Zhang. All Rights Reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .shine-text {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.6) 40%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(0, 0, 0, 0.6) 60%,
            rgba(0, 0, 0, 0.6) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s infinite;
        }

        :global(.dark) .shine-text {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.6) 40%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0.6) 60%,
            rgba(255, 255, 255, 0.6) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
