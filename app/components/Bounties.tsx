"use client";

import { useEffect, useRef } from "react";

interface BountiesProps {
  onBountyClick: (id: string) => void;
}

export default function Bounties({ onBountyClick }: BountiesProps) {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const elements = elementsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="tracks" className="py-20 md:py-32 relative z-10 bg-[#fafafa] w-full overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 md:px-12 w-full">
        <div 
          ref={(el) => { elementsRef.current[0] = el; }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 border-b-[3px] border-brand-black pb-6 gap-6 reveal"
        >
          <div className="w-full max-w-2xl bg-white p-5 sm:p-6 -ml-2 sm:-ml-4 rounded shadow-brutal border-2 border-brand-black">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-3 sm:mb-4 uppercase leading-[0.9]">
              Target <span className="text-brand-red">Bounties</span>
            </h2>
            <p className="text-brand-darkGray text-base sm:text-lg md:text-xl font-medium">
              Select a domain, compile your code, and extract the rewards.
            </p>
          </div>
          <div className="hidden md:flex font-mono text-sm font-bold text-brand-red bg-brand-black text-white px-4 py-2 border-2 border-brand-red items-center gap-2">
            <span className="w-2 h-2 bg-brand-red animate-pulse block"></span>
            [ // SELECT_PROTOCOL ]
          </div>
        </div>

        <div 
          ref={(el) => { elementsRef.current[1] = el; }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 w-full reveal reveal-delay-2"
        >
          {/* Track 1 */}
          <button
            aria-label="Healthcare Bounty"
            onClick={() => onBountyClick("health")}
            className="text-left structural-border p-8 sm:p-10 card-hover relative overflow-hidden group cursor-pointer w-full bg-white focus:outline-none focus:ring-4 focus:ring-brand-red focus:border-transparent"
          >
            <div className="absolute top-0 right-0 p-4 sm:p-5 font-mono font-bold text-gray-200 group-hover:text-brand-red transition-colors text-xl sm:text-2xl z-10">
              01
            </div>
            <i className="fa-solid fa-spray-can absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 text-6xl sm:text-9xl text-gray-100 group-hover:text-brand-red/5 transition-colors -rotate-12 duration-500"></i>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-black flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-brand-red transition-colors relative z-10 shadow-brutal border-2 border-brand-black group-hover:-translate-y-1">
              <i className="fa-solid fa-heart-pulse text-2xl sm:text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-brand-black mb-3 sm:mb-4 uppercase tracking-tight relative z-10 group-hover:text-brand-red transition-colors">
              Healthcare
            </h3>
            <p className="text-brand-darkGray text-sm sm:text-base leading-relaxed font-semibold relative z-10">
              Innovate for well-being. Build digital health solutions, diagnostic tools, or advanced patient care systems.
            </p>
          </button>

          {/* Track 2 */}
          <button
            aria-label="Fintech Bounty"
            onClick={() => onBountyClick("fintech")}
            className="text-left structural-border p-8 sm:p-10 card-hover relative overflow-hidden group cursor-pointer w-full bg-white focus:outline-none focus:ring-4 focus:ring-brand-red focus:border-transparent"
          >
            <div className="absolute top-0 right-0 p-4 sm:p-5 font-mono font-bold text-gray-200 group-hover:text-brand-red transition-colors text-xl sm:text-2xl z-10">
              02
            </div>
            <i className="fa-solid fa-spray-can absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 text-6xl sm:text-9xl text-gray-100 group-hover:text-brand-red/5 transition-colors -rotate-12 duration-500"></i>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-black flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-brand-red transition-colors relative z-10 shadow-brutal border-2 border-brand-black group-hover:-translate-y-1">
              <i className="fa-solid fa-coins text-2xl sm:text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-brand-black mb-3 sm:mb-4 uppercase tracking-tight relative z-10 group-hover:text-brand-red transition-colors">
              Fintech
            </h3>
            <p className="text-brand-darkGray text-sm sm:text-base leading-relaxed font-semibold relative z-10">
              Disrupt finance. Create decentralized apps, smart trading algorithms, or accessible financial tools.
            </p>
          </button>

          {/* Track 3 */}
          <button
            aria-label="Sustainable Tech Bounty"
            onClick={() => onBountyClick("sustain")}
            className="text-left structural-border p-8 sm:p-10 card-hover relative overflow-hidden group cursor-pointer w-full bg-white focus:outline-none focus:ring-4 focus:ring-brand-red focus:border-transparent"
          >
            <div className="absolute top-0 right-0 p-4 sm:p-5 font-mono font-bold text-gray-200 group-hover:text-brand-red transition-colors text-xl sm:text-2xl z-10">
              03
            </div>
            <i className="fa-solid fa-spray-can absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 text-6xl sm:text-9xl text-gray-100 group-hover:text-brand-red/5 transition-colors -rotate-12 duration-500"></i>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-black flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-brand-red transition-colors relative z-10 shadow-brutal border-2 border-brand-black group-hover:-translate-y-1">
              <i className="fa-solid fa-leaf text-2xl sm:text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-brand-black mb-3 sm:mb-4 uppercase tracking-tight relative z-10 group-hover:text-brand-red transition-colors">
              Sustainable Tech
            </h3>
            <p className="text-brand-darkGray text-sm sm:text-base leading-relaxed font-semibold relative z-10">
              Code for the planet. Develop clean energy trackers, waste management platforms, or climate models.
            </p>
          </button>

          {/* Track 4 */}
          <button
            aria-label="Agriculture Bounty"
            onClick={() => onBountyClick("agri")}
            className="text-left structural-border p-8 sm:p-10 card-hover relative overflow-hidden group cursor-pointer w-full bg-white focus:outline-none focus:ring-4 focus:ring-brand-red focus:border-transparent"
          >
            <div className="absolute top-0 right-0 p-4 sm:p-5 font-mono font-bold text-gray-200 group-hover:text-brand-red transition-colors text-xl sm:text-2xl z-10">
              04
            </div>
            <i className="fa-solid fa-spray-can absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 text-6xl sm:text-9xl text-gray-100 group-hover:text-brand-red/5 transition-colors -rotate-12 duration-500"></i>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-black flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-brand-red transition-colors relative z-10 shadow-brutal border-2 border-brand-black group-hover:-translate-y-1">
              <i className="fa-solid fa-wheat-awn text-2xl sm:text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-brand-black mb-3 sm:mb-4 uppercase tracking-tight relative z-10 group-hover:text-brand-red transition-colors">
              Agriculture
            </h3>
            <p className="text-brand-darkGray text-sm sm:text-base leading-relaxed font-semibold relative z-10">
              Modernize farming. Build AgriTech solutions, yield predictors, or automated irrigation systems.
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
