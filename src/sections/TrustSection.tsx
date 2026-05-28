import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Users, Award, Smile } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: '5000+', label: 'Happy Patients' },
  { icon: Award, value: '10+', label: 'Years Experience' },
  { icon: Smile, value: '15+', label: 'Dental Services' },
  { icon: Shield, value: '100%', label: 'Sterilized Tools' },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll('.stat-item'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=10%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 bg-[#0A165E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="stat-item text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <span
                  className="block text-3xl md:text-4xl font-bold text-white mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {stat.value}
                </span>
                <span className="text-white/60 text-sm">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
