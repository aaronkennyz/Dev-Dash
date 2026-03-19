"use client";

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";
import Link from "next/link";

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const dragRef = useRef<{ startX: number; startY: number }>({ startX: 0, startY: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: ReactMouseEvent | ReactTouchEvent) => {
    setIsDragging(true);
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as ReactMouseEvent).clientX;
      clientY = (e as ReactMouseEvent).clientY;
    }
    dragRef.current = { startX: clientX, startY: clientY };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      let clientX, clientY;
      if ("touches" in e) {
        clientX = (e as TouchEvent).touches[0].clientX;
        clientY = (e as TouchEvent).touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const dx = clientX - dragRef.current.startX;
      const dy = clientY - dragRef.current.startY;

      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      dragRef.current = { startX: clientX, startY: clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, { passive: false });
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove, { passive: false });
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="relative min-h-[90vh] md:min-h-[95vh] pt-28 sm:pt-32 pb-16 flex items-center z-10 w-full">
      <div className="container mx-auto px-5 sm:px-6 md:px-12 grid lg:grid-cols-2 gap-10 lg:gap-8 items-center w-full">
        {/* Left: Typography & Call to action */}
        <div className="w-full flex flex-col items-start bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-10 border-4 border-brand-black shadow-brutal-lg sm:shadow-brutal-xl relative z-20 reveal active">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-brand-red text-brand-red font-mono text-[10px] sm:text-xs font-bold uppercase mb-6 sm:mb-8 bg-white/50 backdrop-blur-sm shadow-brutal-red transition-all">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-red animate-pulse"></span>
            SYS.DATE: March 25, 2026
          </div>

          <h1 className="text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5rem] font-black mb-4 sm:mb-6 tracking-tighter uppercase text-brand-black relative mt-2 sm:mt-0 w-full break-words">
            <span className="absolute -top-6 sm:-top-8 -left-2 sm:-left-6 text-2xl sm:text-4xl text-brand-red opacity-30 font-graffiti transform -rotate-12 select-none pointer-events-none">
              Hack
            </span>
            Code.<br />
            Build.<br />
            <span className="text-brand-red relative">
              Sprint.
              <div className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-2 sm:h-3 bg-brand-black -z-10 skew-x-12 opacity-10"></div>
            </span>
          </h1>

          <h2 className="text-sm sm:text-lg md:text-xl font-black text-brand-red mb-5 uppercase tracking-widest bg-white inline-block border-l-4 border-brand-red pl-2 sm:pl-3">
            8 hrs. one idea. built for impact.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-brand-darkGray mb-8 leading-relaxed w-full max-w-lg font-medium bg-gray-50/80 p-3 sm:p-4 border-2 border-dashed border-gray-300">
            Join developers, designers, and innovators for a weekend of creation,
            competition, and fun. Push the limits of your mind to make something
            amazing at St Aloysius.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <button
              onClick={onRegisterClick}
              className="btn-accent px-6 py-4 sm:px-8 sm:py-5 w-full sm:w-auto text-sm sm:text-base uppercase flex items-center justify-center gap-3"
            >
              Join FutureSprint <i className="fa-solid fa-arrow-right text-xs sm:text-sm"></i>
            </button>
            <Link
              href="#about"
              className="btn-outline px-6 py-4 sm:px-8 sm:py-5 w-full sm:w-auto text-sm sm:text-base text-center uppercase bg-white flex items-center justify-center"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Right: 90s Aesthetic PC */}
        <div className="relative w-full flex justify-center lg:justify-end mt-6 lg:mt-0 px-2 sm:px-0 z-10 reveal active">
          <div className="group relative w-full max-w-[480px] aspect-square sm:aspect-[4/3] bg-[#d4d0c8] shadow-brutal-lg sm:shadow-brutal-xl flex flex-col border-[3px] sm:border-4 border-brand-black border-t-white border-l-white transition-transform mx-auto lg:mr-0 lg:scale-105 origin-right">
            {/* Bezel / Screen container */}
            <div className="flex-1 m-3 sm:m-5 lg:m-6 bg-brand-black border-[3px] sm:border-4 border-[#808080] border-b-[#ffffff] border-r-[#ffffff] p-1.5 sm:p-2 relative flex flex-col">
              {/* Screen */}
              <div className="w-full flex-1 bg-[#008080] relative overflow-hidden font-sans">
                {/* Screen CRT overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background:
                      "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)",
                    backgroundSize: "100% 4px",
                  }}
                ></div>

                {/* Desktop Icons */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-3 sm:gap-5 text-white text-center w-12 sm:w-16 z-10">
                  <button
                    aria-label="My PC"
                    className="flex flex-col items-center hover:bg-blue-600/50 p-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
                    onClick={() =>
                      alert("SYSTEM:\n64MB RAM: OK\n200MB HDD: OK\nReady for Code Carnival.")
                    }
                  >
                    <i className="fa-solid fa-computer text-xl sm:text-3xl mb-1 drop-shadow-md"></i>
                    <span className="text-[8px] sm:text-[10px] leading-tight drop-shadow-md font-medium">
                      My PC
                    </span>
                  </button>
                  <button
                    aria-label="Future Sprint Folder"
                    className="flex flex-col items-center hover:bg-blue-600/50 p-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
                    onClick={onRegisterClick}
                  >
                    <i className="fa-solid fa-folder-open text-xl sm:text-3xl mb-1 text-yellow-400 drop-shadow-md"></i>
                    <span className="text-[8px] sm:text-[10px] leading-tight drop-shadow-md font-medium">
                      Sprint
                    </span>
                  </button>
                  <button
                    aria-label="Recycle Bin"
                    className="flex flex-col items-center hover:bg-blue-600/50 p-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
                    onClick={() =>
                      alert("The Recycle Bin is currently empty. Write some trash code first!")
                    }
                  >
                    <i className="fa-solid fa-trash-can text-xl sm:text-3xl mb-1 drop-shadow-md text-gray-300"></i>
                    <span className="text-[8px] sm:text-[10px] leading-tight drop-shadow-md font-medium">
                      Recycle
                    </span>
                  </button>
                </div>

                {/* Open Window */}
                {isWindowOpen && (
                  <div
                    ref={windowRef}
                    className="absolute w-[70%] sm:w-[75%] max-w-[280px] bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black z-10 shadow-xl transition-shadow duration-300"
                    style={{
                      top: `calc(15% + ${position.y}px)`,
                      left: `calc(20% + ${position.x}px)`,
                    }}
                  >
                    {/* Title Bar */}
                    <div
                      onMouseDown={handleMouseDown}
                      onTouchStart={handleMouseDown}
                      className="bg-[#000080] text-white px-1 sm:px-2 py-0.5 sm:py-1 flex justify-between items-center text-[10px] sm:text-xs font-bold cursor-move select-none active:bg-[#1010a0] touch-none h-6 sm:h-7"
                    >
                      <span className="truncate pr-2 select-none pointer-events-none">
                        FutureSprint.exe
                      </span>
                      <div className="flex gap-1 shrink-0 h-full py-[1px]">
                        <button
                          aria-label="Minimize"
                          className="w-4 h-full sm:w-5 bg-[#d4d0c8] border border-t-white border-l-white border-b-black border-r-black text-black flex items-center justify-center text-[10px] font-bold hover:bg-gray-200 active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                        >
                          _
                        </button>
                        <button
                          aria-label="Maximize"
                          className="w-4 h-full sm:w-5 bg-[#d4d0c8] border border-t-white border-l-white border-b-black border-r-black text-black flex items-center justify-center text-[10px] font-bold hover:bg-gray-200 active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                        >
                          □
                        </button>
                        <button
                          aria-label="Close"
                          className="w-4 h-full sm:w-5 bg-[#d4d0c8] border border-t-white border-l-white border-b-black border-r-black text-black flex items-center justify-center text-[10px] font-bold hover:bg-gray-200 active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                          onClick={(e) => { e.stopPropagation(); setIsWindowOpen(false); }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                    {/* Window Content */}
                    <div className="p-3 sm:p-5 text-center text-black text-[10px] sm:text-xs font-sans">
                      <div className="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-5 text-left">
                        <i className="fa-solid fa-circle-exclamation text-blue-600 text-2xl sm:text-4xl shrink-0 mt-0.5"></i>
                        <p className="leading-tight sm:leading-snug">
                          System is ready for code injection. <br />
                          Proceed to hackathon?{" "}
                          <span className="animate-pulse font-mono font-bold">_</span>
                        </p>
                      </div>
                      <div className="flex justify-center gap-2 sm:gap-4">
                        <button
                          onClick={onRegisterClick}
                          className="bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black px-4 sm:px-6 py-1 active:border-t-black active:border-l-black active:border-b-white active:border-r-white font-bold text-black outline-none focus:outline-dotted focus:outline-1 focus:outline-black focus:-outline-offset-4 hover:bg-gray-100 transition-colors shadow-sm"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Taskbar */}
                <div className="absolute bottom-0 w-full h-7 sm:h-9 bg-[#d4d0c8] border-t-2 border-white flex justify-between items-center px-0.5 sm:px-1 z-20">
                  <div className="flex items-center gap-0.5 sm:gap-1 h-full py-0.5 sm:py-1">
                    <button className="h-full flex items-center gap-1 bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black px-1.5 sm:px-2 font-bold text-[9px] sm:text-xs text-black shadow-[inset_1px_1px_0px_rgba(255,255,255,1)] active:border-t-black active:border-l-black active:border-b-white active:border-r-white active:shadow-none focus:outline-none">
                      <i className="fa-brands fa-windows text-blue-600"></i>{" "}
                      <span className="hidden sm:inline">Start</span>
                    </button>
                    <div className="h-full w-px bg-gray-400 mx-0.5 sm:mx-1 border-r border-white"></div>
                    <button
                      className={`h-full bg-[#d4d0c8] border-2 ${ 
                        isWindowOpen
                          ? "border-t-black border-l-black border-b-white border-r-white"
                          : "border-t-white border-l-white border-b-black border-r-black"
                      } px-1.5 sm:px-2 font-bold text-[9px] sm:text-xs text-black max-w-[80px] sm:max-w-[120px] truncate focus:outline-none`}
                      onClick={() => setIsWindowOpen(true)}
                    >
                      FutureSprint.exe
                    </button>
                  </div>
                  <div className="h-full py-0.5 sm:py-1 flex items-center">
                    <div className="h-full bg-[#d4d0c8] border-2 border-t-black border-l-black border-b-white border-r-white px-1 sm:px-2 text-[8px] sm:text-[10px] font-bold text-black flex items-center gap-1 sm:gap-2">
                      <i className="fa-solid fa-volume-high text-gray-600 hidden sm:block"></i>
                      12:20 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PC Base/Details */}
            <div className="h-6 sm:h-8 border-t-2 border-[#808080] mx-3 sm:mx-6 mb-2 sm:mb-3 flex justify-between items-center pt-1.5 sm:pt-2">
              <div className="text-[8px] sm:text-xs font-black tracking-widest text-brand-black/40">
                NEXUS_95
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-3 sm:w-5 h-1 bg-black/30 border-b border-white"></div>
                <div className="w-3 sm:w-5 h-1 bg-black/30 border-b border-white"></div>
                <div className="w-2.5 sm:w-4 sm:h-4 rounded-full bg-green-500 border border-black/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
