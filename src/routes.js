import {
  // FaUserShield,
  FaCalendarAlt,
  // FaBaby,
  // FaSyringe,
  FaFileMedical,
  FaHistory,
  FaHome,
  FaUser,
} from "react-icons/fa";
import {
  FaBabyCarriage,
  FaCapsules,
  FaClipboardCheck,
  FaClipboardList,
  FaFlask,
  FaHospital,
  FaHospitalUser,
  FaPrescriptionBottle,
  FaSyringe,
  FaTruckMedical,
} from "react-icons/fa6";
import { GiHypodermicTest, GiTestTubes } from "react-icons/gi";
import { MdContactEmergency, MdOutlineChildCare } from "react-icons/md";
const adminRoutes = [
  { path: "/users/portal/dashboard", name: "Dashboard", icon: FaHome },
  {
    path: "/users/portal/admissions-management",
    name: "Admissions",
    icon: MdContactEmergency,
  },
  {
    path: "/users/portal/appointment-management",
    name: "Appointments",
    icon: FaCalendarAlt,
  },
  {
    path: "/users/portal/children",
    name: "Children",
    icon: MdOutlineChildCare,
  },
  {
    path: "/users/portal/birth-management",
    name: "Births",
    icon: MdOutlineChildCare,
  },
  {
    path: "/users/portal/deliveries-management",
    name: "Deliveries",
    icon: FaTruckMedical,
  },
  {
    path: "/users/portal/discharge-management",
    name: "Discharges",
    icon: FaClipboardList,
  },
  {
    path: "/users/portal/facilities-management",
    name: "facilities",
    icon: FaHospital,
  },
  {
    path: "/users/portal/labtests-management",
    name: "Lab Tests",
    icon: GiTestTubes,
  },

  {
    path: "/users/portal/medicine-management",
    name: "Medicine",
    icon: FaCapsules,
  },
  {
    path: "/users/portal/medications-management",
    name: "Medications",
    icon: FaFileMedical,
  },
  {
    path: "/users/portal/prescriptions-management",
    name: "Prescriptions",
    icon: FaPrescriptionBottle,
  },
  {
    path: "/users/portal/medical-info",
    name: "Medical Info",
    icon: FaFileMedical,
  },
  {
    path: "/users/portal/present-pregnancy",
    name: "Present pregnacies",
    icon: FaBabyCarriage,
  },
  {
    path: "/users/portal/previous-pregnancy",
    name: "Previous pregnacies",
    icon: FaHistory,
  },
  {
    path: "/users/portal/vaccination-records",
    name: "Vaccination records",
    icon: FaSyringe,
  },
  {
    path: "/users/portal/provider-management",
    name: "Providers",
    icon: FaHospitalUser,
  },
  {
    path: "/users/portal/user-management",
    name: "Users",
    icon: FaUser,
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
    path: "/providers/portal/admissions-management",
    name: "Admissions",
    icon: MdContactEmergency,
  },
  {
    path: "/providers/portal/appointment-management",
    name: "Appointments",
    icon: FaCalendarAlt,
  },
  {
    path: "/providers/portal/children",
    name: "Children",
    icon: MdOutlineChildCare,
  },
  {
    path: "/providers/portal/birth-management",
    name: "Births",
    icon: MdOutlineChildCare,
  },
  {
    path: "/providers/portal/deliveries-management",
    name: "Deliveries",
    icon: FaTruckMedical,
  },
  {
    path: "/providers/portal/discharge-management",
    name: "Discharges",
    icon: FaClipboardList,
  },
  {
    path: "/providers/portal/labtests-management",
    name: "Lab Tests",
    icon: GiTestTubes,
  },
  {
    path: "/providers/portal/medicine-management",
    name: "Medicine",
    icon: FaCapsules,
  },
  {
    path: "/providers/portal/medications-management",
    name: "Medications",
    icon: FaFileMedical,
  },
  {
    path: "/users/portal/prescriptions-management",
    name: "Prescriptions",
    icon: FaPrescriptionBottle,
  },
  {
    path: "/providers/portal/medical-info",
    name: "Medical Info",
    icon: FaFileMedical,
  },
  {
    path: "/providers/portal/present-pregnancy",
    name: "Present pregnacies",
    icon: FaBabyCarriage,
  },
  {
    path: "/providers/portal/previous-pregnancy",
    name: "Previous pregnacies",
    icon: FaHistory,
  },
  {
    path: "/providers/portal/vaccine-management",
    name: "Vaccines",
    icon: GiHypodermicTest,
  },
  {
    path: "/providers/portal/vaccination-records",
    name: "Vaccination records",
    icon: FaSyringe,
  },
];

const routesConfig = {
  parent: [
    { path: "/parents/portal/dashboard", name: "Dashboard", icon: FaHome },
    {
      path: "/parents/portal/admissions",
      name: "Admissions",
      icon: FaHospitalUser,
    },
    {
      path: "/parents/portal/appointments",
      name: "Appointments",
      icon: FaCalendarAlt,
    },
    {
      path: "/parents/portal/children",
      name: "Children",
      icon: MdOutlineChildCare,
    },
    {
      path: "/parents/portal/births",
      name: "Births",
      icon: MdOutlineChildCare,
    },
    {
      path: "/parents/portal/deliveries",
      name: "Deliveries",
      icon: FaTruckMedical,
    },
    {
      path: "/parents/portal/discharges",
      name: "Discharges",
      icon: FaClipboardList,
    },
    { path: "/parents/portal/labtests", name: "Lab Tests", icon: FaFlask },

    {
      path: "/parents/portal/medications",
      name: "Medications",
      icon: FaCapsules,
    },
    {
      path: "/parents/portal/medical-info",
      name: "Medical Info",
      icon: FaFileMedical,
    },

    {
      path: "/parents/portal/prescriptions",
      name: "Prescriptions",
      icon: FaPrescriptionBottle,
    },
    {
      path: "/parents/portal/present-pregnancy",
      name: "Present pregnacies",
      icon: FaBabyCarriage,
    },
    {
      path: "/parents/portal/previous-pregnancy",
      name: "Previous pregnacies",
      icon: FaHistory,
    },
    {
      path: "/parents/portal/vaccination-records",
      name: "Vaccination records",
      icon: FaClipboardCheck,
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
