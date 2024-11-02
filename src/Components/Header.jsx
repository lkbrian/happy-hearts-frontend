import { HamburgerIcon, MoonIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { AiFillSun } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa6";
import useDisclose from "../utils/useDisclose";
import useToggle from "../utils/useToggle";
import Drawer from "./Drawer";
import ProfileModal from "./ProfileModal";

function Header() {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { nodeRef, toggleModal } = useToggle();
  const { navRef, toggleDrawer } = useDisclose();
  return (
    <>
      <Drawer navRef={navRef} onClose={toggleDrawer} />

      <Box
        as="header"
        bg={theme.colors.background[colorMode]}
        color={"#47556A"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"12px 20px"}
        width={"100%"}
        h={"70px"}
        borderRadius={".4rem"}
        position="sticky"
        top={0}
        zIndex={1000}
        backdropBlur={"8px"}
      >
        <Flex gap={"28px"} align={"center"}>
          <HamburgerIcon
            onClick={toggleDrawer}
            fontSize={"28px"}
            cursor={"pointer"}
            color={theme.colors.icon[colorMode]}
            display={{ base: "block", xl: "none" }}
          />
          <InputGroup
            bg={theme.colors.primary[colorMode]}
            w={"300px"}
            borderRadius={".4rem"}
            border={"none"}
          >
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              border={"none"}
              outline={"none"}
              placeholder={"Search...."}
              aria-label="Search"
            />
          </InputGroup>
        </Flex>
        <Flex gap={"30px"} align={"center"}>
          <Flex
            align={"center"}
            gap={"5px"}
            onClick={toggleColorMode}
            cursor={"pointer"}
          >
            {colorMode === "dark" ? (
              <Text color={theme.colors.text[colorMode]}>light</Text>
            ) : (
              <Text>dark</Text>
            )}
            {colorMode === "dark" ? (
              <AiFillSun
                fontSize={"28px"}
                color={theme.colors.icon[colorMode]}
              />
            ) : (
              <MoonIcon
                fontSize={"20px"}
                color={theme.colors.icon[colorMode]}
              />
            )}
          </Flex>
          <FaEnvelope color={theme.colors.text[colorMode]} size={"22px"} />
          <Avatar
            // icon={<AiOutlineUser fontSize="1.5rem" />}
            size="md"
            bg={"#101f3c"}
            onClick={toggleModal}
            cursor={"pointer"}
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
          >
            <AvatarBadge boxSize=".8rem" bg="green.500" />
          </Avatar>
          <ProfileModal nodeRef={nodeRef} />
        </Flex>
      </Box>
    </>
  );
}

export default Header;
