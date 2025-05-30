import { Button } from "../components/ui/button";
import React from "react";
import HeroSection from "../components/Hero";
import Features from "../components/Features";
import StaticFeatures from "../components/StaticFeatures";
import WorkFlow from "../components/WorkFlow";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/Faq";
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
