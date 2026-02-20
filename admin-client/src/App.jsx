import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAdminAuth } from "./context/AdminAuthContext";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";

import DashboardHome from "./pages/admin/DashboardHome";
import Rooms from "./pages/admin/Rooms";
import Bookings from "./pages/admin/Bookings";
import Customers from "./pages/admin/Users";

const ProtectedRoute = ({ children }) => {
  const { token } = useAdminAuth();
  return token ? children : <Navigate to="/admin/login" />;
};

const App = () => {
  const { token } = useAdminAuth();

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={!token ? <AdminLogin /> : <Navigate to="/admin/dashboard" />} />
        <Route path="/admin/signup" element={!token ? <AdminSignup /> : <Navigate to="/admin/dashboard" />} />

        {/* DASHBOARD LAYOUT */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="users" element={<Customers />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
