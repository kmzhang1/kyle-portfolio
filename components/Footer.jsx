"use client";

import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer
      className="w-full border-t transition-colors duration-300"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Mobile layout: stacked */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0">
          {/* Social links - left on desktop, top on mobile */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
            <a href="/Kyle_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-xs sm:text-sm font-light"
              >
                <span className="hidden sm:inline">resume/cv</span>
                <span className="sm:hidden">cv</span>
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
              className="text-xs sm:text-sm font-light opacity-60 hover:opacity-100 transition-opacity duration-300"
              style={{ color: "var(--color-text)" }}
            >
              kylemzhang@gmail.com
            </a>
          </div>

          {/* Center content */}
          <div className="text-center space-y-1 sm:space-y-2">
            <p className="text-base sm:text-lg font-medium tracking-widest relative inline-block shine-text">
              learn collaborate create
            </p>
            <p className="text-black/50 dark:text-white/50 text-xs sm:text-sm">
              © 2025 Kyle Zhang. All Rights Reserved.
            </p>
          </div>

          {/* Spacer for desktop layout balance */}
          <div className="hidden lg:block w-[200px]"></div>
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
