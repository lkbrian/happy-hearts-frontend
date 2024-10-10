import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import propTypes from "prop-types";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-icon.svg";
import routesConfig from "../routes"; // Import the routes config
import { useBreadStore } from "../utils/store";

function Sidebar({ userRole }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const routes = routesConfig[userRole] || []; // Get routes based on user role

  const setSelectedItem = useBreadStore((state) => state.setSelectedItem); // Get the setter from Zustand store

  const handleClick = (name) => {
    setSelectedItem(name); // Set the selected item
  };

  return (
    <Box
      color={theme.colors.text[colorMode]}
      h={"100vh"}
      bg={theme.colors.background[colorMode]}
      w="250px"
      minW={"250px"}
      zIndex="1"
      display={{ base: "none", xl: "flex" }}
      flexDir={"column"}
      justify={"space-between"}
    >
      {/* Logo and Clinic Name */}
      <Flex
        direction="row"
        align="center"
        borderRadius={"50%"}
        alignSelf={"center"}
        m={"20px 0"}
        gap={"10px"}
      >
        <Image src={logo} w="70px" alt="Clinic Logo" />
        <Text
          fontWeight={700}
          fontSize={"22px"}
          color={theme.colors.text[colorMode]}
        >
          Happy Hearts
        </Text>
      </Flex>
      <Stack mt={"30px"} letterSpacing={"1px"}>
        {routes.map(({ path, name, icon: Icon }) => (
          <NavLink
            key={path}
            className={"sidebar_link"}
            to={path}
            onClick={() => handleClick(name)}
          >
            <Icon style={{ marginRight: "10px" }} />
            {name}
          </NavLink>
        ))}
      </Stack>
    </Box>
  );
}

export default Sidebar;
Sidebar.propTypes = {
  userRole: propTypes.string,
};
