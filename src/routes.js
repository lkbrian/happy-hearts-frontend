import {
  FaHome,
  FaBaby,
  FaSyringe,
  FaFileMedical,
  FaUser,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  FaCapsules,
  FaHospital,
  FaHospitalUser,
  FaTruckMedical,
} from "react-icons/fa6";
import { GiHypodermicTest, GiTestTubes } from "react-icons/gi";
import { MdContactEmergency, MdOutlineChildCare } from "react-icons/md";
const adminRoutes = [
  { path: "/users/portal/dashboard", name: "Dashboard", icon: FaHome },
  {
    path: "/users/portal/appointment-management",
    name: "Appointments",
    icon: FaCalendarAlt,
  },
  {
    path: "/users/portal/user-management",
    name: "Users",
    icon: FaUser,
  },
  {
    path: "/users/portal/provider-management",
    name: "providers",
    icon: FaHospitalUser,
  },
  {
    path: "/users/portal/facilities-management",
    name: "facilities",
    icon: FaHospital,
  },
  {
    path: "/users/portal/medicine-management",
    name: "Medicine",
    icon: FaCapsules,
  },
  {
    path: "/users/portal/vaccine-management",
    name: "Vaccines",
    icon: GiHypodermicTest,
  },
];

const providerRoutes = [
  { path: "/providers/portal/dashboard", name: "Dashboard", icon: FaHome },
  {
    path: "/providers/portal/appointment-management",
    name: "Appointments",
    icon: FaUser,
  },
  {
    path: "/providers/portal/deliveries-management",
    name: "Deliveries",
    icon: FaTruckMedical,
  },
  {
    path: "/providers/portal/admissions-management",
    name: "Admissions",
    icon: MdContactEmergency,
  },
  {
    path: "/providers/portal/dischargesummary-management",
    name: "Discharge summaries",
    icon: FaHospitalUser,
  },
  {
    path: "/providers/portal/labtests-management",
    name: "Lab tests",
    icon: GiTestTubes,
  },
];

const routesConfig = {
  parent: [
    { path: "/parents/portal/dashboard", name: "Dashboard", icon: FaHome },
    { path: "/parents/portal/prenatal", name: "Pre-natal", icon: FaBaby },
    { path: "/parents/portal/aninatal", name: "Anti-natal", icon: FaSyringe },
    {
      path: "/parents/portal/appointments",
      name: "Appointments",
      icon: FaCalendarAlt,
    },
    {
      path: "/parents/portal/medications",
      name: "Medications",
      icon: FaFileMedical,
    },
    {
      path: "/parents/portal/child-info",
      name: "Child Information",
      icon: MdOutlineChildCare,
    },
    {
      path: "/parents/portal/personal-info",
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
