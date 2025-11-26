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
  SiNextdotjs,
  SiCplusplus,
  SiTensorflow,
  SiPytorch,
  SiFastapi,
  SiAmazons3,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMysql,
  SiExpress,
  SiTypescript,
  SiC,
  SiLangchain,
  SiGnubash,
  SiDjango,
  SiAwslambda,
  SiGooglegemini,
} from "react-icons/si";

import { DiMongodb, DiRedis } from "react-icons/di";
import { TbSql } from "react-icons/tb";

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
      fieldValue: "2+ Years",
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
      company: "Revola AI",
      position: "Founding AI Engineer",
      duration: "Mar 2025 - Present",
      description1:
        "• Engineered a real-time, multi-agent meeting infrastructure capable of sustaining 1,000+ concurrent autonomous conversations, driving a 12% increase in client website traffic to demo bookings",
      description2:
        "• Architected and deployed a continual learning system that automatically analyzes and persists meeting context, resulting in a 31% increase in prospect return rates, and built a corresponding Analytics Dashboard (React, TypeScript) for performance tracking",
      description3:
        "• Secured first enterprise customers by designing and implementing scalable Python onboarding services, which automated knowledge base ingestion, FAISS index generation, and customized agent setup",
      description4:
        "• Tripled company website traffic to account creations by developing a GenAI-powered website scraper, auditing, and scoring system (Python/Google GenAI SDK) and integrating the system with CRM platforms (Hubspot, Zoho) to streamline qualified lead management",
    },
    {
      company: "Santa Clara University",
      position: "HCI Research Lead",
      duration: "Sept 2024 - Jun 2025",
      description1:
        "• Full-stack development for app scraping SMAR research web tool; tripled site load capacity and built RESTful APIs to enable easy-to-use search and querying functionalities, ensuring 99% uptime for 200+ concurrent users",
      description2:
        "• Spearheaded model development for an adaptive UI browser extension aiming to predict user intent for Youtube; experimented with RAG systems, prompt engineering, and fusion models",
    },
    {
      company: "Thales",
      position: "Software Engineering Intern",
      duration: "Jan 2022 - Jul 2022",
      description1:
        "• Led a team of 4 engineer interns to investigate and integrate third-party services on test servers to enable a fluid microservice environment, enhancing overall interoperability infrastructure",
      description2:
        "• Utilized Docker, Kubernetes, DAPR, and Bash scripting to execute technical solutions on four different platforms",
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
      duration: "Sept 2023 - Mar 2025",
      gpa: "GPA: 3.86/4.00",
    },
    {
      institution: "University of California, Irvine",
      position: "B.S. Computer Engineering",
      degree: "Bachelors",
      duration: "Sept 2020 - Jun 2022",
      gpa: "GPA: 3.75/4.00",
    },
  ],
};

// skills
const skills = {
  title: "My Skills",
  description: "Keep improving everyday.",
  skillList: [
    // Languages
    {
      icon: <FaPython />,
      name: "Python",
      category: "Languages",
      type: "backend",
    },
    {
      icon: <SiC />,
      name: "C",
      category: "Languages",
      type: "backend",
    },
    {
      icon: <SiCplusplus />,
      name: "C++",
      category: "Languages",
      type: "backend",
    },
    {
      icon: <FaJava />,
      name: "Java",
      category: "Languages",
      type: "backend",
    },
    {
      icon: <FaJs />,
      name: "JavaScript",
      category: "Languages",
      type: "frontend",
    },
    {
      icon: <SiTypescript />,
      name: "TypeScript",
      category: "Languages",
      type: "frontend",
    },
    {
      icon: <FaHtml5 />,
      name: "HTML",
      category: "Languages",
      type: "frontend",
    },
    {
      icon: <FaCss3 />,
      name: "CSS",
      category: "Languages",
      type: "frontend",
    },
    {
      icon: <TbSql />,
      name: "SQL",
      category: "Languages",
      type: "backend",
    },
    {
      icon: <SiGnubash />,
      name: "Bash",
      category: "Languages",
      type: "backend",
    },
    // Frameworks
    {
      icon: <SiPytorch />,
      name: "PyTorch",
      category: "Frameworks",
      type: "ai",
    },
    {
      icon: <SiTensorflow />,
      name: "TensorFlow",
      category: "Frameworks",
      type: "ai",
    },
    {
      icon: <FaReact />,
      name: "React.js",
      category: "Frameworks",
      type: "frontend",
    },
    {
      icon: <SiFastapi />,
      name: "FastAPI",
      category: "Frameworks",
      type: "backend",
    },
    {
      icon: <SiExpress />,
      name: "Express",
      category: "Frameworks",
      type: "backend",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
      category: "Frameworks",
      type: "frontend",
    },
    {
      icon: <SiLangchain />,
      name: "LangChain",
      category: "Frameworks",
      type: "ai",
    },
    {
      icon: <SiLangchain />,
      name: "LangGraph",
      category: "Frameworks",
      type: "ai",
    },
    {
      icon: <SiGooglegemini />,
      name: "Google GenAI SDK",
      category: "Frameworks",
      type: "ai",
    },
    // Developer Tools
    {
      icon: <FaNodeJs />,
      name: "Node.js",
      category: "Developer Tools",
      type: "backend",
    },
    {
      icon: <SiDocker />,
      name: "Docker",
      category: "Developer Tools",
      type: "devops",
    },
    {
      icon: <SiKubernetes />,
      name: "Kubernetes",
      category: "Developer Tools",
      type: "devops",
    },
    {
      icon: <FaGithub />,
      name: "Git",
      category: "Developer Tools",
      type: "devops",
    },
    {
      icon: <DiRedis />,
      name: "Redis",
      category: "Developer Tools",
      type: "backend",
    },
    {
      icon: <DiMongodb />,
      name: "MongoDB",
      category: "Developer Tools",
      type: "backend",
    },
    {
      icon: <SiDjango />,
      name: "Django",
      category: "Developer Tools",
      type: "backend",
    },
    {
      icon: <SiPostgresql />,
      name: "PostgreSQL",
      category: "Developer Tools",
      type: "backend",
    },
    {
      icon: <SiMysql />,
      name: "MySQL",
      category: "Developer Tools",
      type: "backend",
    },
    {
      icon: <FaGithub />,
      name: "Merge",
      category: "Developer Tools",
      type: "backend",
    },
    // Cloud
    {
      icon: <SiAmazons3 />,
      name: "AWS EC2",
      category: "Cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "AWS ECS Fargate",
      category: "Cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "AWS S3",
      category: "Cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "AWS SQS",
      category: "Cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "AWS Elasticache",
      category: "Cloud",
      type: "devops",
    },
    {
      icon: <SiAwslambda />,
      name: "AWS Lambda",
      category: "Cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "AWS CloudWatch",
      category: "Cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "Pinecone",
      category: "Cloud",
      type: "ai",
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
      className="min-h-screen flex items-center justify-center xl:justify-start py-12 xl:py-0"
    >
      <div className="w-full px-8 xl:pl-24 xl:pr-16 h-full">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px] xl:items-center"
        >
          <div className="xl:flex xl:items-center xl:min-h-[600px]">
            <TabsList className="flex flex-col w-full max-w-[250px] gap-6 mx-auto xl:mx-0">
              <TabsTrigger value="experience" className="w-[250px]">Experience</TabsTrigger>
              <TabsTrigger value="education" className="w-[250px]">Education</TabsTrigger>
              <TabsTrigger value="skills" className="w-[250px]">Skills</TabsTrigger>
              <TabsTrigger value="about" className="w-[250px]">About Me</TabsTrigger>
            </TabsList>
          </div>

          {/* content */}
          <div className="w-full flex-1">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[600px] pr-6">
                  <ul className="grid grid-cols-1 gap-[20px] pb-4 pr-4">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] py-6 px-10 rounded-xl
                        flex flex-col justify-start items-center lg:items-start
                        gap-3"
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
                            <span className="text-md text-accent whitespace-nowrap">
                              {item.duration}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 text-white/60 text-sm w-full">
                            <div>{item.description1}</div>
                            <div>{item.description2}</div>
                            {item.description3 && (
                              <div>{item.description3}</div>
                            )}
                            {item.description4 && (
                              <div>{item.description4}</div>
                            )}
                          </div>
                        </li>
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
                <ScrollArea className="h-[600px] pr-6">
                  <ul className="grid grid-cols-1 gap-[30px] pb-4 pr-4">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl
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
                            <p className="text-white/60 text-sm">{item.gpa}</p>
                            <span className="text-accent">{item.duration}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* skills */}
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{skills.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {skills.description}
                </p>
                {/* Legend */}
                <div className="flex flex-wrap gap-4 justify-center xl:justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-900/30 border border-purple-500/20 rounded"></div>
                    <span className="text-xs text-white/60">AI/ML</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-900/30 border border-blue-500/20 rounded"></div>
                    <span className="text-xs text-white/60">Frontend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-900/30 border border-green-500/20 rounded"></div>
                    <span className="text-xs text-white/60">Backend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-900/30 border border-orange-500/20 rounded"></div>
                    <span className="text-xs text-white/60">DevOps/Cloud</span>
                  </div>
                </div>
                <ScrollArea className="h-[600px] pr-6">
                  <div className="pb-4 pr-4">
                    {Object.entries(groupedSkills).map(([category, skills]) => (
                      <div key={category} className="mb-6">
                        <h2 className="text-xl font-bold mb-3">{category}</h2>
                        <ul className="grid grid-cols-16 sm:grid-cols-10 md:grid-cols-16 gap-0">
                          {skills.map((skill, index) => {
                            const getColorClass = (type) => {
                              switch(type) {
                                case 'ai':
                                  return 'bg-purple-900/30 border border-purple-500/20';
                                case 'frontend':
                                  return 'bg-blue-900/30 border border-blue-500/20';
                                case 'backend':
                                  return 'bg-green-900/30 border border-green-500/20';
                                case 'devops':
                                  return 'bg-orange-900/30 border border-orange-500/20';
                                default:
                                  return 'bg-[#232329]';
                              }
                            };

                            return (
                              <li
                                key={index}
                                className="flex flex-col items-center"
                              >
                                <div className={`w-[45px] h-[45px] ${getColorClass(skill.type)} rounded-xl flex justify-center items-center group`}>
                                  <div className="text-2xl group-hover:text-accent transition-all duration-300">
                                    {skill.icon}
                                  </div>
                                </div>
                                <p className="text-center text-xs mt-1 h-8 flex items-start justify-center w-[50px]">
                                  {skill.name}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* about */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px] min-h-[600px]">
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
