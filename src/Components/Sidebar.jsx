import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import routesConfig from "../routes"; // Import the routes config
import logo from "../assets/logo-icon.svg";
import Logout from "./Logout";
import propTypes from "prop-types";

function Sidebar({ userRole }) {
  const routes = routesConfig[userRole] || []; // Get routes based on user role

  return (
    <Box
      color={"#47556A"}
      h={"100vh"}
      bg="#fff"
      w="250px"
      minW={"250px"}
      zIndex="1"
      display={"flex"}
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
        <Text fontWeight={700} fontSize={"22px"} color={"#47556A"}>
          Happy Hearts
        </Text>
      </Flex>

      <Stack mt={"30px"} letterSpacing={"1px"} spacing={4}>
        {routes.map(({ path, name, icon: Icon }) => (
          <NavLink key={path} className={"sidebar_link"} to={path}>
            <Icon style={{ marginRight: "10px" }} />
            {name}
          </NavLink>
        ))}
      </Stack>

      <Box>
        <Logout />
      </Box>
    </Box>
  );
}

export default Sidebar;
Sidebar.propTypes = {
  userRole: propTypes.string,
};
