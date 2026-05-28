import { useState } from 'react';
import { X, CheckCircle, Calendar, Clock, User, Phone, Mail, FileText } from 'lucide-react';
import { saveAppointment } from '../lib/adminData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConsultationType = 'free' | 'paid';

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    problem: '',
    date: '',
    time: '',
    type: 'free' as ConsultationType,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save appointment to admin data system
    saveAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.type === 'free' ? 'Free Consultation' : 'Paid Appointment',
      date: formData.date,
      time: formData.time,
      notes: formData.problem,
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        problem: '',
        date: '',
        time: '',
        type: 'free',
      });
      onClose();
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const timeSlots = [
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM',
    '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#0A165E]/50 hover:text-[#0A165E] transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3
              className="text-2xl font-semibold text-[#0A165E] mb-3"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Booking Confirmed!
            </h3>
            <p className="text-[#111827]/70">
              Thank you for booking with DentCity Dental Care. We will contact you
              shortly to confirm your appointment.
            </p>
          </div>
        ) : (
          <>
            <div className="p-8 pb-0">
              <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
                Book Now
              </span>
              <h3
                className="text-2xl font-semibold text-[#0A165E] mt-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Book an Appointment
              </h3>
              <p className="text-[#111827]/70 text-sm mt-2">
                Fill in your details and we will get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A165E]/40" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A165E]/40" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A165E]/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm"
                />
              </div>

              {/* Problem */}
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-5 h-5 text-[#0A165E]/40" />
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="Describe your dental problem..."
                  rows={3}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm resize-none"
                />
              </div>

              {/* Date */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A165E]/40" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm"
                />
              </div>

              {/* Time */}
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A165E]/40" />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm appearance-none"
                >
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Consultation Type */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, type: 'free' }))
                  }
                  className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    formData.type === 'free'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0A165E]'
                      : 'border-[#E2E8F0] text-[#111827]/60 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Free Consultation
                  <span className="block text-xs font-normal mt-1">
                    4 PM - 6 PM
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, type: 'paid' }))
                  }
                  className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    formData.type === 'paid'
                      ? 'border-[#0A165E] bg-[#0A165E]/10 text-[#0A165E]'
                      : 'border-[#E2E8F0] text-[#111827]/60 hover:border-[#0A165E]/50'
                  }`}
                >
                  Paid Appointment
                  <span className="block text-xs font-normal mt-1">
                    6 PM - 10 PM
                  </span>
                </button>
              </div>

              <button type="submit" className="liquid-metal-btn w-full !py-4">
                Confirm Booking
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
