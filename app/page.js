import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* Visual Separators can be added or handled by component backgrounds */}
      {/* <div className="h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-20"></div> */}
      
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* <div className="h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-20"></div> */}

      <div id="features">
        <Features />
      </div>

       {/* <div className="h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-20"></div> */}
       
      <div id="testimonials">
        <Testimonials />
      </div>
      
      <CTA />
    </>
  );
}
