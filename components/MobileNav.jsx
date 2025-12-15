"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { useState, useEffect } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "projects",
    path: "/projects",
  },
];

const quotes = [
  "if there is one secret of success it lies in the ability to get the other person's point of view and see things from that person's angle as well as from your own.",
  "the best way to predict the future is to create it.",
  "the expert in anything was once a beginner.",
  "if debugging is the process of removing software bugs, then programming must be the process of putting them in.",
];

const MobileNav = () => {
  const pathname = usePathname();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setIsVisible(true);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[28px] opacity-60 hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text)' }} />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between py-12 px-6">
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>

        {/* Header with logo */}
        <div className="flex flex-col gap-8">
          <Link href="/" className="text-center">
            <h1 className="text-2xl font-light tracking-tight">kyle zhang</h1>
            <p className="text-xs opacity-50 mt-1">ai engineer / software developer</p>
          </Link>

          {/* Divider */}
          <div className="w-full h-px opacity-20" style={{ backgroundColor: 'var(--color-border)' }}></div>

          {/* Navigation */}
          <nav className="flex flex-col gap-4">
            {links.map((link, index) => {
              const isActive = link.path === pathname;
              return (
                <Link
                  href={link.path}
                  key={index}
                  className={`relative py-2 px-4 text-base font-light transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-80"
                  }`}
                  style={{
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px]"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    ></div>
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer with quote cycler */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-px opacity-20" style={{ backgroundColor: 'var(--color-border)' }}></div>

          <div className="px-2">
            <p
              className={`text-xs font-light leading-relaxed transition-opacity duration-500 ${
                isVisible ? "opacity-60" : "opacity-0"
              }`}
              style={{ color: 'var(--color-accent)' }}
            >
              {quotes[currentQuoteIndex]}
            </p>
          </div>

          <div className="text-center text-xs opacity-40 font-light">
            © 2025 kyle zhang
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
