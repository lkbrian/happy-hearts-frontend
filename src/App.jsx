import { Box } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Splash from "./pages/Splash";
import ParentPortal from "./parent/ParentPortal";
import Prenatal from "./parent/Prenatal";
import ParentDashboard from "./parent/ParentDashboard";
import Medications from "./parent/Medications";
import ChildInfo from "./parent/ChildInfo";
import Antinatal from "./parent/Antinatal";
import UserPortal from "./User/UserPortal";
import UserDashboard from "./User/UserDashboard";
import ProvidersPortal from "./Provider/ProvidersPortal";
import ProviderDashboard from "./Provider/ProviderDashboard";
import PersonalInfo from "./parent/PersonalInfo";
import Appointments from "./parent/Appointments";
import ProviderAppointments from "./Provider/ProviderAppointments/Appointments";
import ProviderLabTests from "./Provider/ProviderLabTests/LabTests";
import ProviderDeliveries from "./Provider/ProviderDeliveries/Deliveries";
import ProviderDischargeSummaries from "./Provider/ProviderDischargeSummaries/DischargeSummaries";
import ProviderAdmissions from "./Provider/ProviderAdmissions/Admissions";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        {/*parent portal */}
        <Route element={<ParentPortal />}>
          <Route
            path="/parent_portal/dashboard"
            element={<ParentDashboard />}
          />
          <Route path="/parent_portal/prenatal" element={<Prenatal />} />
          <Route path="/parent_portal/aninatal" element={<Antinatal />} />
          <Route path="/parent_portal/medications" element={<Medications />} />
          <Route path="/parent_portal/child_info" element={<ChildInfo />} />
          <Route
            path="/parent_portal/appointments"
            element={<Appointments />}
          />
          <Route
            path="/parent_portal/personal_info"
            element={<PersonalInfo />}
          />
        </Route>

        {/* UserPortal */}
        <Route element={<UserPortal />}>
          <Route path="/user_portal/dashboard" element={<UserDashboard />} />
        </Route>

        {/* ProvidersPortal */}
        <Route element={<ProvidersPortal />}>
          <Route
            path="/provider_portal/dashboard"
            element={<ProviderDashboard />}
          />
          <Route
            path="/provider_portal/appointment-management"
            element={<ProviderAppointments />}
          />
          <Route
            path="/provider_portal/labtests-management"
            element={<ProviderLabTests />}
          />
          <Route
            path="/provider_portal/deliveries-management"
            element={<ProviderDeliveries />}
          />
          <Route
            path="/provider_portal/dischargesummary-management"
            element={<ProviderDischargeSummaries />}
          />
          <Route
            path="/provider_portal/dischargesummary-management"
            element={<ProviderDischargeSummaries />}
          />
          <Route
            path="/provider_portal/admissions-management"
            element={<ProviderAdmissions />}
          />
        </Route>
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
