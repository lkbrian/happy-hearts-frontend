import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import { SmallCloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-icon.svg";
import routesConfig from "../routes"; // Import the routes config

function Drawer({navRef,onClose}) {
  const theme = useTheme();
  const role = sessionStorage.getItem('userRole')
  const { colorMode } = useColorMode();
  const routes = routesConfig[role] || [];

  return (
    <Box
      ref={navRef}
      color={theme.colors.text[colorMode]}
      h={"100vh"}
      bg={theme.colors.background[colorMode]}
      w="250px"
      minW={"250px"}
      zIndex="1001"
      display={"none"}
      flexDir={"column"}
      justify={"space-between"}
      pos={"absolute"}
      top={0}
      left={0}
    >
      <Flex
        direction="row"
        align="center"
        borderRadius={"50%"}
        // alignSelf={"center"}
        p={"6px"}
        gap={"10px"}
        mt={"20px"}
        justifyContent={"space-between"}
      >
        <Flex align={"center"}>
          {" "}
          <Image src={logo} w="40px" alt="Clinic Logo" />
          <Text
            fontWeight={700}
            fontSize={"20px"}
            color={theme.colors.text[colorMode]}
          >
            Happy Hearts
          </Text>
        </Flex>
        <Box
          bg={"#2179f3"}
          color={"#fff"}
          // color={theme.colors.icon[colorMode]}
          size={"40px"}
          onClick={onClose}
          mr={"4px"}
          cursor={"pointer"}
          p={2}
          display={"flex"}
          alignItems={'center'}
          borderRadius={'50%'}
        >
          <SmallCloseIcon />
        </Box>
      </Flex>
      <Stack mt={"30px"} letterSpacing={"1px"}>
        {routes.map(({ path, name, icon: Icon }) => (
          <NavLink key={path} className={"sidebar_link"} to={path}>
            <Icon style={{ marginRight: "10px" }} />
            {name}
          </NavLink>
        ))}
      </Stack>
      <Box></Box>
    </Box>
  );
}

export default Drawer;
Drawer.propTypes = {
  navRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  onClose: PropTypes.func.isRequired,
};