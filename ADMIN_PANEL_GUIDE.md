# Admin Panel Setup Guide

## Access the Admin Panel

1. **Go to Admin Login**: Navigate to `/admin-login`
2. **Default Password**: `admin123` (Change this in [src/pages/AdminLogin.tsx](src/pages/AdminLogin.tsx#L6))
3. **After Login**: You'll be redirected to the admin dashboard

## Features

### 1. Manage Weekly Schedule
- Edit clinic hours for each day
- Set free consultation time slots
- Mark days as "Closed" if needed
- Changes are saved to browser localStorage

### 2. View Appointment List
- See all client appointments in real-time
- Filter appointments by service type (Free Consultation, Paid Appointment)
- View appointment details:
  - Client name, email, phone
  - Appointment date and time
  - Service type
  - Client notes
- Delete appointments if needed

## How It Works

### Data Storage
- All data is stored in **localStorage** (browser storage)
- This data persists even after refreshing the page
- For production, connect to a backend database

### Appointment Booking Flow
1. Client books appointment via the "Book Now" button on homepage
2. Appointment data is automatically saved to admin system
3. Admin can view all bookings in the Appointments tab

## Integration Points

### Files Updated:
- [src/App.tsx](src/App.tsx) - Added admin routes with protection
- [src/sections/BookingModal.tsx](src/sections/BookingModal.tsx) - Saves appointments
- [src/sections/ClinicHours.tsx](src/sections/ClinicHours.tsx) - Uses dynamic schedule
- [src/lib/adminData.ts](src/lib/adminData.ts) - Data management functions
- [src/pages/AdminLogin.tsx](src/pages/AdminLogin.tsx) - Login page
- [src/pages/Admin.tsx](src/pages/Admin.tsx) - Main admin dashboard
- [src/components/AdminScheduleManager.tsx](src/components/AdminScheduleManager.tsx) - Schedule editor
- [src/components/AdminAppointmentList.tsx](src/components/AdminAppointmentList.tsx) - Appointment viewer

## Security Notes

### Current Implementation (Demo)
- Simple password-based login stored in code
- Credentials: `admin123`

### For Production:
1. Replace password authentication with proper backend authentication (JWT, OAuth, etc.)
2. Add role-based access control (RBAC)
3. Use encrypted connection (HTTPS)
4. Move backend data to database instead of localStorage
5. Add audit logs for data changes

## Customization

### Change Admin Password
Edit [src/pages/AdminLogin.tsx](src/pages/AdminLogin.tsx#L6):
```typescript
const ADMIN_PASSWORD = 'your-new-password'; // Change this
```

### Add More Admin Functions
Create new components in `src/components/Admin*.tsx` and add tabs in [src/pages/Admin.tsx](src/pages/Admin.tsx)

### Connect to Backend
Update functions in [src/lib/adminData.ts](src/lib/adminData.ts) to use API calls instead of localStorage
