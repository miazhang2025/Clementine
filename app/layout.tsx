import type { Metadata } from "next";
import "../styles/globals.css";
import { Navbar } from "../components/Navbar";
import { InteractiveBackground } from "../components/InteractiveBackground";
import { CustomCursor } from "../components/CustomCursor";

export const metadata: Metadata = {
  title: "Clementine",
  description: "Personal Assistant Toolbox",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-background text-text min-h-screen flex flex-col font-mono">
                <CustomCursor />
                <InteractiveBackground />
                <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-white/70 backdrop-blur-md shadow-lg border border-white/40 rounded-full px-8 py-3">
                        <Navbar />
                    </div>
                </header>
                <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 mt-20">
                    <div className="w-full max-w-5xl">{children}</div>
                </main>
                <footer className="w-full text-center text-xs text-text/60 py-4 border-t border-theme/20 bg-white">
                    © {new Date().getFullYear()} Clementine. All rights reserved. <span className="mx-2">|</span> <a href="https://cabbageblame.me" target="_blank" rel="noopener noreferrer" className="hover:text-theme transition-colors underline decoration-dotted">Made by MIA</a>
                </footer>
            </body>
        </html>
    );
}