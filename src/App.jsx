import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Splash from "./pages/Splash";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ParentPortal from "./parent/ParentPortal";
import Prenatal from "./parent/Prenatal";
// import AdminPortal from "./pages/AdminPortal";
// import ProviderPortal from "./pages/ProviderPortal";

function App() {
  return (
    <Box>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          {/* <Route path="/admin_portal/dashboard" element={<AdminPortal />} />
          <Route path="/providers_portal/dashboard" element={<ProviderPortal />} /> */}
          <Route path="/parent_portal/dashboard" element={<ParentPortal />} />
          <Route path="/parent_portal/prenatal" element={<Prenatal />} />
        </Routes>
        <Toaster />
    </Box>
  );
}

export default App;
