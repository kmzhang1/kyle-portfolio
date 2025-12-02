"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

const ResumeContent = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  // Valid tab values
  const validTabs = ["experience", "education", "skills", "about"];
  const initialTab = validTabs.includes(tabParam) ? tabParam : "experience";

  const [activeTab, setActiveTab] = useState(initialTab);

  // Update tab when URL parameter changes
  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const groupedSkills = skills.skillList.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex items-start justify-center xl:justify-start py-12 xl:py-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.1, duration: 0.2, ease: "easeIn" },
        }}
        className="w-full max-w-6xl mx-auto px-6 xl:px-12 h-full"
      >
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col xl:flex-row gap-12 xl:items-start"
        >
          <div className="xl:sticky xl:top-24 xl:min-w-[200px]">
            <TabsList className="flex flex-col w-full gap-2 mx-auto xl:mx-0 bg-transparent">
              <TabsTrigger value="experience" className="w-full justify-start text-sm font-light">Experience</TabsTrigger>
              <TabsTrigger value="education" className="w-full justify-start text-sm font-light">Education</TabsTrigger>
              <TabsTrigger value="skills" className="w-full justify-start text-sm font-light">Skills</TabsTrigger>
              <TabsTrigger value="about" className="w-full justify-start text-sm font-light">About</TabsTrigger>
            </TabsList>
          </div>

          {/* content */}
          <div className="w-full flex-1">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-8 text-left">
                <div>
                  <h3 className="text-2xl font-light mb-2">{experience.title}</h3>
                  <p className="text-sm opacity-60">
                    {experience.description}
                  </p>
                </div>
                <ScrollArea className="h-[600px]">
                  <ul className="space-y-8 pb-4 pr-4">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="border-l-2 pl-6 py-2 transition-colors"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-normal">
                                  {item.position}
                                </h3>
                                <p className="text-sm opacity-60">{item.company}</p>
                              </div>
                              <span className="text-xs opacity-50 whitespace-nowrap">
                                {item.duration}
                              </span>
                            </div>
                            <div className="flex flex-col gap-2 opacity-70 text-sm leading-relaxed">
                              <div>{item.description1}</div>
                              <div>{item.description2}</div>
                              {item.description3 && (
                                <div>{item.description3}</div>
                              )}
                              {item.description4 && (
                                <div>{item.description4}</div>
                              )}
                            </div>
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
              <div className="flex flex-col gap-8 text-left">
                <div>
                  <h3 className="text-2xl font-light mb-2">{education.title}</h3>
                  <p className="text-sm opacity-60">
                    {education.description}
                  </p>
                </div>
                <ScrollArea className="h-[600px]">
                  <ul className="space-y-8 pb-4 pr-4">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="border-l-2 pl-6 py-2 transition-colors"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-normal">
                              {item.institution}
                            </h3>
                            <p className="text-sm opacity-70">
                              {item.position}
                            </p>
                            <p className="text-sm opacity-60">{item.gpa}</p>
                            <span className="text-xs opacity-50">{item.duration}</span>
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
              <div className="flex flex-col gap-8 text-left">
                <div>
                  <h3 className="text-2xl font-light mb-2">{skills.title}</h3>
                  <p className="text-sm opacity-60">
                    {skills.description}
                  </p>
                </div>
                <ScrollArea className="h-[600px]">
                  <div className="pb-4 pr-4 space-y-8">
                    {Object.entries(groupedSkills).map(([category, skills]) => (
                      <div key={category}>
                        <h2 className="text-base font-normal mb-4 opacity-80">{category}</h2>
                        <ul className="flex flex-wrap gap-3">
                          {skills.map((skill, index) => {
                            return (
                              <li
                                key={index}
                                className="flex items-center gap-2 px-3 py-2 rounded-md border transition-colors text-sm opacity-80 hover:opacity-100"
                                style={{ borderColor: 'var(--color-border)' }}
                              >
                                <div className="text-base opacity-70">
                                  {skill.icon}
                                </div>
                                <span className="text-xs">
                                  {skill.name}
                                </span>
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
              className="w-full text-left"
            >
              <div className="flex flex-col gap-8 min-h-[600px]">
                <div>
                  <h3 className="text-2xl font-light mb-2">{about.title}</h3>
                  <p className="text-sm opacity-60">
                    {about.description}
                  </p>
                </div>
                <ul className="space-y-4 max-w-[600px]">
                  {about.info.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b transition-colors"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <span className="text-xs opacity-50 min-w-[100px] pt-1">
                          {item.fieldName}
                        </span>
                        <span className="text-sm">
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
      </motion.div>
    </div>
  );
};

const Resume = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResumeContent />
    </Suspense>
  );
};

export default Resume;
