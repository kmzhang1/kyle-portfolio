"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsArrowLeft, BsArrowUpRight, BsGithub } from "react-icons/bs";
import { getProjectBySlug } from "@/lib/projectsData";

export default function ProjectDetail({ params }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen py-8 xl:py-12"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Navigation */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-black/70 dark:text-white/70 hover:text-accent transition-colors mb-6 group"
        >
          <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">works</span>
        </Link>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl xl:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
              {project.title}
            </span>
          </h1>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
            <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20">
              {project.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-black/80 dark:text-white/80 mb-6">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {project.liveUrl && (
              <a
                href={typeof project.liveUrl === 'string' ? project.liveUrl : project.liveUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-accent hover:bg-accent-hover text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-accent/50"
              >
                <span className="font-medium">
                  {typeof project.liveUrl === 'string' ? 'try yourself' : project.liveUrl.text}
                </span>
                <BsArrowUpRight />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 rounded-lg transition-all duration-300"
              >
                <span className="font-medium">github</span>
                <BsGithub />
              </a>
            )}
          </div>
        </motion.div>

        {/* Video or Image Section */}
        {(project.video || project.image) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8 rounded-lg overflow-hidden border border-white/10 shadow-lg max-w-md"
          >
            {project.video ? (
              <video
                controls
                className="w-full aspect-video bg-black"
                poster={project.image}
              >
                <source src={project.video} type="video/mp4" />
                your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto"
              />
            )}
          </motion.div>
        )}

        {/* Metadata and Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          {/* Metadata Section - Left 2/3 */}
          {project.metadata && Object.keys(project.metadata).length > 0 && (
            <div className="lg:col-span-2 space-y-4">
              {Object.entries(project.metadata).map(([key, value]) => (
                <div key={key}>
                  <h3 className="text-xs font-medium text-accent tracking-wider mb-2">
                    {key}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.isArray(value) ? (
                      value.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-black/70 dark:text-white/70"
                        >
                          {item}
                          {idx < value.length - 1 && ","}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-black/70 dark:text-white/70">
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features Section - Right 1/3 */}
          {project.features && project.features.length > 0 && (
            <div className="lg:col-span-1">
              <h2 className="text-sm font-bold mb-3 text-accent">features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs text-black/70 dark:text-white/70"
                  >
                    <span className="text-accent mt-0.5">▸</span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
