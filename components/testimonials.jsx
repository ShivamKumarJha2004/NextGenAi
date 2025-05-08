"use client";
import React from "react";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      position: "Software Engineer",
      company: "Tech Giant Co.",
      quote: "The AI-powered interview prep was a game-changer. Landed my dream job at a top tech company!",
      avatar: "/avatars/sarah.jpg"
    },
    {
      name: "Michael Rodriguez",
      position: "Product Manager",
      company: "StartUp Inc.",
      quote: "The industry insights helped me pivot my career successfully. The salary data was spot-on!",
      avatar: "/avatars/michael.jpg"
    },
    {
      name: "Priya Patel",
      position: "Marketing Director",
      company: "Global Corp",
      quote: "My resume's ATS score improved significantly. Got more interviews in two weeks than in six months!",
      avatar: "/avatars/priya.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 mt-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-lg p-8 relative"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-14 h-14 mr-4 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  {/* Fallback to initial if image fails */}
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{testimonial.name}</h3>
                  <p className="text-gray-400">{testimonial.position}</p>
                  <p className="text-gray-500">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="italic text-gray-300">
                <span className="text-4xl text-gray-500 leading-none mr-1">"</span>
                {testimonial.quote}
                <span className="text-4xl text-gray-500 leading-none ml-1">"</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
