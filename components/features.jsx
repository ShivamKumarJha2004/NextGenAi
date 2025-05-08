"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, BarChart3, FileEdit, GraduationCap } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "AI Powered Guidance",
      description: "Get personalized career advice with our cutting-edge AI technology that adapts to your unique professional profile.",
      icon: <Brain className="h-12 w-12 text-primary" />,
      badge: "Smart",
      action: "Explore",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Interview Prep",
      description: "Practice with AI-simulated interviews that provide real-time feedback to help you ace your next job interview.",
      icon: <GraduationCap className="h-12 w-12 text-primary" />,
      badge: "Interactive",
      action: "Try Now",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Industry Insights",
      description: "Stay ahead with data-driven industry trends, salary benchmarks, and job market analytics tailored to your career path.",
      icon: <BarChart3 className="h-12 w-12 text-primary" />,
      badge: "Data-Driven",
      action: "View Data",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Smart Resume Creation",
      description: "Create professional, ATS-optimized resumes with our AI-powered builder that highlights your strengths and achievements.",
      icon: <FileEdit className="h-12 w-12 text-primary" />,
      badge: "Optimized",
      action: "Build Resume",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <section className="py-20 ">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Revolutionize Your Career Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock your professional potential with our suite of AI-powered career tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <CardHeader className="relative">
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {feature.badge}
                  </Badge>
                </div>
                <div className="p-2 rounded-lg bg-primary/5 w-fit mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardFooter>
                <Button variant="ghost" className="group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300">
                  {feature.action} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
