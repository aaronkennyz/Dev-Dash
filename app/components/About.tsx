"use client";
import { useEffect, useRef } from "react";

export default function About() {
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
    <section
      id="about"
      className="py-20 md:py-32 relative z-10 bg-[#f4f4f5]/90 backdrop-blur-md border-b-4 border-gray-200 w-full overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            ref={(el) => { elementsRef.current[0] = el; }}
            className="bg-white p-8 sm:p-12 shadow-brutal-lg border-4 border-brand-black relative z-10 reveal"
          >
            {/* Tape detail */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-brand-gray border border-gray-300 opacity-80 -rotate-2"></div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 sm:mb-8 uppercase text-brand-black leading-[0.9]">
              The Code <br />
              <span className="text-brand-red relative inline-block">
                Carnival.
                <div className="absolute -right-8 sm:-right-12 -top-6 sm:-top-8 text-brand-black opacity-10 font-graffiti text-3xl sm:text-4xl transform rotate-12">
                  V2.0
                </div>
              </span>
            </h2>
            <div className="w-12 sm:w-16 h-2 sm:h-3 bg-brand-red mb-8 sm:mb-10"></div>
            <p className="text-brand-darkGray text-base sm:text-lg leading-relaxed mb-6 font-medium">
              <strong className="text-brand-black bg-yellow-300 px-1 selection:bg-brand-red">
                FutureSprint
              </strong>{" "}
              is an annual hackathon held by the{" "}
              <strong className="text-brand-black border-b-2 border-brand-red">
                School Of Engineering, St Aloysius
              </strong>
              .
            </p>
            <p className="text-brand-darkGray text-base sm:text-lg leading-relaxed font-medium">
              Marked by its massive hype, the presence of multiple MNCs, and the
              ultimate development challenge which has sparked the journeys of many
              successful entrepreneurs.
            </p>
          </div>

          <div
            ref={(el) => { elementsRef.current[1] = el; }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 relative w-full reveal reveal-delay-2"
          >
            {/* Decor Splatter */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-brand-red rounded-full blur-[60px] sm:blur-[80px] opacity-15"></div>

            <div className="border-[3px] border-brand-black p-8 sm:p-10 flex flex-col justify-center items-center text-center aspect-[4/3] sm:aspect-square bg-white shadow-brutal transition-all hover:-translate-y-2 w-full group">
              <span className="text-5xl sm:text-6xl font-black text-brand-black mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                08
              </span>
              <span className="text-xs sm:text-sm font-bold text-brand-red uppercase tracking-[0.2em] mt-2">
                Hours
              </span>
              <span className="text-sm font-semibold text-gray-500 mt-1">
                To Build
              </span>
            </div>
            <div className="border-[3px] border-brand-black p-8 sm:p-10 flex flex-col justify-center items-center text-center aspect-[4/3] sm:aspect-square bg-brand-black sm:mt-16 shadow-brutal-red transition-all hover:-translate-y-2 cursor-default w-full group">
              <span className="text-5xl sm:text-6xl font-black text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                25
              </span>
              <span className="text-xs sm:text-sm font-bold text-brand-red uppercase tracking-[0.2em] mt-2">
                March
              </span>
              <span className="text-sm font-semibold text-gray-400 mt-1">
                2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
