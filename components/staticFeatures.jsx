"use client";

import React, { useEffect, useState, useRef } from "react";
import { CheckCircle2, MessagesSquare, BarChart2, Clock } from "lucide-react";

const StaticFeatures = () => {
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    interviewsCovered: 0,
    interviewQuestions: 0,
    successRate: 0,
    aiSupport: 0
  });

  // Final values for each counter
  const finalValues = {
    interviewsCovered: 750,
    interviewQuestions: 3500,
    successRate: 95,
    aiSupport: 24
  };

  // Animation duration in milliseconds
  const animationDuration = 2000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startCounting = () => {
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        setCounts({
          interviewsCovered: Math.floor(progress * finalValues.interviewsCovered),
          interviewQuestions: Math.floor(progress * finalValues.interviewQuestions),
          successRate: Math.floor(progress * finalValues.successRate),
          aiSupport: Math.floor(progress * finalValues.aiSupport)
        });
        
        if (progress === 1) {
          clearInterval(interval);
        }
      }, 16); // ~60fps
      
      return () => clearInterval(interval);
    };
    
    const cleanupFn = startCounting();
    return cleanupFn;
  }, [isVisible]);

  const stats = [
    {
      title: "Interviews Covered",
      value: counts.interviewsCovered,
      suffix: "+",
      description: "Different job interview types covered across industries",
      icon: <CheckCircle2 className="h-10 w-10 text-emerald-500" />,
    },
    {
      title: "Interview Questions",
      value: counts.interviewQuestions,
      suffix: "+",
      description: "Comprehensive question database for effective preparation",
      icon: <MessagesSquare className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Success Rate",
      value: counts.successRate,
      suffix: "%",
      description: "Of our users successfully secure job offers",
      icon: <BarChart2 className="h-10 w-10 text-purple-500" />,
    },
    {
      title: "AI Support",
      value: counts.aiSupport,
      suffix: "/7",
      description: "Round-the-clock AI assistance for your career journey",
      icon: <Clock className="h-10 w-10 text-amber-500" />,
    },
  ];

  return (
    <section className="py-20  text-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Impressive Results</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform has helped thousands of professionals achieve their career goals.
          </p>
        </div>

        <div 
          ref={statsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-lg hover:shadow-slate-800/50 text-center"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold mb-2 flex justify-center items-center">
                <span className="tabular-nums">{stat.value}</span>
                <span className="text-primary ml-1">{stat.suffix}</span>
              </h3>
              <p className="text-xl font-medium mb-2 text-gray-100">{stat.title}</p>
              <p className="text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaticFeatures;
