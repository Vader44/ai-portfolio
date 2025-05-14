"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Employee Portal UI",
    description:
      "An internal Angular-based dashboard for managing SAP data, logins, and UCC uploads.",
  },
  {
    title: "TRAI DnD PDF Reporting",
    description:
      "Generated stylized PDF reports using Puppeteer, later optimized to use pdfmake.",
  },
  {
    title: "File Parser + Validator",
    description:
      "CSV upload + JSON conversion + API sync in Angular with edit & error UI.",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">My Projects 🚀</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
