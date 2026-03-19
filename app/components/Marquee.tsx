export default function Marquee() {
  return (
    <div className="bg-brand-red py-4 sm:py-5 overflow-hidden relative z-20 border-y-[6px] border-brand-black shadow-brutal-lg sm:shadow-brutal-xl w-[105%] -ml-[2.5%] -rotate-1 hover:rotate-0 transition-transform duration-500 cursor-crosshair marquee-container">
      <div className="animate-marquee text-brand-black font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.2em] gap-6 sm:gap-10 items-center whitespace-nowrap">
        <span>{"// 8 HOURS TO BUILD"}</span>
        <i className="fa-solid fa-bolt text-lg sm:text-xl text-white"></i>
        <span>ST ALOYSIUS CODE CARNIVAL</span>
        <i className="fa-solid fa-bolt text-lg sm:text-xl text-white"></i>
        <span>HACK THE SYSTEM</span>
        <i className="fa-solid fa-bolt text-lg sm:text-xl text-white"></i>
        <span>{"// 8 HOURS TO BUILD"}</span>
        <i className="fa-solid fa-bolt text-lg sm:text-xl text-white"></i>
        <span>ST ALOYSIUS CODE CARNIVAL</span>
        <i className="fa-solid fa-bolt text-lg sm:text-xl text-white"></i>
        <span>HACK THE SYSTEM</span>
        <i className="fa-solid fa-bolt text-lg sm:text-xl text-white"></i>
      </div>
    </div>
  );
}
