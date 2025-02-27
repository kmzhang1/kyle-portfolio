"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaLinux,
  FaGithub,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiCplusplus,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiStreamlit,
  SiFlask,
  SiFastapi,
  SiAmazons3,
  SiNvidia,
  SiAnaconda,
  SiJupyter,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMysql,
  SiApachecassandra,
  SiApachekafka,
  SiExpress,
  SiOpencv,
} from "react-icons/si";

import { DiMongodb, DiRedis } from "react-icons/di";

// about data

const about = {
  title: "About Me",
  description: "Live for yourself, not others.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Kyle Zhang",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+1) 669 226 8281",
    },
    {
      fieldName: "Experience",
      fieldValue: "1 Year",
    },
    {
      fieldName: "Email",
      fieldValue: "kylemzhang@gmail.com",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Asian",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Chinese (Professional)",
    },
  ],
};

// experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My Experience",
  description: "Work hard to play hard.",
  items: [
    {
      company: "SCU Human-Computer Interaction Lab",
      position: "Research Lead",
      duration: "Sept 2024 - Present",
      description1:
        "• Full-stack development for app scraping SMAR research web tool; tripled site load capacity and built RESTful APIs to enable easy-to-use search and querying functionalities",
      description2:
        "• Spearheaded model development for an adaptive UI browser extension aiming to predicting user intent for Youtube; experimented with RAG systems, prompt engineering, and fusion models",
    },
    {
      company: "Thales Group",
      position: "Software Engineer Intern",
      duration: "January 2022 - June 2022",
      description1:
        "• Led a team of 4 engineer interns to investigate and integrate third-party services on test servers to enable a fluid microservice environment, enhancing overall interoperability infrastructure",
      description2:
        "• Utilized VirtualBox, Docker, Kubernetes, DAPR, and Bash scripting to execute technical solutions on four different types of platforms on test servers",
    },
    {
      company: "National Science Foundation",
      position: "Student Researcher",
      duration: "May 2021 - Sept 2021",
      description1:
        "• Collaborated closely with Siemens engineers and UCI researchers; leveraged sklearn and PyTorch library tools to implement data clustering and early stopping for two graph auto-encoder models",
      description2:
        "• Optimized and parallelized Python dataset generator to extract graphical representations from binaries, doubling speed of dataset generation",
    },
  ],
};

// education data
const education = {
  icon: "/assets/resume/cap.svg",
  title: "My Education",
  description: "Where learning begins.",
  items: [
    {
      institution: "Santa Clara University",
      position: "M.S. Computer Science and Engineering",
      degree: "Masters",
      duration: "2023 - March 2025",
    },
    {
      institution: "University of California, Irvine",
      position: "B.S. Computer Engineering",
      degree: "Bachelors",
      duration: "2020 - 2022",
    },
  ],
};

// skills
const skills = {
  title: "My Skills",
  description: "Keep improving everyday.",
  skillList: [
    {
      icon: <FaPython />,
      name: "Python",
      category: "Languages",
    },
    {
      icon: <SiCplusplus />,
      name: "C++",
      category: "Languages",
    },
    {
      icon: <FaJs />,
      name: "Javascript",
      category: "Languages",
    },
    {
      icon: <FaCss3 />,
      name: "CSS",
      category: "Languages",
    },
    {
      icon: <FaHtml5 />,
      name: "HTML5",
      category: "Languages",
    },
    {
      icon: <SiPytorch />,
      name: "Pytorch",
      category: "Frameworks",
    },
    {
      icon: <SiTensorflow />,
      name: "TensorFlow",
      category: "Frameworks",
    },
    {
      icon: <SiOpencv />,
      name: "OpenCV",
      category: "Frameworks",
    },
    {
      icon: <FaReact />,
      name: "React.js",
      category: "Frameworks",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
      category: "Frameworks",
    },
    {
      icon: <SiExpress />,
      name: "Express",
      category: "Frameworks",
    },
    {
      icon: <SiTailwindcss />,
      name: "TailwindCSS",
      category: "Frameworks",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
      category: "Tools",
    },
    {
      icon: <FaJava />,
      name: "Java",
      category: "Languages",
    },
    {
      icon: <SiFastapi />,
      name: "FastAPI",
      category: "Frameworks",
    },
    {
      icon: <SiAmazons3 />,
      name: "AWS",
      category: "Tools",
    },
    {
      icon: <SiDocker />,
      name: "Docker",
      category: "Tools",
    },
    {
      icon: <SiKubernetes />,
      name: "Kubernetes",
      category: "Tools",
    },
    {
      icon: <SiMysql />,
      name: "MySQL",
      category: "Tools",
    },
    {
      icon: <FaGithub />,
      name: "Git",
      category: "Tools",
    },
    {
      icon: <DiMongodb />,
      name: "MongoDB",
      category: "Tools",
    },
  ],
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/*
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";*/

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const Resume = () => {
  const groupedSkills = skills.skillList.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList
            className="flex flex-col w-full max-w-[200px] mx-auto xl:mx-0
          gap-6"
          >
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea>
                  <ul className="grid grid-cols-1 gap-[20px]">
                    {experience.items.map((item, index) => {
                      return (
                        <l1
                          key={index}
                          className="bg-[#232329] h-[160px] py-6 px-10 rounded-xl
                        flex flex-col justify-center items-center lg:items-start
                        gap-1"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl text-center lg:text-left">
                                {item.position}
                              </h3>
                              {/* dot */}
                              <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                              <p className="text-white/60">{item.company}</p>
                            </div>
                            <span className="text-md text-accent">
                              {item.duration}
                            </span>
                          </div>
                          <div className="items-center text-white/60 text-sm">
                            <div>{item.description1}</div>
                            <div>{item.description2}</div>
                          </div>
                        </l1>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea>
                  <ul className="grid grid-cols-1 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <l1
                          key={index}
                          className="bg-[#232329] h-[184px] max-w-[500px] py-6 px-10 rounded-xl
                        flex flex-col justify-center items-center lg:items-start
                        gap-1"
                        >
                          <div className="flex flex-col gap-3">
                            <h3
                              className="text-xl text-center
                            lg:text-left"
                            >
                              {item.institution}
                            </h3>
                            {/* dot */}
                            {/*<span className="w-[6px] h-[6px] rounded-full bg-accent"></span>*/}
                            <p className="text-white/60 text-lg">
                              {item.position}
                            </p>
                            <span className="text-accent">{item.duration}</span>
                          </div>
                        </l1>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <div>
                  {Object.entries(groupedSkills).map(([category, skills]) => (
                    <div key={category} className="mb-8">
                      <h2 className="text-xl font-bold mb-4">{category}</h2>
                      <ul className="grid grid-cols-8 sm:grid-cols-6 md:grid-cols-8 gap-[20px]">
                        {skills.map((skill, index) => (
                          <li
                            key={index}
                            className="flex flex-col items-center justify-center w-[70px]"
                          >
                            <div className="w-[60px] h-[60px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-3xl group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </div>
                            </div>
                            <p className="text-center text-sm mt-1 justify-center">
                              {skill.name}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            {/* about */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 gap-y-6 max-w-[600px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-start"
                      >
                        <span className="text-white/60 min-w-[120px] text-left">
                          {item.fieldName}
                        </span>
                        <span className="text-xl text-right">
                          {item.fieldValue}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
