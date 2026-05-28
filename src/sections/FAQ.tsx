import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What are your clinic hours?',
    answer:
      'We are open Monday through Saturday from 4:00 PM to 10:00 PM. Free consultations are available from 4:00 PM to 6:00 PM. We are closed on Sundays.',
  },
  {
    question: 'Is the first consultation really free?',
    answer:
      'Yes! We offer free consultations from 4:00 PM to 6:00 PM, Monday through Saturday. During this consultation, Dr. Islam will examine your dental health and recommend the best treatment plan.',
  },
  {
    question: 'Do I need to book an appointment?',
    answer:
      'While walk-ins are welcome, we recommend booking an appointment to ensure minimal waiting time. You can book online through our website or call us at +880 1325-677001.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept cash, mobile banking (bKash, Nagad, Rocket), and all major debit/credit cards. We also offer installment plans for major treatments.',
  },
  {
    question: 'Is root canal treatment painful?',
    answer:
      'Not at all! With modern anesthesia and Dr. Islams gentle technique, root canal treatment at DentCity is virtually painless. Most patients report feeling comfortable throughout the procedure.',
  },
  {
    question: 'Do you treat children?',
    answer:
      'Absolutely! We have a dedicated pediatric dentistry service. Our team is specially trained to make children feel comfortable and at ease during their dental visits.',
  },
  {
    question: 'What should I do in a dental emergency?',
    answer:
      'For dental emergencies like severe toothaches, broken teeth, or injuries, call us immediately at +880 1325-677001. We prioritize emergency cases and will accommodate you as quickly as possible.',
  },
  {
    question: 'How do I maintain good oral hygiene?',
    answer:
      'Brush twice daily with fluoride toothpaste, floss regularly, avoid sugary foods, and visit your dentist every 6 months for checkups and professional cleaning.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.faq-header'), {
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

      gsap.from(section.querySelectorAll('.faq-item'), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section.querySelector('.faq-list'),
          start: 'top bottom-=5%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="faq-header text-center mb-16">
          <span
            className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A165E] mt-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="faq-list space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-[#F8FAFC] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span
                  className="text-[#0A165E] font-medium pr-4"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#0A165E] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-6 text-[#111827]/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
