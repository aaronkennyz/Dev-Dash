export default function Footer() {
  return (
    <footer className="border-t-[6px] border-brand-black bg-white py-8 md:py-16 relative z-10 w-full overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        <div className="flex items-center gap-3 text-brand-black group">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-black text-white flex items-center justify-center text-xs sm:text-sm font-bold group-hover:bg-brand-red transition-colors">
            F
          </div>
          <span className="font-black text-lg sm:text-xl uppercase tracking-tight">
            FutureSprint
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-darkGray">
          <a
            href="#"
            className="hover:text-brand-red hover:-translate-y-1 transition-all"
          >
            GitHub
          </a>
          <a
            href="#"
            className="hover:text-brand-red hover:-translate-y-1 transition-all"
          >
            Discord
          </a>
          <a
            href="#"
            className="hover:text-brand-red hover:-translate-y-1 transition-all"
          >
            Twitter
          </a>
        </div>

        <p className="font-mono text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
          © 2026 St Aloysius
        </p>
      </div>
    </footer>
  );
}
