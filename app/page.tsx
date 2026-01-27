import { ToolCard } from "../components/ToolCard";
import { MailCheck, FileText, Utensils, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-12">
      <div className="text-center mb-12">
        {/* <h1 className="text-5xl font-extrabold text-theme mb-4 tracking-tight drop-shadow-sm">Clementine</h1> */}
        <p className="font-caveat text-3xl text-black max-w-3xl mx-auto mb-6 bg-black/1 backdrop-blur-md p-10 rounded-2xl border border-white/10 ">Mia's modular personal assistant toolbox. Boost productivity with AI-powered tools for writing, planning, and more—all in one beautiful workspace.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <ToolCard
          title="Email Refiner"
          description="Polishes drafts while keeping your tone."
          href="/tools/email-refiner"
          icon={MailCheck}
        />
        <ToolCard
          title="Cover Letter Gen"
          description="Writes tailored letters based on your profile."
          href="/tools/cover-letter"
          icon={FileText}
        />
        <ToolCard
          title="Meal Planner"
          description="Weekly meal plans based on calories & cravings."
          href="/tools/food-planner"
          icon={Utensils}
        />
        <ToolCard
          title="Interview Q&A"
          description="Answer career questions based on your experience."
          href="/tools/interview-qa"
          icon={MessageSquare}
        />
      </div>
    </section>
  );
}