import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Farhana Ahmed',
    image: '/images/patient-1.jpg',
    rating: 5,
    text: 'Dr. Rashmin Islam is absolutely amazing! I was terrified of dental visits, but his gentle approach and patience made my root canal treatment completely painless. The clinic is so modern and clean. Highly recommend!',
    treatment: 'Root Canal Treatment',
  },
  {
    name: 'Kamal Hossain',
    image: '/images/patient-2.jpg',
    rating: 5,
    text: 'I brought my entire family to DentCity Dental Care. From my kids dental checkups to my wifes cosmetic procedure, every visit has been exceptional. The staff is friendly and Dr. Islam truly cares about his patients.',
    treatment: 'Family Dental Care',
  },
  {
    name: 'Sadia Rahman',
    image: '/images/patient-3.jpg',
    rating: 5,
    text: 'The teeth whitening results exceeded my expectations! I finally have the confident smile I always wanted. The free consultation was thorough and they explained every step. Best dental clinic in Uttara!',
    treatment: 'Teeth Whitening',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.testimonials-header'), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=10%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="testimonials-header text-center mb-16">
          <span
            className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Testimonials
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A165E] mt-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            What Our Patients Say
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Large quote icon */}
          <Quote className="absolute -top-8 left-0 w-24 h-24 text-[#0A165E]/[0.05]" />

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-[#F8FAFC] rounded-3xl p-8 md:p-12 text-center relative">
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className={`w-5 h-5 ${
                            si < t.rating
                              ? 'text-[#D4AF37] fill-[#D4AF37]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-lg md:text-xl text-[#111827]/80 leading-relaxed mb-8 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-[#D4AF37]/20"
                        loading="lazy"
                      />
                      <div className="text-left">
                        <span
                          className="block font-semibold text-[#0A165E]"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {t.name}
                        </span>
                        <span className="text-sm text-[#D4AF37]">
                          {t.treatment}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-[#0A165E]/5 hover:bg-[#0A165E] hover:text-white text-[#0A165E] flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-[#D4AF37]'
                      : 'w-2 bg-[#0A165E]/20 hover:bg-[#0A165E]/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-[#0A165E]/5 hover:bg-[#0A165E] hover:text-white text-[#0A165E] flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
