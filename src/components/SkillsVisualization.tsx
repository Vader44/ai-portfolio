"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ReactIcon, 
  TypeScriptIcon, 
  NextIcon, 
  NodeIcon,
  UIIcon,
  CSSIcon,
  GitIcon,
  DockerIcon,
  AWSIcon,
  CICDIcon,
  ExpressIcon,
  MongoIcon,
  PostgresIcon,
} from "@/components/icons";

// Enhanced skills data with more details
const skillsData = [
  { 
    skill: "React", 
    value: 90,
    description: "Expert in React hooks, context, and performance optimization",
    projects: ["Portfolio Website", "E-commerce Platform"],
    certifications: ["React Advanced Concepts"],
    icon: <ReactIcon className="w-6 h-6" />,
    growth: [70, 80, 85, 90] // Growth over last 4 quarters
  },
  { 
    skill: "TypeScript", 
    value: 85,
    description: "Strong typing and advanced TypeScript features",
    projects: ["Type-safe API Client", "Component Library"],
    certifications: ["TypeScript Masterclass"],
    icon: <TypeScriptIcon className="w-6 h-6" />,
    growth: [65, 75, 80, 85]
  },
  { 
    skill: "Next.js", 
    value: 88,
    description: "Server-side rendering and static site generation",
    projects: ["Blog Platform", "Portfolio"],
    certifications: ["Next.js Certified"],
    icon: <NextIcon className="w-6 h-6" />,
    growth: [75, 80, 85, 88]
  },
  { 
    skill: "Node.js", 
    value: 75,
    description: "Backend development and API design",
    projects: ["REST API", "Real-time Chat"],
    certifications: ["Node.js Developer"],
    icon: <NodeIcon className="w-6 h-6" />,
    growth: [60, 65, 70, 75]
  },
  { 
    skill: "UI/UX", 
    value: 92,
    description: "User interface design and user experience",
    projects: ["Design System", "Mobile App UI"],
    certifications: ["UI/UX Design"],
    icon: <UIIcon className="w-6 h-6" />,
    growth: [85, 88, 90, 92]
  },
  { 
    skill: "CSS/Tailwind", 
    value: 95,
    description: "Advanced CSS and Tailwind CSS mastery",
    projects: ["Component Library", "Responsive Websites"],
    certifications: ["CSS Master"],
    icon: <CSSIcon className="w-6 h-6" />,
    growth: [85, 90, 92, 95]
  },
];

// Enhanced technology stack data
const techStack = [
  {
    category: "Frontend",
    technologies: [
      { 
        name: "React", 
        level: 90,
        description: "Expert in React hooks, context, and performance optimization",
        projects: ["Portfolio Website", "E-commerce Platform"],
        certifications: ["React Advanced Concepts"],
        icon: <ReactIcon className="w-6 h-6" />,
        endorsements: ["John Doe", "Jane Smith"]
      },
      { 
        name: "Next.js", 
        level: 88,
        description: "Server-side rendering and static site generation",
        projects: ["Blog Platform", "Portfolio"],
        certifications: ["Next.js Certified"],
        icon: <NextIcon className="w-6 h-6" />,
        endorsements: ["Mike Johnson"]
      },
      { 
        name: "TypeScript", 
        level: 85,
        description: "Strong typing and advanced TypeScript features",
        projects: ["Type-safe API Client", "Component Library"],
        certifications: ["TypeScript Masterclass"],
        icon: <TypeScriptIcon className="w-6 h-6" />,
        endorsements: ["Sarah Wilson"]
      },
      { 
        name: "Tailwind CSS", 
        level: 95,
        description: "Advanced CSS and Tailwind CSS mastery",
        projects: ["Component Library", "Responsive Websites"],
        certifications: ["CSS Master"],
        icon: <CSSIcon className="w-6 h-6" />,
        endorsements: ["Alex Brown"]
      },
    ],
  },
  {
    category: "Backend",
    technologies: [
      { 
        name: "Node.js", 
        level: 75,
        description: "Backend development and API design",
        projects: ["REST API", "Real-time Chat"],
        certifications: ["Node.js Developer"],
        icon: <NodeIcon className="w-6 h-6" />,
        endorsements: ["Tom Davis"]
      },
      { 
        name: "Express", 
        level: 70,
        description: "RESTful API development",
        projects: ["API Gateway", "Microservices"],
        certifications: ["Express.js Developer"],
        icon: <ExpressIcon className="w-6 h-6" />,
        endorsements: ["Lisa Chen"]
      },
      { 
        name: "MongoDB", 
        level: 65,
        description: "NoSQL database management",
        projects: ["E-commerce Database", "Analytics Platform"],
        certifications: ["MongoDB Certified"],
        icon: <MongoIcon className="w-6 h-6" />,
        endorsements: ["David Kim"]
      },
      { 
        name: "PostgreSQL", 
        level: 60,
        description: "Relational database management",
        projects: ["Financial System", "User Management"],
        certifications: ["PostgreSQL Admin"],
        icon: <PostgresIcon className="w-6 h-6" />,
        endorsements: ["Emma Wilson"]
      },
    ],
  },
  {
    category: "Tools & Others",
    technologies: [
      { 
        name: "Git", 
        level: 85,
        description: "Version control and collaboration",
        projects: ["Open Source Contributions"],
        certifications: ["Git Expert"],
        icon: <GitIcon className="w-6 h-6" />,
        endorsements: ["Chris Martin"]
      },
      { 
        name: "Docker", 
        level: 60,
        description: "Containerization and deployment",
        projects: ["Microservices Architecture"],
        certifications: ["Docker Certified"],
        icon: <DockerIcon className="w-6 h-6" />,
        endorsements: ["Rachel Green"]
      },
      { 
        name: "AWS", 
        level: 55,
        description: "Cloud infrastructure and services",
        projects: ["Cloud Migration", "Serverless Apps"],
        certifications: ["AWS Solutions Architect"],
        icon: <AWSIcon className="w-6 h-6" />,
        endorsements: ["Mark Taylor"]
      },
      { 
        name: "CI/CD", 
        level: 65,
        description: "Continuous Integration and Deployment",
        projects: ["Automated Testing Pipeline"],
        certifications: ["CI/CD Specialist"],
        icon: <CICDIcon className="w-6 h-6" />,
        endorsements: ["Anna Lee"]
      },
    ],
  },
];

export default function SkillsVisualization() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredSkills = activeTab === "all" 
    ? skillsData 
    : skillsData.filter(skill => 
        techStack.find(category => 
          category.technologies.some(tech => tech.name === skill.skill)
        )?.category.toLowerCase() === activeTab
      );

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Skills & Expertise
        </motion.h2>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Skills</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Skill Distribution</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={filteredSkills}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const skill = payload[0].payload;
                        return (
                          <div className="bg-background border p-4 rounded-lg shadow-lg">
                            <div className="flex items-center gap-2 mb-2">
                              {skill.icon}
                              <span className="font-bold">{skill.skill}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {skill.description}
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Projects:</p>
                              <ul className="text-sm text-muted-foreground">
                                {skill.projects.map((project: string, i: number) => (
                                  <li key={i}>• {project}</li>
                                ))}
                              </ul>
                            </div>
                            {skill.certifications && (
                              <div className="mt-2">
                                <p className="text-sm font-medium">Certifications:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {skill.certifications.map((cert: string, i: number) => (
                                    <Badge key={i} variant="secondary">
                                      {cert}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Technology Stack */}
          <div className="space-y-6">
            {techStack.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <div className="space-y-4">
                  {category.technologies.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ scale: 1.02 }}
                      className="bg-card p-4 rounded-lg border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {tech.icon}
                          <span className="font-medium">{tech.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {tech.level}%
                        </span>
                      </div>
                      <Progress value={tech.level} className="h-2 mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        {tech.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {tech.certifications.map((cert, i) => (
                          <Badge key={i} variant="secondary">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      {tech.endorsements && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            Endorsed by: {tech.endorsements.join(", ")}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 