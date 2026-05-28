import { useState } from 'react';
import { LogOut, Calendar, ClipboardList } from 'lucide-react';
import { Button } from '../components/ui/button';
import ScheduleManager from '../components/AdminScheduleManager';
import AppointmentList from '../components/AdminAppointmentList';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'appointments'>('schedule');

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0A165E] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Clinic Admin Panel
            </h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-[#0A165E]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'schedule'
                ? 'bg-[#D4AF37] text-[#0A165E]'
                : 'bg-white text-[#0A165E] border-2 border-[#E2E8F0] hover:border-[#D4AF37]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <Calendar className="w-5 h-5" />
            Manage Schedule
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'appointments'
                ? 'bg-[#D4AF37] text-[#0A165E]'
                : 'bg-white text-[#0A165E] border-2 border-[#E2E8F0] hover:border-[#D4AF37]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ClipboardList className="w-5 h-5" />
            Appointments
          </button>
        </div>

        {/* Content */}
        <div className="mb-12">
          {activeTab === 'schedule' && <ScheduleManager />}
          {activeTab === 'appointments' && <AppointmentList />}
        </div>
      </div>
    </div>
  );
}
