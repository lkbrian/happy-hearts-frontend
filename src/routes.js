import {
  FaHome,
  FaBaby,
  FaSyringe,
  FaFileMedical,
  FaUser,
  FaUserShield,
} from "react-icons/fa";
import { MdOutlineChildCare } from "react-icons/md";
const adminRoutes = [
  { path: "/user_portal/dashboard", name: "Dashboard", icon: FaHome },
  { path: "/user_portal/user-management", name: "users", icon: FaUser },
];
const providerRoutes = [
  { path: "/provider_portal/dashboard", name: "Dashboard", icon: FaHome },
  {
    path: "/provider_portal/appointment-management",
    name: "Appointments",
    icon: FaUser,
  },
];
const routesConfig = {
  parent: [
    { path: "/parent_portal/dashboard", name: "Dashboard", icon: FaHome },
    { path: "/parent_portal/prenatal", name: "Pre-natal", icon: FaBaby },
    { path: "/parent_portal/aninatal", name: "Anti-natal", icon: FaSyringe },
    {
      path: "/parent_portal/medications",
      name: "Medications",
      icon: FaFileMedical,
    },
    {
      path: "/parent_portal/child_info",
      name: "Child Information",
      icon: MdOutlineChildCare,
    },
    {
      path: "/parent_portal/personal_info",
      name: "Personal Information",
      icon: FaUserShield,
    },
  ],
  admin: adminRoutes,
  reception_desk: adminRoutes,
  provider: providerRoutes,
  nurse: providerRoutes,
};

export default routesConfig;
