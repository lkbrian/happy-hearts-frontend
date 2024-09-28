import {
  FaHome,
  FaBaby,
  FaSyringe,
  FaFileMedical,
  FaUser,
  FaUserShield,
} from "react-icons/fa";

const routesConfig = {
  parent: [
    { path: "/parent_portal/dashboard", name: "Dashboard", icon: FaHome },
    { path: "/parent_portal/prenatal", name: "Pre-natal", icon: FaBaby },
    { path: "/parent_portal/aninatal", name: "Anti-natal", icon: FaSyringe },
    { path: "/parent_portal/medications", name: "Medications", icon: FaFileMedical },
    { path: "/parent_portal/child_info", name: "Child Information", icon: FaUser },
    { path: "/parent_portal/personal_info", name: "Personal Information", icon: FaUserShield },
  ],
  admin: [
    { path: "/dashboard", name: "Dashboard", icon: FaHome },
    { path: "/child_info", name: "Child Information", icon: FaUser },
  ],
  user: [
    { path: "/dashboard", name: "Dashboard", icon: FaHome },
    { path: "/child_info", name: "Child Information", icon: FaUser },
  ],
};

export default routesConfig;
