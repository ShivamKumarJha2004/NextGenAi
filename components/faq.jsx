"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What makes NexGenAi unique as a career development tool?",
      answer: "NexGenAi combines cutting-edge AI technology with industry-specific knowledge to provide personalized career guidance. Our platform analyzes your background, skills, and career goals to offer tailored advice, custom-crafted documents, and realistic interview simulations that specifically prepare you for your target roles and industries."
    },
    {
      question: "How does NexGenAi create tailored content?",
      answer: "Our AI analyzes thousands of successful resumes, cover letters, and interview responses across various industries. When you input your experience and target role, NexGenAi matches your profile with industry best practices and employer expectations to generate highly personalized content optimized for your specific career goals."
    },
    {
      question: "How accurate and up-to-date are NexGenAi's industry insights?",
      answer: "NexGenAi's industry data is refreshed monthly using information from leading job platforms, salary surveys, and hiring trend analyses. Our AI continuously learns from successful career transitions and incorporates feedback from hiring managers to ensure our insights reflect current market conditions and requirements."
    },
    {
      question: "Is my data secure with NexGenAi?",
      answer: "Absolutely. We employ bank-level encryption and strict data protection protocols to safeguard your information. Your data is never sold to third parties, and you maintain complete control over what information is stored. Additionally, our platform is fully compliant with global data protection regulations including GDPR and CCPA."
    },
    {
      question: "How can I track my interview preparation progress?",
      answer: "NexGenAi provides a comprehensive dashboard that displays your performance metrics across mock interviews, showing improvement over time. You'll receive detailed feedback on your responses, suggestions for enhancement, and a readiness score that indicates your preparation level for specific types of interviews."
    },
    {
      question: "Can I edit the AI-generated content?",
      answer: "Yes, all AI-generated content is fully editable. While NexGenAi provides high-quality initial drafts, you can customize every aspect to match your personal voice and preferences. Our platform also learns from your edits to better align future content with your style."
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border-b border-gray-800 py-5 cursor-pointer"
            >
              <div 
                onClick={() => toggleQuestion(index)}
                className="flex items-center justify-between"
              >
                <h3 className="text-xl font-medium">
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`} 
                />
              </div>
              {openIndex === index && (
                <div className="mt-3 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
