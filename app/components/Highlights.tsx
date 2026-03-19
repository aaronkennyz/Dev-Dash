/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";

export default function Highlights() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const scrollCarousel = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount =
      window.innerWidth > 768 ? 482 : window.innerWidth * 0.85;
    if (direction === "left") {
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="highlights"
      className="py-20 md:py-32 relative z-10 bg-brand-black text-white border-y-[6px] border-brand-black overflow-hidden shadow-brutal-xl w-full"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Graffiti accent inside carousel */}
      <div className="absolute -right-5 sm:-right-10 top-10 sm:top-20 font-graffiti text-brand-red opacity-10 text-6xl sm:text-8xl transform rotate-12 pointer-events-none select-none">
        ARCHIVES
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10 w-full reveal" ref={(el) => { elementsRef.current[0] = el; }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-3 sm:mb-4 uppercase text-white leading-none">
              System <span className="text-brand-red">Memory</span>
            </h2>
            <p className="text-gray-400 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] border-l-[3px] border-brand-red pl-3 bg-white/5 py-1 pr-4 inline-block">
              Accessing past archives...
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <button
              aria-label="Scroll Left"
              onClick={() => scrollCarousel("left")}
              className="w-14 h-14 border-4 border-white bg-transparent hover:bg-white hover:text-brand-black transition-all flex items-center justify-center text-xl active:translate-y-1 text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:shadow-none"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              aria-label="Scroll Right"
              onClick={() => scrollCarousel("right")}
              className="w-14 h-14 border-4 border-white bg-transparent hover:bg-white hover:text-brand-black transition-all flex items-center justify-center text-xl active:translate-y-1 text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:shadow-none"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* Carousel Wrapper for Mobile Padding Strategy */}
        <div className="-mx-5 sm:-mx-6 md:mx-0">
          <div
            id="carousel-container"
            ref={containerRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 pt-4 px-5 sm:px-6 md:px-0 scroll-smooth w-full"
          >
            {/* Carousel Item 1 */}
            <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] relative group border-[3px] sm:border-[5px] border-white hover:border-brand-red transition-all duration-300 cursor-pointer shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-brutal-red hover:-translate-y-2 hover:-rotate-1">
              <div className="absolute inset-0 bg-brand-black/60 group-hover:bg-brand-black/10 transition-all z-10 duration-500"></div>
              <img
                src="/assets/1.png"
                alt="Valedictory Ceremony"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' fill='%23fff' font-family='sans-serif' font-size='24' text-anchor='middle'%3EImage Placeholder%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute bottom-0 left-0 bg-white text-brand-black px-5 sm:px-8 py-3 sm:py-4 font-black uppercase text-xs sm:text-sm md:text-lg z-20 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border-t-[3px] border-r-[3px] border-brand-red">
                Coming Together
              </div>
            </div>
            {/* Carousel Item 2 */}
            <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] relative group border-[3px] sm:border-[5px] border-white hover:border-brand-red transition-all duration-300 cursor-pointer shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-brutal-red hover:-translate-y-2 hover:-rotate-1">
              <div className="absolute inset-0 bg-brand-black/60 group-hover:bg-brand-black/10 transition-all z-10 duration-500"></div>
              <img
                src="/assets/2.png"
                alt="Project Presentation"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' fill='%23fff' font-family='sans-serif' font-size='24' text-anchor='middle'%3EImage Placeholder%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute bottom-0 left-0 bg-white text-brand-black px-5 sm:px-8 py-3 sm:py-4 font-black uppercase text-xs sm:text-sm md:text-lg z-20 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border-t-[3px] border-r-[3px] border-brand-red">
                Project Presentation
              </div>
            </div>
            {/* Carousel Item 3 */}
            <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] relative group border-[3px] sm:border-[5px] border-white hover:border-brand-red transition-all duration-300 cursor-pointer shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-brutal-red hover:-translate-y-2 hover:-rotate-1">
              <div className="absolute inset-0 bg-brand-black/60 group-hover:bg-brand-black/10 transition-all z-10 duration-500"></div>
              <img
                src="/assets/3.png"
                alt="Team Collaboration"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' fill='%23fff' font-family='sans-serif' font-size='24' text-anchor='middle'%3EImage Placeholder%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute bottom-0 left-0 bg-white text-brand-black px-5 sm:px-8 py-3 sm:py-4 font-black uppercase text-xs sm:text-sm md:text-lg z-20 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border-t-[3px] border-r-[3px] border-brand-red">
                Team Collaboration
              </div>
            </div>
            {/* Carousel Item 4 */}
            <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] relative group border-[3px] sm:border-[5px] border-white hover:border-brand-red transition-all duration-300 cursor-pointer shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-brutal-red hover:-translate-y-2 hover:-rotate-1">
              <div className="absolute inset-0 bg-brand-black/60 group-hover:bg-brand-black/10 transition-all z-10 duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Hackathon Squad"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' fill='%23fff' font-family='sans-serif' font-size='24' text-anchor='middle'%3EImage Placeholder%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute bottom-0 left-0 bg-white text-brand-black px-5 sm:px-8 py-3 sm:py-4 font-black uppercase text-xs sm:text-sm md:text-lg z-20 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border-t-[3px] border-r-[3px] border-brand-red">
                Keep Coding
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden justify-center gap-4 sm:gap-6 mt-6">
          <button
            aria-label="Scroll Left"
            onClick={() => scrollCarousel("left")}
            className="w-14 h-14 border-[3px] border-white bg-transparent active:bg-white active:text-brand-black transition-all flex items-center justify-center text-xl active:translate-y-1 text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:shadow-none focus:outline-none focus:ring-2 focus:ring-brand-red"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button
            aria-label="Scroll Right"
            onClick={() => scrollCarousel("right")}
            className="w-14 h-14 border-[3px] border-white bg-transparent active:bg-white active:text-brand-black transition-all flex items-center justify-center text-xl active:translate-y-1 text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:shadow-none focus:outline-none focus:ring-2 focus:ring-brand-red"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
