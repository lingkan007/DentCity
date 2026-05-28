import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Stethoscope,
  Sparkles,
  Activity,
  Scissors,
  Palette,
  Baby,
  Smile,
  Zap,
  Syringe,
  Shield,
  HeartPulse,
  Clock,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Stethoscope,
    title: 'Dental Checkup',
    description:
      'Comprehensive oral examination to assess your dental health and catch issues early.',
  },
  {
    icon: Sparkles,
    title: 'Scaling & Polishing',
    description:
      'Professional cleaning to remove plaque, tartar, and stains for a brighter smile.',
  },
  {
    icon: Activity,
    title: 'Root Canal Treatment',
    description:
      'Pain-free root canal therapy to save infected teeth and restore function.',
  },
  {
    icon: Scissors,
    title: 'Tooth Extraction',
    description:
      'Safe and gentle extraction of damaged or problematic teeth with minimal discomfort.',
  },
  {
    icon: Palette,
    title: 'Cosmetic Dentistry',
    description:
      'Transform your smile with veneers, bonding, and other aesthetic procedures.',
  },
  {
    icon: Smile,
    title: 'Smile Designing',
    description:
      'Customized smile makeover plans to achieve your perfect, natural-looking smile.',
  },
  {
    icon: Zap,
    title: 'Teeth Whitening',
    description:
      'Professional whitening treatments for a noticeably brighter, confident smile.',
  },
  {
    icon: Baby,
    title: 'Pediatric Dentistry',
    description:
      'Gentle, child-friendly dental care to build healthy habits from an early age.',
  },
  {
    icon: Syringe,
    title: 'Dental Filling',
    description:
      'Tooth-colored fillings to repair cavities and restore tooth structure seamlessly.',
  },
  {
    icon: Shield,
    title: 'Orthodontics',
    description:
      'Braces and aligners to straighten teeth and correct bite issues effectively.',
  },
  {
    icon: HeartPulse,
    title: 'Gum Treatment',
    description:
      'Specialized care for gum disease, from gingivitis to advanced periodontitis.',
  },
  {
    icon: Clock,
    title: 'Emergency Dental Care',
    description:
      'Urgent dental care for toothaches, broken teeth, and other emergencies.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.services-header'), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=10%',
          toggleActions: 'play none none none',
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=5%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="services-header mb-16">
          <span
            className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Our Services
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A165E] mt-3 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Comprehensive Dental
            <br />
            Solutions
          </h2>
          <p className="text-[#111827]/70 text-lg mt-4 max-w-xl">
            From routine checkups to advanced procedures, we offer complete dental
            care tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group relative bg-white rounded-2xl border border-[#E2E8F0] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
                style={{
                  borderTopWidth: '3px',
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#0A165E]/5 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/10 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#0A165E] group-hover:text-[#D4AF37] transition-colors duration-300" />
                </div>
                <h3
                  className="text-xl font-semibold text-[#0A165E] mb-3"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {service.title}
                </h3>
                <p className="text-[#111827]/70 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
