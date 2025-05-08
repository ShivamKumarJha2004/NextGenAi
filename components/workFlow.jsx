"use client";
import React from "react";
import { UserPlus, FileText, Users, LineChart } from "lucide-react";

const WorkFlow = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "Professional Onboarding",
      description: "Share your industry and expertise for personalized guidance"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Craft Your Documents",
      description: "Create ATS-optimized resumes and compelling cover letters"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Prepare for Interviews",
      description: "Practice with AI-powered mock interviews tailored to your role"
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Track Your Progress",
      description: "Monitor improvements with detailed performance analytics"
    }
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-400">
            Four simple steps to accelerate your career growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkFlow;
