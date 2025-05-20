"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: "certification" | "project" | "achievement" | "education";
  certificateUrl?: string;
  skills?: string[];
}

// Example timeline data - you can replace this with your actual data
const timelineData: TimelineEvent[] = [
  {
    date: "2017",
    title: "Engineering Begins",
    description: "Started B.E. in IT. Wrote my first C program and built static websites.",
    type: "education",
    skills: ["C Programming", "Web Development Basics"],
  },
  {
    date: "2021",
    title: "Joined Jio",
    description: "Frontend Dev on Angular + SAP systems. Built portals & internal tools.",
    type: "achievement",
    skills: ["Angular", "SAP", "Frontend Development"],
  },
  {
    date: "2023",
    title: "The Gamer Dev Arc",
    description: "Started building side projects with React, Tailwind, and Framer Motion.",
    type: "achievement",
    skills: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    date: "2025",
    title: "This Portfolio",
    description: "Launched my personal dev+gamer themed portfolio. You're looking at it 😉",
    type: "project",
    skills: ["Next.js", "React", "UI/UX"],
  },
  {
    date: "2024",
    title: "IETE Certificate of Achievement",
    description: "Recognized for outstanding contribution and achievement in technical activities",
    type: "achievement",
    certificateUrl: "/certificates/IETE CERTIFICATEOF ACHIEVEMENT.pdf",
    skills: ["Technical Excellence", "Professional Development"],
  },
  {
    date: "2024",
    title: "Certificate of Appreciation",
    description: "Acknowledged for exceptional performance and dedication",
    type: "achievement",
    certificateUrl: "/certificates/77_Certificate of Appreciation_Yash Tawde.pdf",
    skills: ["Leadership", "Professional Excellence"],
  },
  {
    date: "2024",
    title: "Merit Certificate - Selection Round",
    description: "Recognized for outstanding academic performance and selection in the merit round",
    type: "achievement",
    certificateUrl: "/certificates/Merit_Cert_Sel_Round_Student.pdf",
    skills: ["Academic Excellence", "Merit Recognition"],
  },
  {
    date: "2024",
    title: "Copyright Certificate - Attendance",
    description: "Certified participation in copyright and intellectual property workshop",
    type: "certification",
    certificateUrl: "/certificates/Copyright-Certificate -Attendance.pdf",
    skills: ["Intellectual Property", "Copyright Law", "Professional Development"],
  },
];

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20" />

          {/* Timeline events */}
          <div className="space-y-12">
            {timelineData.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary" />

                {/* Event card */}
                <div
                  className={`relative ${
                    index % 2 === 0 ? "ml-auto" : "mr-auto"
                  } w-[calc(50%-2rem)]`}
                >
                  <Card
                    className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge
                          variant={
                            event.type === "certification"
                              ? "default"
                              : event.type === "project"
                              ? "secondary"
                              : "outline"
                          }
                          className="mb-2"
                        >
                          {event.type}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {event.description}
                        </p>
                        {event.skills && (
                          <div className="flex flex-wrap gap-2">
                            {event.skills.map((skill, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {event.date}
                      </span>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificate Modal */}
        {selectedEvent && selectedEvent.certificateUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {selectedEvent.title} Certificate
                </h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col items-center justify-center p-4 gap-4">
                <iframe
                  src={selectedEvent.certificateUrl}
                  className="w-full"
                  style={{ height: '80vh' }}
                  title="Certificate"
                />
                <a
                  href={selectedEvent.certificateUrl}
                  download
                  className="text-primary underline text-sm mt-2"
                  onClick={e => e.stopPropagation()}
                >
                  Download PDF
                </a>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
} 