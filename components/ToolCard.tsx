import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function ToolCard({ title, description, href, icon: Icon }: ToolCardProps) {
  return (
    <Link href={href} className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-theme/20 hover:border-theme hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-lg bg-theme/10 group-hover:bg-theme/20 transition-colors mr-3">
            <Icon className="w-6 h-6 text-theme" />
        </div>
        <h2 className="text-lg font-bold text-text group-hover:text-theme transition-colors">{title}</h2>
      </div>
      <p className="text-text/70 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
