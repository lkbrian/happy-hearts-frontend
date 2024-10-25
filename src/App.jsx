import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import NotFoundVisitor from "./Components/404";
import NotFoundLoggedIn from "./Components/NotFound";
import ProfileAndSettings from "./Components/ProfileAndSettings";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Splash from "./pages/Splash";
import Antinatal from "./parent/Antinatal";
import Appointments from "./parent/Appointments/Appointments";
import ChildInfo from "./parent/ChildInfo";
import Medications from "./parent/Medications";
import ParentDashboard from "./parent/ParentDashboard";
import ParentPortal from "./parent/ParentPortal";
import Prenatal from "./parent/Prenatal";
import ProviderAdmissions from "./Provider/ProviderAdmissions/Admissions";
import ProviderAppointments from "./Provider/ProviderAppointments/Appointments";
import ProviderDashboard from "./Provider/ProviderDashboard";
import ProviderDeliveries from "./Provider/ProviderDeliveries/Deliveries";
import ProviderDischargeSummaries from "./Provider/ProviderDischargeSummaries/DischargeSummaries";
import ProviderLabTests from "./Provider/ProviderLabTests/LabTests";
import ProvidersPortal from "./Provider/ProvidersPortal";
import UserAppointments from "./User/Appointments/UserAppointments";
import Facilities from "./User/Facilities";
import Medicines from "./User/Medicine/Medicines";
import Providers from "./User/ProviderManagement/Providers";
import UserDashboard from "./User/UserDashboard";
import UserPortal from "./User/UserPortal";
import Users from "./User/Users/Users";
import Vaccines from "./User/Vaccines/Vaccines";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import AuthenticatedRoutes from "./utils/AuthenticatedRoutes";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        {/* Protect the portal routes */}
        <Route element={<AuthenticatedRoutes />}>
          {/* Parent portal routes */}
          <Route element={<ParentPortal />}>
            <Route
              path="/parents/portal/dashboard"
              element={<ParentDashboard />}
            />
            <Route path="/parents/portal/prenatal" element={<Prenatal />} />
            <Route path="/parents/portal/antinatal" element={<Antinatal />} />
            <Route
              path="/parents/portal/medications"
              element={<Medications />}
            />
            <Route path="/parents/portal/child-info" element={<ChildInfo />} />
            <Route
              path="/parents/portal/appointments"
              element={<Appointments />}
            />
            <Route
              path="/account/profile-settings"
              element={<ProfileAndSettings />}
            />
          </Route>

          {/* User portal routes */}
          <Route element={<UserPortal />}>
            <Route path="/users/portal/dashboard" element={<UserDashboard />} />
            <Route path="/users/portal/user-management" element={<Users />} />
            <Route
              path="/users/portal/appointment-management"
              element={<UserAppointments />}
            />
            <Route
              path="/users/portal/medicine-management"
              element={<Medicines />}
            />
            <Route
              path="/users/portal/vaccine-management"
              element={<Vaccines />}
            />
            {/* <Route path="/users/portal/fac-management" element={<Users />} /> */}
            <Route
              path="/users/portal/facilities-management"
              element={<Facilities />}
            />
            <Route
              path="/users/portal/provider-management"
              element={<Providers />}
            />
            <Route
              path="/account/profile-settings"
              element={<ProfileAndSettings />}
            />
          </Route>

          {/* Providers portal routes */}
          <Route element={<ProvidersPortal />}>
            <Route
              path="/providers/portal/dashboard"
              element={<ProviderDashboard />}
            />
            <Route
              path="/providers/portal/appointment-management"
              element={<ProviderAppointments />}
            />
            <Route
              path="/providers/portal/labtests-management"
              element={<ProviderLabTests />}
            />
            <Route
              path="/providers/portal/deliveries-management"
              element={<ProviderDeliveries />}
            />
            <Route
              path="/providers/portal/dischargesummary-management"
              element={<ProviderDischargeSummaries />}
            />
            <Route
              path="/providers/portal/admissions-management"
              element={<ProviderAdmissions />}
            />
            <Route
              path="/account/profile-settings"
              element={<ProfileAndSettings />}
            />
          </Route>
        </Route>

        {/* Not Found Routes */}
        <Route
          path="*"
          element={isAuthenticated ? <NotFoundLoggedIn /> : <NotFoundVisitor />}
        />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
