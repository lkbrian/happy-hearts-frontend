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
import ParentDashboard from "./portals/ParentDashboard";
import ParentPortal from "./portals/ParentPortal";
import ProviderDashboard from "./portals/ProviderDashboard";
import ProvidersPortal from "./portals/ProvidersPortal";
import Admissions from "./Tables/Admissions";
import Births from "./Tables/Births";
import Children from "./Tables/Children";
import Deliveries from "./Tables/Deliveries";
import Discharges from "./Tables/Discharges";
import Facilities from "./Tables/Facilities";
import LabTests from "./Tables/LabTests";
import MedicalInfo from "./Tables/MedicalInfo";
import Medications from "./Tables/Medications";
import Medicines from "./Tables/Medicines";
import PresentPregnancy from "./Tables/PresentPregnancy";
import PreviousPregnancy from "./Tables/PreviousPregnancy";
import Providers from "./Tables/Providers";
import Users from "./Tables/Users";
import VaccinationRecords from "./Tables/VaccinationRecords";
import Vaccines from "./Tables/Vaccines";
import UserDashboard from "./portals/UserDashboard";
import UserPortal from "./portals/UserPortal";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import AuthenticatedRoutes from "./utils/AuthenticatedRoutes";
import Appointments from "./Tables/Appointments";
import Prescriptions from "./Tables/Prescriptions";

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
            <Route
              path="/parents/portal/appointments"
              element={<Appointments />}
            />
            <Route path="/parents/portal/admissions" element={<Admissions />} />
            <Route path="/parents/portal/births" element={<Births />} />
            <Route path="/parents/portal/children" element={<Children />} />
            <Route path="/parents/portal/deliveries" element={<Deliveries />} />
            <Route path="/parents/portal/discharges" element={<Discharges />} />
            <Route path="/parents/portal/labtests" element={<LabTests />} />
            <Route
              path="/parents/portal/medications"
              element={<Medications />}
            />
            <Route
              path="/parents/portal/medical-info"
              element={<MedicalInfo />}
            />
            <Route
              path="/parents/portal/prescriptions"
              element={<Prescriptions />}
            />
            <Route
              path="/parents/portal/present-pregnancy"
              element={<PresentPregnancy />}
            />
            <Route
              path="/parents/portal/previous-pregnancy"
              element={<PreviousPregnancy />}
            />
            <Route
              path="/parents/portal/vaccination-records"
              element={<VaccinationRecords />}
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
              element={<Appointments />}
            />
            <Route path="/users/portal/birth-management" element={<Births />} />
            <Route
              path="/users/portal/prescriptions-management"
              element={<Prescriptions />}
            />
            <Route
              path="/users/portal/medicine-management"
              element={<Medicines />}
            />
            <Route
              path="/users/portal/vaccine-management"
              element={<Vaccines />}
            />
            <Route
              path="/users/portal/facilities-management"
              element={<Facilities />}
            />
            <Route
              path="/users/portal/provider-management"
              element={<Providers />}
            />
            <Route
              path="/users/portal/admissions-management"
              element={<Admissions />}
            />
            <Route path="/users/portal/children" element={<Children />} />
            <Route
              path="/users/portal/deliveries-management"
              element={<Deliveries />}
            />
            <Route
              path="/users/portal/discharge-management"
              element={<Discharges />}
            />
            <Route
              path="/users/portal/labtests-management"
              element={<LabTests />}
            />
            <Route
              path="/users/portal/medications-management"
              element={<Medications />}
            />
            <Route
              path="/users/portal/medical-info"
              element={<MedicalInfo />}
            />
            <Route
              path="/users/portal/present-pregnancy"
              element={<PresentPregnancy />}
            />
            <Route
              path="/users/portal/previous-pregnancy"
              element={<PreviousPregnancy />}
            />
            <Route
              path="/users/portal/vaccination-records"
              element={<VaccinationRecords />}
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
              element={<Appointments />}
            />
            <Route path="/providers/portal/children" element={<Children />} />
            <Route
              path="/providers/portal/birth-management"
              element={<Births />}
            />
            <Route
              path="/providers/portal/prescriptions-management"
              element={<Prescriptions />}
            />
            <Route
              path="/providers/portal/labtests-management"
              element={<LabTests />}
            />
            <Route
              path="/providers/portal/deliveries-management"
              element={<Deliveries />}
            />
            <Route
              path="/providers/portal/dischargesummary-management"
              element={<Discharges />}
            />
            <Route
              path="/providers/portal/admissions-management"
              element={<Admissions />}
            />
            <Route
              path="/providers/portal/medicine-management"
              element={<Medicines />}
            />
            <Route
              path="/providers/portal/medications-management"
              element={<Medications />}
            />
            <Route
              path="/providers/portal/medical-info"
              element={<MedicalInfo />}
            />
            <Route
              path="/providers/portal/present-pregnancy"
              element={<PresentPregnancy />}
            />
            <Route
              path="/providers/portal/previous-pregnancy"
              element={<PreviousPregnancy />}
            />
            <Route
              path="/providers/portal/vaccine-management"
              element={<Vaccines />}
            />
            <Route
              path="/providers/portal/vaccination-records"
              element={<VaccinationRecords />}
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
