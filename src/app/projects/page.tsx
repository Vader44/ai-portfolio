"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const projects = [
  {
    id: 1,
    title: "Enterprise UCC Dashboard",
    description:
      "Internal portal for managing SAP complaint workflows and routing at Jio.",
    stack: ["Angular", "TypeScript", "SCSS", "SAP API"],
    confidential: true,
  },
  {
    id: 2,
    title: "TrueConnect Portal",
    description:
      "Built frontend UI components for enterprise user provisioning and audits.",
    stack: ["Angular 6", "RxJS", "Bootstrap", "REST"],
    confidential: true,
  },
  {
    id: 3,
    title: "AI Portfolio (this site)",
    description:
      "React + Next.js portfolio with Framer Motion, Tailwind and shadcn/ui.",
    stack: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    confidential: false,
  },
];

export default function ProjectsPage() {
  type Project = {
    id: number;
    title: string;
    description: string;
    stack: string[];
    confidential: boolean;
  };

  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Projects 🛠</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(project)}
          >
            <Card className="cursor-pointer hover:shadow-md transition">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                  {project.confidential && (
                    <Badge variant="destructive">🔒 Confidential</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 🔍 Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogTitle>{selected.title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mb-3">
                {selected.description}
              </DialogDescription>
              <div className="flex flex-wrap gap-2">
                {selected.stack.map((tech: string) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
                {selected.confidential && (
                  <Badge variant="destructive">🔒 Internal Only</Badge>
                )}
              </div>
              {!selected.confidential && (
                <div className="mt-4 flex gap-3">
                  <Button variant="outline">View Code</Button>
                  <Button>Live Demo</Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
