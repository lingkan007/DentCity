import { Routes, Route, Navigate } from 'react-router'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'

// Protected route component
function ProtectedRoute({ element }: { element: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true'
  return isAuthenticated ? element : <Navigate to="/admin-login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
    </Routes>
  )
}
