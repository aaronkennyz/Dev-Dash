"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Highlights from "./components/Highlights";
import Bounties from "./components/Bounties";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";
import BountyModal, { BountyData } from "./components/BountyModal";

const BOUNTIES_DATA: Record<string, BountyData> = {
  health: {
    id: "health",
    title: "Healthcare",
    icon: "fa-heart-pulse",
    desc: "The healthcare sector is ripe for disruption. Develop solutions that improve patient care, streamline hospital administration, or provide accessible diagnostic tools to remote areas.",
    output: "A functional prototype of a health-tech app, diagnostic AI model, or a patient management dashboard.",
    tech: ["React Native", "Python", "TensorFlow", "Firebase API"]
  },
  fintech: {
    id: "fintech",
    title: "Fintech",
    icon: "fa-coins",
    desc: "Democratize finance. We are looking for projects that tackle financial literacy, peer-to-peer lending, smart trading algorithms, or decentralized applications.",
    output: "A secure web or mobile application handling simulated transactions, or a deployed smart contract.",
    tech: ["Solidity", "Node.js", "React", "Plaid API"]
  },
  sustain: {
    id: "sustain",
    title: "Sustainable Tech",
    icon: "fa-leaf",
    desc: "Code for the planet. Build applications that help track carbon footprints, optimize waste management, or model climate change impacts using open data.",
    output: "An interactive dashboard, an IoT integration simulation, or a mobile app for eco-tracking.",
    tech: ["Vue.js", "Python", "IoT Protocols", "Mapbox"]
  },
  agri: {
    id: "agri",
    title: "Agriculture",
    icon: "fa-wheat-awn",
    desc: "Modernize farming practices. Create AgriTech solutions like crop yield predictors, automated irrigation systems based on weather data, or supply chain optimizers.",
    output: "A data-driven web app or a mobile app connecting farmers to markets and real-time agricultural data.",
    tech: ["Flutter", "Django", "Machine Learning", "OpenWeather API"]
  }
};

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState<BountyData | null>(null);

  const handleOpenBounty = (id: string) => {
    setSelectedBounty(BOUNTIES_DATA[id]);
  };

  return (
    <main>
      {/* GRAFFITI BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden w-full max-w-full">
        {/* SVG Noise/Grunge overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
            mixBlendMode: "multiply",
          }}
        ></div>

        {/* Color Blurs */}
        <div className="absolute top-[10%] left-[5%] w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] max-w-[500px] max-h-[500px] bg-brand-red rounded-full blur-[80px] sm:blur-[120px] opacity-[0.06]"></div>
        <div className="absolute bottom-[10%] right-[0%] w-[70vw] h-[70vw] sm:w-[50vw] sm:h-[50vw] max-w-[600px] max-h-[600px] bg-brand-black rounded-full blur-[100px] sm:blur-[120px] opacity-[0.04]"></div>

        {/* Typography Graffiti */}
        <div className="absolute top-[15%] sm:top-[12%] left-[-5%] sm:left-[-2%] text-[20vw] sm:text-[14vw] font-graffiti text-brand-black opacity-[0.03] transform -rotate-12 whitespace-nowrap select-none">
          ST ALOYSIUS
        </div>
        <div className="absolute top-[45%] sm:top-[40%] right-[-10%] sm:right-[-5%] text-[22vw] sm:text-[16vw] font-graffiti text-brand-red opacity-[0.03] transform rotate-6 whitespace-nowrap select-none">
          CODE CARNIVAL
        </div>
      </div>

      <Navbar onRegisterClick={() => setIsRegisterOpen(true)} />
      <Hero onRegisterClick={() => setIsRegisterOpen(true)} />
      <Marquee />
      <About />
      <Highlights />
      <Bounties onBountyClick={handleOpenBounty} />
      <Footer />

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
      
      <BountyModal
        isOpen={selectedBounty !== null}
        bounty={selectedBounty}
        onClose={() => setSelectedBounty(null)}
        onRegister={() => setIsRegisterOpen(true)}
      />
    </main>
  );
}