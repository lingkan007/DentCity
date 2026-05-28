import {
  Phone,
  MapPin,
  Mail,
  Facebook,
  MessageCircle,
  Clock,
  Shield,
  Award,
  HeartPulse,
} from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Doctor', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  'Root Canal Treatment',
  'Scaling & Polishing',
  'Cosmetic Dentistry',
  'Teeth Whitening',
  'Pediatric Dentistry',
  'Dental Surgery',
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="w-full bg-[#0A165E] text-white">
      {/* Trust Badges */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <span className="block font-semibold text-sm">Sterilized</span>
                <span className="text-xs text-white/60">Equipment</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <span className="block font-semibold text-sm">Certified</span>
                <span className="text-xs text-white/60">BM&DC 6301</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <span className="block font-semibold text-sm">Patient First</span>
                <span className="text-xs text-white/60">Care Approach</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <span className="block font-semibold text-sm">10+ Years</span>
                <span className="text-xs text-white/60">Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/dentcity-logo.png"
                alt="DentCity Dental Care"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <span
                  className="block text-lg font-bold text-white"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  DentCity
                </span>
                <span className="text-xs text-[#D4AF37] tracking-wider">
                  DENTAL CARE
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Committed to Dental Excellence. We provide world-class dental care
              with a gentle touch, modern technology, and a patient-first
              philosophy.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-lg font-semibold mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-lg font-semibold mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#services');
                    }}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-lg font-semibold mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  House: 10 (Ground Floor)
                  <br />
                  Road: 01, Sector: 06
                  <br />
                  Uttara, Dhaka-1230
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <div>
                  <a
                    href="tel:+8801325677001"
                    className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm block"
                  >
                    +880 1325-677001
                  </a>
                  <a
                    href="tel:+8801325677002"
                    className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm block"
                  >
                    +880 1325-677002
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <a
                  href="mailto:info@dentcity.com"
                  className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  info@dentcity.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-white/40 text-sm">
              &copy; 2025 DentCity Dental Care. All rights reserved.
            </span>
            <span className="text-white/40 text-sm">
              Designed with care for your smile
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
