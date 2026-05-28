import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: '/images/clinic-1.jpg', alt: 'Modern Dental Treatment Room' },
  { src: '/images/clinic-2.jpg', alt: 'Advanced Dental Equipment' },
  { src: '/images/clinic-3.jpg', alt: 'Sterilization Room' },
  { src: '/images/dr-portrait.jpg', alt: 'Dr. Rashmin Islam' },
  { src: '/images/patient-1.jpg', alt: 'Happy Patient' },
  { src: '/images/patient-2.jpg', alt: 'Satisfied Patient' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.gallery-header'), {
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

      gsap.from(section.querySelectorAll('.gallery-item'), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section.querySelector('.gallery-grid'),
          start: 'top bottom-=5%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () =>
    setLightbox((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  const nextImage = () =>
    setLightbox((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );

  return (
    <>
      <section ref={sectionRef} className="w-full py-24 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gallery-header text-center mb-16">
            <span
              className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Gallery
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A165E] mt-3"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Our Clinic
            </h2>
          </div>

          <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                className={`gallery-item group relative overflow-hidden rounded-2xl cursor-pointer ${
                  i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0A165E]/0 group-hover:bg-[#0A165E]/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 text-white/80 hover:text-white p-2"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 text-white/80 hover:text-white p-2"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <span className="absolute bottom-4 text-white/80 text-sm">
            {images[lightbox].alt}
          </span>
        </div>
      )}
    </>
  );
}
