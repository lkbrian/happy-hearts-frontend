import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Privacy from "../pages/Privacy";
import TermsAndConditions from "../pages/TermsAndConditions";
import ParentProfile from "./ParentProfile";
import ProviderProfile from "./ProviderProfile";
import UserProfile from "./UserProfile";
import Settings from "./Settings";

function ProfileAndSettings() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [accountType, setAccountType] = useState();
  const userRole = sessionStorage.getItem("userRole");
  const roles = [
    "Pediatrician",
    "Obstetrician",
    "Gynecologist",
    "Pharmacist",
    "Laboratory Technician",
    "Nutritionist",
    "Mental Health Counselor",
    "Physiotherapist",
    "Speech Therapist",
  ];

  const userTypes = [
    "Admin",
    "Receptionist",
    "Quality Assurance Officer",
    "Account Desk",
    "It support",
  ];

  useEffect(() => {
    if (userRole === "parent") {
      setAccountType("parent");
    } else if (
      roles.some((role) => role.toLowerCase() === userRole.toLowerCase())
    ) {
      setAccountType("provider");
    } else if (
      userTypes.some((type) => type.toLowerCase() === userRole.toLowerCase())
    ) {
      setAccountType("staff");
    } else {
      setAccountType("guest");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole]);

  return (
    <Tabs
      bg={theme.colors.background[colorMode]}
      p={"10px"}
      borderRadius={".4rem"}
      h={"auto"}
    >
      <TabList borderBottomWidth="0" spacing={"20px"}>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Personal Information
        </Tab>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Terms & Condition
        </Tab>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Privacy Policy
        </Tab>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Settings
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {accountType === "parent" ? (
            <ParentProfile />
          ) : accountType === "provider" ? (
            <ProviderProfile />
          ) : accountType === "user" ? (
            <UserProfile />
          ) : (
            <Text>Guest Mode</Text>
          )}
        </TabPanel>
        <TabPanel>
          <TermsAndConditions />
        </TabPanel>
        <TabPanel>
          <Privacy />
        </TabPanel>

        <TabPanel>
          <Settings />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ProfileAndSettings;
