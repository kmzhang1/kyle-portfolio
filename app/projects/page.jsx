"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide, SwiperSlider } from "swiper/react";
import SwiperCore from "swiper/core";
import "swiper/css";

import { BsArrowUpRight, BsGit, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "Deep Learning",
    title: "EEG2Tempi",
    description: "Predicting Music Tempi from EEG",
    stack: [{ name: "Python" }, { name: "Pytorch" }, { name: "MNE" }],
    image: "/assets/work/eeg2tempi.png",
    live: "",
    github: "",
  },
  {
    num: "02",
    category: "Deep Learning",
    title: "MINDSIGHT",
    description:
      "Making Intelligible Decompiled Source by Imposing Homomorphic Transforms",
    stack: [
      { name: "Python" },
      { name: "Pytorch" },
      { name: "Ghidra" },
      { name: "scikit" },
    ],
    image: "/assets/work/mindsight.png",
    live: "",
    github: "",
  },
  {
    num: "03",
    category: "Web Design",
    title: "Portfolio",
    description: "Showcasing My Work and Skills",
    stack: [{ name: "Next.js" }, { name: "Tailwind" }, { name: "Javascript" }],
    image: "/assets/work/thumb1.png",
    live: "",
    github: "",
  },
  {
    num: "04",
    category: "Data Visualization",
    title: "Toxic Awareness",
    description: "A Visualization of California Toxic Levels",
    stack: [{ name: "Next.js" }, { name: "Tailwind" }, { name: "Javascript" }],
    image: "/assets/work/toxicsustain.png",
    live: "",
    github: "",
  },
  {
    num: "05",
    category: "Fullstack/DL",
    title: "FocusMode",
    description: "this is project 2",
    stack: [{ name: "Next.js" }, { name: "Tailwind" }, { name: "Javascript" }],
    image: "/assets/work/thumb2.png",
    live: "",
    github: "",
  },
  {
    num: "06",
    category: "Fullstack",
    title: "SMAR",
    description: "this is project 2",
    stack: [{ name: "React.js" }, { name: "Express.js" }, { name: "Node.js" }],
    image: "/assets/work/smar.png",
    live: "",
    github: "",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;

    setProject(projects[currentIndex]);
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          {/* project text description */}
          <motion.div
            key={project.num}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full xl:w-[50%] xl:h-[460px] flex flex-col
          xl:justify-between order-2 xl:order-none"
          >
            <div className="flex flex-col gap-[30px] h-50">
              {/* outline num */}
              <div className="leading-none font-extrabold">
                <div className="flex items-baseline gap-4">
                  <span className="text-7xl text-transparent text-outline">
                    {project.num}
                  </span>
                  <span className="text-5xl bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                    {project.title}
                  </span>
                </div>
              </div>
              {/* project category */}
              <div className="inline-flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <h2 className="text-[30px] font-bold leading-none capitalize bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {project.category} project
                </h2>
              </div>
              {/* project description */}
              <p className="text-black/70 dark:text-white/70 text-lg leading-relaxed">{project.description}</p>
              {/* stack */}
              <ul className="flex flex-wrap gap-3">
                {project.stack.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20
                      text-accent hover:bg-accent/20 hover:border-accent/40
                      transition-all duration-300 text-sm font-medium backdrop-blur-sm"
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
              {/* border */}
              <div className="border-t border-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live demo */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger
                        className="w-[70px] h-[70px] rounded-full
                      bg-white/5 hover:bg-white/10 backdrop-blur-sm
                      flex justify-center items-center group
                      border border-white/10 hover:border-accent/50
                      transition-all duration-300 hover:scale-110"
                      >
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Demo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* github link */}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger
                        className="w-[70px] h-[70px] rounded-full
                      bg-white/5 hover:bg-white/10 backdrop-blur-sm
                      flex justify-center items-center group
                      border border-white/10 hover:border-accent/50
                      transition-all duration-300 hover:scale-110"
                      >
                        <BsGithub className="text-white text-3xl group-hover:text-accent transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </motion.div>
          {/* swiper */}
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              keyboard={{ enabled: true }}
              direction="horizontal"
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center
                      bg-gradient-to-br from-accent/5 via-transparent to-accent-hover/5
                      rounded-xl overflow-hidden border border-white/10
                      hover:border-accent/30 transition-all duration-500">
                      {/* gradient overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full
                        bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10
                        group-hover:from-black/40 transition-all duration-500"></div>
                      {/* accent glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0
                        group-hover:from-accent/10 group-hover:to-accent-hover/10
                        transition-all duration-500 z-10"></div>
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slider buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)]
              xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent/90 hover:bg-accent backdrop-blur-sm text-white text-[22px]
              w-[44px] h-[44px] flex justify-center items-center transition-all
              rounded-lg border border-white/10 hover:border-white/30 hover:scale-110
              shadow-lg hover:shadow-accent/50"
                iconsStyles="transition-transform group-hover:scale-110"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
