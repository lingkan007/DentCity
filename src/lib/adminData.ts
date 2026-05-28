// Admin data management utilities

export interface ScheduleItem {
  day: string;
  hours: string;
  free: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
}

const SCHEDULE_KEY = 'clinic_schedule';
const APPOINTMENTS_KEY = 'clinic_appointments';

const DEFAULT_SCHEDULE: ScheduleItem[] = [
  { day: 'Monday', hours: '4:00 PM - 10:00 PM', free: '4:00 PM - 6:00 PM' },
  { day: 'Tuesday', hours: '4:00 PM - 10:00 PM', free: '4:00 PM - 6:00 PM' },
  { day: 'Wednesday', hours: '4:00 PM - 10:00 PM', free: '4:00 PM - 6:00 PM' },
  { day: 'Thursday', hours: '4:00 PM - 10:00 PM', free: '4:00 PM - 6:00 PM' },
  { day: 'Friday', hours: '4:00 PM - 10:00 PM', free: '4:00 PM - 6:00 PM' },
  { day: 'Saturday', hours: '4:00 PM - 10:00 PM', free: '4:00 PM - 6:00 PM' },
  { day: 'Sunday', hours: 'Closed', free: '-' },
];

// Schedule Management
export const getSchedule = (): ScheduleItem[] => {
  try {
    const stored = localStorage.getItem(SCHEDULE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_SCHEDULE;
  } catch {
    return DEFAULT_SCHEDULE;
  }
};

export const saveSchedule = (schedule: ScheduleItem[]): void => {
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
};

export const updateScheduleDay = (day: string, hours: string, free: string): void => {
  const schedule = getSchedule();
  const index = schedule.findIndex((item) => item.day === day);
  if (index !== -1) {
    schedule[index] = { day, hours, free };
    saveSchedule(schedule);
  }
};

// Appointments Management
export const getAppointments = (): Appointment[] => {
  try {
    const stored = localStorage.getItem(APPOINTMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment => {
  const appointments = getAppointments();
  const newAppointment: Appointment = {
    ...appointment,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  return newAppointment;
};

export const deleteAppointment = (id: string): void => {
  const appointments = getAppointments().filter((apt) => apt.id !== id);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
};

export const updateAppointment = (id: string, updates: Partial<Appointment>): void => {
  const appointments = getAppointments();
  const index = appointments.findIndex((apt) => apt.id === id);
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...updates };
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  }
};
