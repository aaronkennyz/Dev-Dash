"use client";

import { useEffect } from "react";

export interface BountyData {
  id: string;
  title: string;
  icon: string;
  desc: string;
  output: string;
  tech: string[];
}

interface BountyModalProps {
  isOpen: boolean;
  bounty: BountyData | null;
  onClose: () => void;
  onRegister: () => void;
}

export default function BountyModal({ isOpen, bounty, onClose, onRegister }: BountyModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !bounty) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      aria-labelledby="bounty-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-brand-black/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="bg-white w-full max-w-2xl relative z-10 flex flex-col max-h-[90vh] shadow-brutal-xl border-[4px] border-brand-black animate-in fade-in zoom-in-95 duration-200">
        <button
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-brand-red border-2 border-transparent hover:border-brand-black transition-all z-20 focus:outline-none focus:ring-2 focus:ring-brand-black"
        >
          <i className="fa-solid fa-xmark text-xl sm:text-2xl"></i>
        </button>

        <div className="p-6 sm:p-10 md:p-12 overflow-y-auto custom-scrollbar relative">
          <div className="mb-6 sm:mb-8 border-b-[3px] border-brand-black pb-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pr-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-black flex items-center justify-center text-white text-2xl sm:text-3xl shrink-0 shadow-brutal border-2 border-brand-black">
              <i className={`fa-solid ${bounty.icon}`}></i>
            </div>
            <div>
              <h3
                id="bounty-title"
                className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter mb-1 sm:mb-2"
              >
                {bounty.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-brand-red font-bold uppercase tracking-[0.2em] bg-red-50 inline-block px-2 py-1">
                Track Details
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-brand-darkGray text-base sm:text-lg leading-relaxed font-semibold">
              {bounty.desc}
            </p>

            <div className="bg-gray-50 p-4 sm:p-6 border-l-[4px] border-brand-red border-y-2 border-r-2 border-gray-200">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 sm:mb-3 text-brand-black">
                Expected Output
              </h4>
              <p className="text-sm sm:text-base font-semibold text-brand-darkGray leading-relaxed">
                {bounty.output}
              </p>
            </div>

            <div className="pt-2 sm:pt-4">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-widest mb-3 sm:mb-4 text-brand-black border-b-2 border-gray-200 pb-2 inline-block">
                Suggested Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
                {bounty.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-brand-black text-white px-3 py-1.5 text-[10px] sm:text-xs font-bold font-mono shadow-[2px_2px_0px_0px_rgba(225,29,72,1)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onRegister();
            }}
            className="btn-solid w-full py-4 sm:py-5 text-sm sm:text-base uppercase tracking-widest mt-8 sm:mt-12 flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-terminal"></i> Select & Register
          </button>
        </div>
      </div>
    </div>
  );
}
