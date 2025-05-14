import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Download } from "lucide-react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Portfolio",
  description: "Showcase by Yash",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          {children}

          {/* 🔽 Minimal Floating Resume Button */}
          <a
            href="/resume.pdf"
            download
            title="Download Resume"
            className="fixed bottom-5 right-5 z-50 bg-background/70 border border-border text-foreground p-2 rounded-full shadow-md hover:scale-110 hover:bg-background transition-all backdrop-blur-sm"
          >
            <Download className="w-5 h-5" />
          </a>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
