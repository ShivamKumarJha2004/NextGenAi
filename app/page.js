import { Button } from "@/components/ui/button";
import React from "react";
import HeroSection from "@/components/hero";
import Features from "@/components/features";
import StaticFeatures from "@/components/staticFeatures";
import WorkFlow from "@/components/workFlow";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
export default function Home() {
  return (
    <div>
      <HeroSection/>
      <Features/>
      <StaticFeatures/>
      <WorkFlow/>
      <Testimonials/>
      <FAQ/>
    </div>
  );
}
