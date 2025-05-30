"use client"
import React, { useEffect, useState, useRef } from "react";
import { Button } from "../components/ui/button";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const imageRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const calculateTiltStyle = () => {
    const tiltX = scrollY * 0.02; // Adjust these values to control tilt intensity
    const tiltY = scrollY * 0.01;
    const scale = 1 + scrollY * 0.0002;
    
    return {
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`,
      transition: 'transform 0.3s ease-out',
    };
  };

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-grid-background"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Text Content - Now on Top */}
          <div className="w-full z-10 space-y-6 text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="block">Elevate Your Career</span>
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                With NexGenAi
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-powered tools to help you build the perfect resume, craft compelling cover letters, and ace your interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full">Get Started</Button>
              <Button size="lg" variant="outline" className="rounded-full">Explore Tools</Button>
            </div>
          </div>
          
          {/* Image - Now Below Text with 3D Tilt Animation */}
          <div className="w-full md:w-4/5 lg:w-3/4 z-10 mt-6">
            <div 
              ref={imageRef}
              className="relative w-full h-72 sm:h-80 md:h-[30rem] shadow-2xl rounded-xl overflow-hidden"
              style={calculateTiltStyle()}
            >
              <img 
                src="/banner2.jpeg" 
                alt="AI assistant helping with resume" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
