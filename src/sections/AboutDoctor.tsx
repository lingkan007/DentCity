import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, GraduationCap, Shield, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const qualifications = [
  { icon: GraduationCap, text: 'BDS (DU)' },
  { icon: Award, text: 'PGT - Oral & Maxillofacial Surgery (Dhaka Dental College)' },
  { icon: Award, text: 'PGT - Conservative Dentistry & Endodontics' },
  { icon: Shield, text: 'BM&DC Registration: 6301' },
];

export default function AboutDoctor() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    if (!section || !titleEl) return;

    const ctx = gsap.context(() => {
      // Animate the image
      gsap.from(section.querySelector('.doctor-image'), {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=10%',
          toggleActions: 'play none none none',
        },
      });

      // Animate the content block
      gsap.from(section.querySelector('.doctor-content'), {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=10%',
          toggleActions: 'play none none none',
        },
      });

      // Animate qualification items
      gsap.from(section.querySelectorAll('.qual-item'), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section.querySelector('.qual-list'),
          start: 'top bottom-=5%',
          toggleActions: 'play none none none',
        },
      });

      // Animate the heading letters (dimensional-letter-entrance)
      const words = titleEl.querySelectorAll('.word');
      words.forEach((word) => {
        const chars = word.querySelectorAll('.letter');
        gsap.set(chars, { perspective: 2000 });
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            z: -800,
            rotationX: -90,
            yPercent: 20,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            z: 0,
            rotationX: 0,
            yPercent: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'back.out(1.2)',
            stagger: 0.03,
            scrollTrigger: {
              trigger: titleEl,
              start: 'top bottom-=10%',
              end: 'center center',
              scrub: 1.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Split text into letters
  const renderTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="letter"
        style={{ display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait Image */}
          <div className="doctor-image relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/dr-portrait.jpg"
                alt="Dr. Rashmin Islam - DentCity Dental Care"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A165E]/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#0A165E] text-white rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-[#D4AF37]" />
                <div>
                  <span
                    className="block text-2xl font-bold"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    10+
                  </span>
                  <span className="text-sm text-white/80">Years Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="doctor-content">
            <span
              className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              About the Doctor
            </span>

            <h2
              ref={titleRef}
              className="doctor-title text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A165E] mt-3 mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <div className="word">{renderTitle('Dr. ')}</div>
              <div className="word">{renderTitle('Rashmin Islam')}</div>
            </h2>

            <div className="qual-list space-y-4 mb-8">
              {qualifications.map((qual) => {
                const Icon = qual.icon;
                return (
                  <div
                    key={qual.text}
                    className="qual-item flex items-center gap-4 p-4 rounded-xl bg-[#F8FAFC]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0A165E]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#0A165E]" />
                    </div>
                    <span className="text-[#111827] font-medium text-sm sm:text-base">
                      {qual.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="prose prose-lg text-[#111827]/70 leading-relaxed">
              <p className="mb-4">
                Dr. Rashmin Islam is a highly skilled and compassionate dental
                surgeon committed to providing exceptional dental care to every
                patient. With extensive training from Dhaka University and
                specialized postgraduate training in Oral & Maxillofacial Surgery
                and Conservative Dentistry, he brings a wealth of expertise to
                DentCity Dental Care.
              </p>
              <p>
                Her patient-first philosophy ensures that every treatment plan is
                tailored to individual needs, prioritizing comfort, transparency,
                and long-term oral health. Dr. Islam believes that a beautiful
                smile is the foundation of confidence and overall well-being.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
