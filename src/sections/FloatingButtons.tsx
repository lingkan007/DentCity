import { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import BookingModal from './BookingModal';

export default function FloatingButtons() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  return (
    <>
      {/* Main FAB */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Secondary buttons */}
        <div
          className={`flex flex-col gap-3 transition-all duration-300 ${
            fabOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <a
            href="tel:+8801325677001"
            className="w-12 h-12 rounded-full bg-[#0A165E] text-white flex items-center justify-center shadow-lg hover:bg-[#0A165E]/90 transition-colors"
            title="Call Now"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/8801325677001"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
            title="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        {/* Primary FAB */}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className="w-14 h-14 rounded-full bg-[#D4AF37] text-[#0A165E] flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        >
          {fabOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
        </button>
      </div>

      {/* Floating Book Button (left side) */}
      <button
        onClick={() => setBookingOpen(true)}
        className="fixed bottom-6 left-6 z-50 liquid-metal-btn !py-3 !px-5 text-sm shadow-xl"
      >
        Book Now
      </button>

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
