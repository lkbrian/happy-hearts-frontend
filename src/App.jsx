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

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
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
            path="/parent_portal/personal_info"
            element={<PersonalInfo />}
          />
        </Route>
        <Route element={<UserPortal />}>
          <Route path="/user_portal/dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<ProvidersPortal />}>
          <Route
            path="/provider_portal/dashboard"
            element={<ProviderDashboard />}
          />
        </Route>
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
