import {
  FaHome,
  FaBaby,
  FaSyringe,
  FaFileMedical,
  FaUser,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";
import { FaHospitalUser, FaTruckMedical } from "react-icons/fa6";
import { GiTestTubes } from "react-icons/gi";
import { MdContactEmergency, MdOutlineChildCare } from "react-icons/md";
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
  {
    path: "/provider_portal/deliveries-management",
    name: "Deliveries",
    icon: FaTruckMedical,
  },
  {
    path: "/provider_portal/admissions-management",
    name: "Admissions",
    icon: MdContactEmergency,
  },
  {
    path: "/provider_portal/dischargesummary-management",
    name: "Discharge summaries",
    icon: FaHospitalUser,
  },
  {
    path: "/provider_portal/labtests-management",
    name: "Lab tests",
    icon: GiTestTubes,
  },
];

const routesConfig = {
  parent: [
    { path: "/parent_portal/dashboard", name: "Dashboard", icon: FaHome },
    { path: "/parent_portal/prenatal", name: "Pre-natal", icon: FaBaby },
    { path: "/parent_portal/aninatal", name: "Anti-natal", icon: FaSyringe },
    {
      path: "/parent_portal/appointments",
      name: "Appointments",
      icon: FaCalendarAlt,
    },
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
  pharmacist: providerRoutes,
  lab_technician: providerRoutes,
};

export default routesConfig;
