import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Clock,
  MapPin,
  Phone,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { getSchedule } from '../lib/adminData';
import type { ScheduleItem } from '../lib/adminData';

gsap.registerPlugin(ScrollTrigger);

export default function ClinicHours() {
  const sectionRef = useRef<HTMLElement>(null);
  const [schedule] = useState<ScheduleItem[]>(() => getSchedule());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.hours-header'), {
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

      gsap.from(section.querySelectorAll('.schedule-row'), {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: section.querySelector('.schedule-table'),
          start: 'top bottom-=5%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(section.querySelector('.contact-card'), {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.querySelector('.contact-card'),
          start: 'top bottom-=10%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const today = new Date().getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[today];

  return (
    <section
      id="hours"
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hours-header mb-16">
          <span
            className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Visit Us
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A165E] mt-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Clinic Hours & Location
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Schedule Table */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-[#0A165E]" />
              <h3
                className="text-xl font-semibold text-[#0A165E]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Weekly Schedule
              </h3>
            </div>

            <div className="schedule-table bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-3 gap-4 p-4 bg-[#0A165E] text-white text-sm font-medium">
                <span>Day</span>
                <span>Hours</span>
                <span>Free Consultation</span>
              </div>
              {schedule.map((item) => {
                const isToday = item.day === todayName;
                return (
                  <div
                    key={item.day}
                    className={`schedule-row grid grid-cols-3 gap-4 p-4 text-sm transition-colors ${
                      isToday
                        ? 'bg-[#D4AF37]/10 border-l-4 border-[#D4AF37]'
                        : 'border-b border-[#E2E8F0] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        isToday ? 'text-[#D4AF37]' : 'text-[#0A165E]'
                      }`}
                    >
                      {item.day}
                      {isToday && (
                        <span className="ml-2 text-xs bg-[#D4AF37] text-white px-2 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </span>
                    <span className="text-[#111827]/80">{item.hours}</span>
                    <span className="flex items-center gap-1 text-[#111827]/80">
                      {item.free !== '-' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {item.free}
                        </>
                      ) : (
                        '-'
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Card */}
          <div className="contact-card">
            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8 h-64 bg-[#0A165E]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1!2d90.3994!3d23.8742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUyJzI3LjEiTiA5MMKwMjMnNTcuOSJF!5e0!3m2!1sen!2sbd!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) hue-rotate(200deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DentCity Dental Care Location"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3
                className="text-xl font-semibold text-[#0A165E] mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Contact Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0A165E]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#0A165E]" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-[#0A165E]">
                      Address
                    </span>
                    <span className="text-sm text-[#111827]/70">
                      House: 10 (Ground Floor), Road: 01, Sector: 06,
                      <br />
                      Uttara, Dhaka-1230
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0A165E]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#0A165E]" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-[#0A165E]">
                      Phone
                    </span>
                    <a
                      href="tel:+8801325677001"
                      className="text-sm text-[#111827]/70 hover:text-[#D4AF37] transition-colors block"
                    >
                      +880 1325-677001
                    </a>
                    <a
                      href="tel:+8801325677002"
                      className="text-sm text-[#111827]/70 hover:text-[#D4AF37] transition-colors block"
                    >
                      +880 1325-677002
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0A165E]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#0A165E]" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-[#0A165E]">
                      Working Hours
                    </span>
                    <span className="text-sm text-[#111827]/70">
                      Mon - Sat: 4:00 PM - 10:00 PM
                    </span>
                    <span className="text-sm text-green-600 font-medium block">
                      Free Consultation: 4:00 PM - 6:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
