import { useState } from 'react';
import { getAppointments, deleteAppointment } from '../lib/adminData';
import type { Appointment } from '../lib/adminData';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Trash2, Mail, Phone, Calendar, Clock, FileText } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    getAppointments().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  );
  const [deleted, setDeleted] = useState(false);
  const [filterService, setFilterService] = useState<string>('all');

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(id);
      setAppointments(appointments.filter((apt) => apt.id !== id));
      setDeleted(true);
      setTimeout(() => setDeleted(false), 3000);
    }
  };

  const services = ['all', ...new Set(appointments.map((apt) => apt.service))];
  const filteredAppointments =
    filterService === 'all' ? appointments : appointments.filter((apt) => apt.service === filterService);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatCreatedAt = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {deleted && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            ✓ Appointment deleted successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3 overflow-x-auto pb-2">
        {services.map((service) => (
          <button
            key={service}
            onClick={() => setFilterService(service)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              filterService === service
                ? 'bg-[#D4AF37] text-[#0A165E]'
                : 'bg-white border-2 border-[#E2E8F0] text-[#0A165E] hover:border-[#D4AF37]'
            }`}
          >
            {service === 'all' ? 'All Services' : service}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 text-lg">No appointments yet</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A165E] mb-1">{appointment.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{appointment.service}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      <span>{appointment.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                      <span>{appointment.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs font-semibold mb-1">APPOINTMENT DATE</p>
                      <div className="flex items-center gap-2 text-[#0A165E] font-semibold">
                        <Calendar className="w-4 h-4 text-[#D4AF37]" />
                        {formatDate(appointment.date)}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-semibold mb-1">TIME</p>
                      <div className="flex items-center gap-2 text-[#0A165E] font-semibold">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        {appointment.time}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs font-semibold mb-1">BOOKED ON</p>
                    <p className="text-sm text-gray-600">{formatCreatedAt(appointment.createdAt)}</p>
                  </div>
                </div>

                {/* Notes */}
                {appointment.notes && (
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <FileText className="w-4 h-4 text-[#0A165E] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-[#0A165E] mb-1">NOTES</p>
                        <p className="text-sm text-gray-700">{appointment.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delete Button */}
                <div className="md:col-span-2 flex justify-end pt-2 border-t border-[#E2E8F0]">
                  <Button
                    onClick={() => handleDelete(appointment.id)}
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="pt-4 text-sm text-gray-600">
        <p>Total Appointments: <span className="font-bold text-[#0A165E]">{filteredAppointments.length}</span></p>
      </div>
    </div>
  );
}
