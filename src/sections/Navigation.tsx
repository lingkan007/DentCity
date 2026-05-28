import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Doctor', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-3"
            >
              <img
                src="/images/dentcity-logo.png"
                alt="DentCity Dental Care"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <span
                  className={`block text-lg font-bold leading-tight transition-colors duration-300 ${
                    scrolled ? 'text-[#0A165E]' : 'text-white'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  DentCity
                </span>
                <span
                  className={`block text-xs leading-tight tracking-wider transition-colors duration-300 ${
                    scrolled ? 'text-[#D4AF37]' : 'text-[#D4AF37]'
                  }`}
                >
                  DENTAL CARE
                </span>
              </div>
            </a>

            {/* Center Links - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#D4AF37] ${
                    scrolled ? 'text-[#0A165E]' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right - CTA + Phone */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+8801325677001"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                  scrolled ? 'text-[#0A165E]' : 'text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                +880 1325-677001
              </a>
              <button
                onClick={() => scrollToSection('#contact')}
                className="liquid-metal-btn text-sm !py-3 !px-6"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors ${
                scrolled ? 'text-[#0A165E]' : 'text-white'
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 lg:hidden ${
          mobileOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-2xl font-semibold text-[#0A165E] hover:text-[#D4AF37] transition-colors"
              style={{
                fontFamily: 'Poppins, sans-serif',
                animationDelay: `${index * 50}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="liquid-metal-btn mt-4"
          >
            Book Appointment
          </button>
          <a
            href="tel:+8801325677001"
            className="flex items-center gap-2 text-[#0A165E] font-medium mt-2"
          >
            <Phone className="w-5 h-5" />
            +880 1325-677001
          </a>
        </div>
      </div>
    </>
  );
}
