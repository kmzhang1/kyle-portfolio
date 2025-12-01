"use client";

import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 ml-2"
      aria-label="Toggle theme"
      style={{ color: 'var(--color-text)' }}
    >
      {theme === "dark" ? (
        <FiSun className="text-lg" />
      ) : (
        <FiMoon className="text-lg" />
      )}
    </button>
  );
};

export default ThemeToggle;
