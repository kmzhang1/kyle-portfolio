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
  title: "about me",
  description: "live for yourself, not others.",
  info: [
    {
      fieldName: "name",
      fieldValue: "kyle ming zhang",
    },
    {
      fieldName: "phone",
      fieldValue: "(+1) 669 226 8281",
    },
    {
      fieldName: "experience",
      fieldValue: "2+ years",
    },
    {
      fieldName: "email",
      fieldValue: "kylemzhang@gmail.com",
    },
    {
      fieldName: "nationality",
      fieldValue: "asian",
    },
    {
      fieldName: "languages",
      fieldValue: "english, chinese (professional)",
    },
  ],
};

// experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "my experience",
  description: "either you run the day, or the day runs you.",
  items: [
    {
      company: "revola ai",
      position: "founding ai engineer",
      duration: "mar 2025 - present",
      description1:
        "• engineered a real-time, multi-agent meeting infrastructure capable of sustaining 1,000+ concurrent autonomous conversations, driving a 12% increase in client website traffic to demo bookings",
      description2:
        "• architected and deployed a continual learning system that automatically analyzes and persists meeting context, resulting in a 31% increase in prospect return rates, and built a corresponding analytics dashboard (react, typescript) for performance tracking",
      description3:
        "• secured first enterprise customers by designing and implementing scalable python onboarding services, which automated knowledge base ingestion, faiss index generation, and customized agent setup",
      description4:
        "• tripled company website traffic to account creations by developing a genai-powered website scraper, auditing, and scoring system (python/google genai sdk) and integrating the system with crm platforms (hubspot, zoho) to streamline qualified lead management",
    },
    {
      company: "santa clara university",
      position: "hci research lead",
      duration: "sept 2024 - jun 2025",
      description1:
        "• full-stack development for app scraping smar research web tool; tripled site load capacity and built restful apis to enable easy-to-use search and querying functionalities, ensuring 99% uptime for 200+ concurrent users",
      description2:
        "• spearheaded model development for an adaptive ui browser extension aiming to predict user intent for youtube; experimented with rag systems, prompt engineering, and fusion models",
    },
    {
      company: "thales",
      position: "software engineering intern",
      duration: "jan 2022 - jul 2022",
      description1:
        "• led a team of 4 engineer interns to investigate and integrate third-party services on test servers to enable a fluid microservice environment, enhancing overall interoperability infrastructure",
      description2:
        "• utilized docker, kubernetes, dapr, and bash scripting to execute technical solutions on four different platforms",
    },
  ],
};

// education data
const education = {
  icon: "/assets/resume/cap.svg",
  title: "my education",
  description:
    "the beautiful thing about learning is nobody can take it away from you.",
  items: [
    {
      institution: "santa clara university",
      position: "m.s. computer science and engineering",
      degree: "masters",
      duration: "sept 2023 - mar 2025",
      gpa: "gpa: 3.75/4.00",
    },
    {
      institution: "university of california, irvine",
      position: "b.s. computer engineering",
      degree: "bachelors",
      duration: "sept 2020 - jun 2022",
      gpa: "gpa: 3.86/4.00",
    },
  ],
};

// skills
const skills = {
  title: "my skills",
  description: "the expert in anything was once a beginner.",
  skillList: [
    // Languages
    {
      icon: <FaPython />,
      name: "python",
      category: "languages",
      type: "backend",
    },
    {
      icon: <SiC />,
      name: "c",
      category: "languages",
      type: "backend",
    },
    {
      icon: <SiCplusplus />,
      name: "c++",
      category: "languages",
      type: "backend",
    },
    {
      icon: <FaJava />,
      name: "java",
      category: "languages",
      type: "backend",
    },
    {
      icon: <FaJs />,
      name: "javascript",
      category: "languages",
      type: "frontend",
    },
    {
      icon: <SiTypescript />,
      name: "typescript",
      category: "languages",
      type: "frontend",
    },
    {
      icon: <FaHtml5 />,
      name: "html",
      category: "languages",
      type: "frontend",
    },
    {
      icon: <FaCss3 />,
      name: "css",
      category: "languages",
      type: "frontend",
    },
    {
      icon: <TbSql />,
      name: "sql",
      category: "languages",
      type: "backend",
    },
    {
      icon: <SiGnubash />,
      name: "bash",
      category: "languages",
      type: "backend",
    },
    // Frameworks
    {
      icon: <SiPytorch />,
      name: "pytorch",
      category: "frameworks",
      type: "ai",
    },
    {
      icon: <SiTensorflow />,
      name: "tensorflow",
      category: "frameworks",
      type: "ai",
    },
    {
      icon: <FaReact />,
      name: "react.js",
      category: "frameworks",
      type: "frontend",
    },
    {
      icon: <SiFastapi />,
      name: "fastapi",
      category: "frameworks",
      type: "backend",
    },
    {
      icon: <SiExpress />,
      name: "express",
      category: "frameworks",
      type: "backend",
    },
    {
      icon: <SiNextdotjs />,
      name: "next.js",
      category: "frameworks",
      type: "frontend",
    },
    {
      icon: <SiLangchain />,
      name: "langchain",
      category: "frameworks",
      type: "ai",
    },
    {
      icon: <SiLangchain />,
      name: "langgraph",
      category: "frameworks",
      type: "ai",
    },
    {
      icon: <SiGooglegemini />,
      name: "google genai sdk",
      category: "frameworks",
      type: "ai",
    },
    // Developer Tools
    {
      icon: <FaNodeJs />,
      name: "node.js",
      category: "developer tools",
      type: "backend",
    },
    {
      icon: <SiDocker />,
      name: "docker",
      category: "developer tools",
      type: "devops",
    },
    {
      icon: <SiKubernetes />,
      name: "kubernetes",
      category: "developer tools",
      type: "devops",
    },
    {
      icon: <FaGithub />,
      name: "git",
      category: "developer tools",
      type: "devops",
    },
    {
      icon: <DiRedis />,
      name: "redis",
      category: "developer tools",
      type: "backend",
    },
    {
      icon: <DiMongodb />,
      name: "mongodb",
      category: "developer tools",
      type: "backend",
    },
    {
      icon: <SiDjango />,
      name: "django",
      category: "developer tools",
      type: "backend",
    },
    {
      icon: <SiPostgresql />,
      name: "postgresql",
      category: "developer tools",
      type: "backend",
    },
    {
      icon: <SiMysql />,
      name: "mysql",
      category: "developer tools",
      type: "backend",
    },
    {
      icon: <FaGithub />,
      name: "merge",
      category: "developer tools",
      type: "backend",
    },
    // Cloud
    {
      icon: <SiAmazons3 />,
      name: "aws ec2",
      category: "cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "aws ecs fargate",
      category: "cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "aws s3",
      category: "cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "aws sqs",
      category: "cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "aws elasticache",
      category: "cloud",
      type: "devops",
    },
    {
      icon: <SiAwslambda />,
      name: "aws lambda",
      category: "cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "aws cloudwatch",
      category: "cloud",
      type: "devops",
    },
    {
      icon: <SiAmazons3 />,
      name: "pinecone",
      category: "cloud",
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
import Timeline from "@/components/Timeline";

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
              <TabsTrigger
                value="experience"
                className="w-full justify-start text-sm font-light"
              >
                experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="w-full justify-start text-sm font-light"
              >
                education
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="w-full justify-start text-sm font-light"
              >
                skills
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="w-full justify-start text-sm font-light"
              >
                about
              </TabsTrigger>
            </TabsList>
          </div>

          {/* content */}
          <div className="w-full flex-1">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-8 text-left">
                <div>
                  <p className="text-sm opacity-60">{experience.description}</p>
                </div>
                <ScrollArea className="h-[600px]" id="experience-scroll">
                  <div className="pb-4 pr-4 max-w-3xl">
                    <Timeline
                      items={experience.items}
                      scrollContainerId="experience-scroll"
                    />
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-8 text-left">
                <div>
                  <p className="text-sm opacity-60">{education.description}</p>
                </div>
                <ScrollArea className="h-[600px]">
                  <ul className="space-y-8 pb-4 pr-4">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="border-l-2 pl-6 py-2 transition-colors"
                          style={{ borderColor: "var(--color-border)" }}
                        >
                          <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-normal">
                              {item.institution}
                            </h3>
                            <p className="text-sm opacity-70">
                              {item.position}
                            </p>
                            <p className="text-sm opacity-60">{item.gpa}</p>
                            <span className="text-xs opacity-50">
                              {item.duration}
                            </span>
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
                  <p className="text-sm opacity-60">{skills.description}</p>
                </div>
                <ScrollArea className="h-[600px]">
                  <div className="pb-4 pr-4 space-y-8">
                    {Object.entries(groupedSkills).map(([category, skills]) => (
                      <div key={category}>
                        <h2 className="text-base font-normal mb-4 opacity-80">
                          {category}
                        </h2>
                        <ul className="flex flex-wrap gap-3">
                          {skills.map((skill, index) => {
                            return (
                              <li
                                key={index}
                                className="flex items-center gap-2 px-3 py-2 rounded-md border transition-colors text-sm opacity-80 hover:opacity-100"
                                style={{ borderColor: "var(--color-border)" }}
                              >
                                <div className="text-base opacity-70">
                                  {skill.icon}
                                </div>
                                <span className="text-xs">{skill.name}</span>
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
            <TabsContent value="about" className="w-full text-left">
              <div className="flex flex-col gap-8 min-h-[600px]">
                <div>
                  <p className="text-sm opacity-60">{about.description}</p>
                </div>
                <ul className="space-y-4 max-w-[600px]">
                  {about.info.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b transition-colors"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        <span className="text-xs opacity-50 min-w-[100px] pt-1">
                          {item.fieldName}
                        </span>
                        <span className="text-sm">{item.fieldValue}</span>
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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          loading...
        </div>
      }
    >
      <ResumeContent />
    </Suspense>
  );
};

export default Resume;
