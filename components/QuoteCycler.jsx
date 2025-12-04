"use client";

import { useState, useEffect } from "react";

const QuoteCycler = () => {
  // TODO: Replace with your actual quotes
  const quotes = [
    "if there is one secret of scuccess it lies in the ability to get the other person's point of view and see things from that person's angle as well as from your own.",
    "The best way to predict the future is to create it.",
    "The expert in anything was once a beginner.",
    "If debugging is the process of removing software bugs , then programming must be the process of putting them in.",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // After fade out, change quote and fade in
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setIsVisible(true);
      }, 800); // Wait for fade out to complete before changing quote
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="flex items-center w-128 max-w-128 flex-shrink-0">
      <div
        className={`text-sm font-medium lowercase transition-opacity duration-700 ease-in-out text-left whitespace-normal break-words ${
          isVisible ? "opacity-60" : "opacity-0"
        }`}
        style={{ color: "var(--color-accent)" }}
      >
        {quotes[currentQuoteIndex]}
      </div>
    </div>
  );
};

export default QuoteCycler;
