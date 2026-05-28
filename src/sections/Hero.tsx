import FluidBackground from '../components/FluidBackground';
import { ArrowRight, Clock } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <FluidBackground />

      {/* Readability vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,22,94,0.35) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-32">
        <span
          className="inline-block text-[#D4AF37] text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-6"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Dr. Rashmin Islam / BDS (DU)
        </span>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Your Smile Deserves
          <br />
          The Best Care
        </h1>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Experience world-class dental treatment in the heart of Dhaka. Gentle
          hands, modern technology, and a commitment to your comfort.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('#contact')}
            className="liquid-metal-btn flex items-center gap-2 group"
          >
            Book an Appointment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('#hours')}
            className="flex items-center gap-2 text-white/90 hover:text-[#D4AF37] transition-colors border border-white/30 hover:border-[#D4AF37] rounded-full px-6 py-4 backdrop-blur-sm"
          >
            <Clock className="w-5 h-5" />
            Free Consultation Hours
          </button>
        </div>
      </div>
    </section>
  );
}
