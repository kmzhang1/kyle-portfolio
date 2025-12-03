"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const TimelineItem = ({ item, index, scrollContainer, isContainerReady }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true); // Start as true
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const container = scrollContainer;

    if (!element || !container || !isContainerReady) return;

    const updateVisibility = () => {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const containerTop = containerRect.top;
      const containerBottom = containerRect.bottom;
      const elementTop = elementRect.top;
      const elementCenter = elementTop + elementRect.height / 2;

      // Check if element is visible in the scroll container
      const visible = elementTop < containerBottom && elementCenter > containerTop;
      setIsVisible(visible);

      // Calculate scroll progress for this element
      if (visible) {
        const totalHeight = containerRect.height;
        const elementPosition = elementCenter - containerTop;
        const progress = Math.max(0, Math.min(1, elementPosition / totalHeight));
        setScrollProgress(progress);
      }
    };

    updateVisibility();
    container.addEventListener('scroll', updateVisibility);
    window.addEventListener('resize', updateVisibility);

    return () => {
      container.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [scrollContainer, isContainerReady]);

  // If container isn't ready yet, keep everything at full visibility
  const opacity = !isContainerReady ? 1 : (isVisible ? 1 : 0.3);
  const scale = !isContainerReady ? 1 : (isVisible ? 1 : 0.95);
  const dotScale = !isContainerReady ? 1 : (isVisible ? 1 : 0.7);
  const glowOpacity = !isContainerReady ? 0 : (scrollProgress > 0.3 && scrollProgress < 0.7 ? 0.3 : 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, scale: 1, x: 0 }}
      animate={{ opacity, scale, x: isVisible ? 0 : -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative pl-10"
    >
      {/* Timeline dot with scroll-based animation */}
      <motion.div
        className="absolute left-0 top-2 -translate-x-1/2 z-10"
        initial={{ scale: 1 }}
        animate={{ scale: dotScale }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-4 h-4 rounded-full border-2 transition-all duration-300"
          animate={{
            boxShadow: glowOpacity > 0
              ? `0 0 0 4px rgba(157, 157, 242, ${glowOpacity})`
              : "0 0 0 0 transparent"
          }}
          style={{
            backgroundColor: "var(--color-primary)",
            borderColor: "var(--color-accent)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="group pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-normal mb-1 transition-colors duration-300 group-hover:opacity-80">
              {item.position}
            </h3>
            <p
              className="text-sm font-light tracking-wide"
              style={{ color: "var(--color-accent)" }}
            >
              {item.company}
            </p>
          </div>
          <span
            className="text-xs whitespace-nowrap opacity-50 font-light"
          >
            {item.duration}
          </span>
        </div>

        <div className="space-y-3 opacity-70 text-sm leading-relaxed font-light">
          {item.description1 && (
            <p className="transition-opacity duration-300 group-hover:opacity-90">
              {item.description1}
            </p>
          )}
          {item.description2 && (
            <p className="transition-opacity duration-300 group-hover:opacity-90">
              {item.description2}
            </p>
          )}
          {item.description3 && (
            <p className="transition-opacity duration-300 group-hover:opacity-90">
              {item.description3}
            </p>
          )}
          {item.description4 && (
            <p className="transition-opacity duration-300 group-hover:opacity-90">
              {item.description4}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Timeline = ({ items, scrollContainerId }) => {
  const containerRef = useRef(null);
  const [scrollContainer, setScrollContainer] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isContainerReady, setIsContainerReady] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure DOM is fully ready
    const timeoutId = setTimeout(() => {
      // Find the scroll container by ID
      const container = document.getElementById(scrollContainerId);
      if (container) {
        // The actual scrollable element is inside the ScrollArea component
        const scrollableElement = container.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollableElement) {
          setScrollContainer(scrollableElement);
          setIsContainerReady(true);

          const updateProgress = () => {
            const scrollTop = scrollableElement.scrollTop;
            const scrollHeight = scrollableElement.scrollHeight - scrollableElement.clientHeight;
            const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            setScrollProgress(progress);
          };

          updateProgress();
          scrollableElement.addEventListener('scroll', updateProgress);

          return () => {
            scrollableElement.removeEventListener('scroll', updateProgress);
          };
        }
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [scrollContainerId]);

  return (
    <div ref={containerRef} className="relative pl-2">
      {/* Vertical line - base line */}
      <div
        className="absolute left-2 top-0 bottom-0 w-[2px]"
        style={{ backgroundColor: "var(--color-border)" }}
      />

      {/* Animated progress line that follows scroll */}
      <motion.div
        className="absolute left-2 top-0 w-[2px] origin-top"
        style={{
          backgroundColor: "var(--color-accent)",
          height: `${scrollProgress * 100}%`,
          opacity: 0.6,
          transition: "height 0.1s ease-out"
        }}
      />

      <div className="space-y-0">
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            index={index}
            scrollContainer={scrollContainer}
            isContainerReady={isContainerReady}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
