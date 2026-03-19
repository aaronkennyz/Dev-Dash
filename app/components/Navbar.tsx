"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  onRegisterClick: () => void;
}

export default function Navbar({ onRegisterClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={`fixed w-full z-50 transition-all duration-300 py-4 border-b ${
        isScrolled
          ? "shadow-md border-gray-200 bg-white/90"
          : "border-transparent bg-white/60"
      } backdrop-blur-xl`}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-4"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-black flex items-center justify-center text-white font-bold transition-transform group-hover:rotate-12 group-hover:bg-brand-red text-sm sm:text-base">
            F
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight uppercase">
            FutureSprint
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-brand-darkGray">
          <Link href="#about" className="hover:text-brand-red transition-colors">
            About
          </Link>
          <Link href="#tracks" className="hover:text-brand-red transition-colors">
            Bounties
          </Link>
          <button
            onClick={onRegisterClick}
            className="btn-solid px-6 py-2.5 rounded-none"
          >
            Register Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-btn"
          aria-label="Toggle Menu"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
          className="md:hidden text-brand-black hover:text-brand-red transition-colors p-2 -mr-2 focus:outline-none"
        >
          <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } absolute top-full left-0 w-full bg-white border-b-4 border-brand-black py-6 px-5 flex-col gap-4 z-40 shadow-2xl origin-top transition-all`}
      >
        <Link
          href="#about"
          onClick={closeMobileMenu}
          className="text-lg font-black uppercase text-brand-black hover:text-brand-red mobile-link py-2 border-b-2 border-gray-100"
        >
          About
        </Link>
        <Link
          href="#tracks"
          onClick={closeMobileMenu}
          className="text-lg font-black uppercase text-brand-black hover:text-brand-red mobile-link py-2 border-b-2 border-gray-100"
        >
          Bounties
        </Link>
        <button
          onClick={() => {
            closeMobileMenu();
            onRegisterClick();
          }}
          className="btn-solid w-full py-4 mt-4 text-base uppercase shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          Register Now
        </button>
      </div>
    </nav>
  );
}
