import React from "react";
import MiningHeroSlider from "../home2/HeroSection";
import Service from "../home2/Service";
import HowItsWork from "../home2/HowItsWork";
import MarqueeSection from "../home2/MarqueeSection";
import AboutUs from "../home2/AboutUs";
import StrategicSection from "../home2/StrategicSection";
import PhotoStrip from "../home2/FollowUs";
import FAQSection from "../home2/FaqSection";
import Testimonials from "../home2/Testimonial";
import HomeAboutImage from "../../../public/AboutUS.jpg";
import HomeContactSection from "../home2/ContactSection";

function LandingHome() {

  const faqs = [
    { q: "What is Ecomine Hosting?", a: "We provide high-quality hosting and mining solutions globally." },
    { q: "How long have you been operating?", a: "We have been operating successfully for several years." },
  ];

  return (
    <>
      <div className="bg-[#101010] overflow-hidden relative px-20">
        <MiningHeroSlider />
        <Service />
        <HowItsWork />
      </div>

      <MarqueeSection />

      <div className="bg-[#101010] overflow-hidden relative px-20">
        <AboutUs
          title="About Ecomine Hosting"
          highlight="Ecomine"
          paragraphs={[
            `For several years now, we've been exploring the four corners of the globe to provide high-quality hosting and mining solutions.`,
          ]}
          buttonText="Learn More"
          image={HomeAboutImage.src}
        />

        <StrategicSection />

        <FAQSection FAQS={faqs} />

        <Testimonials />

        <PhotoStrip />
        <HomeContactSection />
      </div>
    </>
  );
}

export default LandingHome;
