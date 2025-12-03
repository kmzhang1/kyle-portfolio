"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/lib/projectsData";
import {
  FaChartBar,
  FaBrain,
  FaPalette,
  FaLayerGroup,
  FaRobot,
} from "react-icons/fa";

// Category icon mapping with react-icons and pastel colors
const getCategoryIcon = (category) => {
  const iconConfig = {
    "DATA VISUALIZATION": { icon: FaChartBar, color: "#93c5fd" }, // pastel blue
    "DEEP LEARNING": { icon: FaBrain, color: "#c4b5fd" }, // pastel purple
    "WEB DESIGN": { icon: FaPalette, color: "#f9a8d4" }, // pastel pink
    FULLSTACK: { icon: FaLayerGroup, color: "#6ee7b7" }, // pastel green
    "FULLSTACK/DL": { icon: FaRobot, color: "#fcd34d" }, // pastel amber
  };
  return iconConfig[category] || { icon: FaLayerGroup, color: "#9ca3af" };
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="group relative overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-transparent hover:border-accent/50 transition-all duration-300 h-[200px]">
          {/* Project Image */}
          <div className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Title - Top Left */}
            <div className="absolute top-3 left-3 z-10">
              <h3 className="text-base font-bold text-white drop-shadow-lg">
                {project.title}
              </h3>
            </div>

            {/* Category Icon - Top Right */}
            <div className="absolute top-3 right-3 z-10">
              {(() => {
                const { icon: Icon, color } = getCategoryIcon(project.category);
                return (
                  <Icon className="w-6 h-6 drop-shadow-lg" style={{ color }} />
                );
              })()}
            </div>

            {/* Hover Overlay with Description */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-center p-4">
              <p className="text-white text-xs leading-relaxed mb-3">
                {project.shortDescription}
              </p>

              {/* Tech Stack */}
              {project.metadata && (
                <div className="flex flex-wrap gap-1.5">
                  {(() => {
                    const allTechs = Object.values(project.metadata)
                      .flat()
                      .filter((item) => typeof item === "string")
                      .slice(0, 4);
                    return allTechs.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white border border-white/20"
                      >
                        {tech}
                      </span>
                    ));
                  })()}
                </div>
              )}

              {/* View Arrow */}
              <div className="absolute bottom-3 right-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CategoryLegend = () => {
  const categories = [
    { name: "data visualization", Icon: FaChartBar, color: "#93c5fd" },
    { name: "deep learning", Icon: FaBrain, color: "#c4b5fd" },
    { name: "web design", Icon: FaPalette, color: "#f9a8d4" },
    { name: "full stack", Icon: FaLayerGroup, color: "#6ee7b7" },
    { name: "ai/ml hybrid", Icon: FaRobot, color: "#fcd34d" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-lg p-3"
    >
      <h3 className="text-xs font-semibold text-black/70 dark:text-white/70 mb-2 tracking-wider">
        categories
      </h3>
      <div className="space-y-1.5">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <cat.Icon className="w-5 h-5" style={{ color: cat.color }} />
            <span className="text-xs text-black/70 dark:text-white/70">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.1, duration: 0.2, ease: "easeIn" },
      }}
      className="min-h-[80vh] py-12 xl:py-16"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl xl:text-4xl font-bold"
          >
            <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
              projects
            </span>
          </motion.h1>
        </div>

        {/* Content with Grid and Legend */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Projects Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projectsData.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>

          {/* Legend - Right Side */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <CategoryLegend />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
