import React from "react";
import FAQSection from "@/components/home2/FaqSection";
import LocationSection from "@/components/contactUs/Map";
import FaqSection from "@/components/contactUs/FaqSection";
import ContactForm from "@/components/contactUs/conatactForm";
import LandingLayout from "@/components/Layouts/LandingLayout";
import HomeContactSection from "@/components/home2/ContactSection";

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "What is cryptocurrency mining and how does it work?",
    a: "Mining secures a blockchain by validating new blocks of transactions. ASIC/GPUs compete to find a cryptographic nonce; the winner adds a block and receives rewards.",
  },
  {
    q: "How does EcomineX Hosting ensure security?",
    a: "We use 24/7 monitoring, facility access control, redundant systems and secure wallets.",
  },
  {
    q: "What is the expected ROI?",
    a: "ROI depends on hardware efficiency, power rate, network difficulty and price fluctuations.",
  },
  {
    q: "What is the minimum hosting duration?",
    a: "Hosting contracts usually range 6–12 months depending on the plan.",
  },
  {
    q: "Is crypto mining still profitable?",
    a: "Yes, with efficient hardware and low electricity rates.",
  },
  {
    q: "How do I get started?",
    a: "Choose a mining site, pick machines, sign the hosting agreement and fund your deployment.",
  },
];

export default function Page() {
  return (
    <div>
      <LandingLayout>
        <ContactForm />

        <div className="overflow-hidden relative bg-[#111111] px-14">
          <HomeContactSection />

          {/* Your FAQ section with props */}
          <FAQSection FAQS={FAQS} />
        </div>

        <LocationSection />

        {/* Contact page faq (keep or remove) */}
        <FaqSection />
      </LandingLayout>
    </div>
  );
}
