import {
  Box,
  Flex,
  Stack,
  StackDivider,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { BsInfoCircle } from "react-icons/bs";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { LuSettings } from "react-icons/lu";
import { useAuth } from "../utils/AuthContext";
import { NavLink } from "react-router-dom";

function ProfileModal({ nodeRef }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { logout } = useAuth();

  const handleClick = async () => {
    await logout();
  };
  const role = sessionStorage.getItem("userRole");

  return (
    <Box
      ref={nodeRef}
      display={"none"}
      shadow={"0 4px 14px rgba(0, 0, 0, 0.2)"}
      pos={"absolute"}
      right={2}
      w={"230px"}
      bg={theme.colors.background[colorMode]}
      color={theme.colors.text[colorMode]}
      top={16}
      borderRadius={".4rem"}
    >
      <Stack
        divider={
          <StackDivider
            borderColor={colorMode === "light" ? "#d4d4d4" : "#2D3748"}
            px={"2px"}
            borderStyle={"dashed"}
          />
        }
      >
        <Flex gap={"16px"} padding={"8px 10px"}>
          <Box>
            <Text fontWeight={"550"} fontSize={"17px"}>
              Account Type
            </Text>
            <Text
              textTransform={"capitalize"}
              fontSize={"14px"}
              color={"#727272"}
            >
              {role}
            </Text>
          </Box>
        </Flex>

        <Box fontSize={"15px"} fontWeight={"500"}>
          <Flex
            w={"auto"}
            as={NavLink}
            p={2}
            gap={"6px"}
            cursor={"pointer"}
            to={"/account/profile-settings"}
            alignItems={"center"}
            _hover={{ color: "#2179F3", bg: theme.colors.sidebar[colorMode] }}
          >
            <CgProfile color="#2179F3" size={"20px"} />
            <Text>My profile</Text>
          </Flex>
          <Flex
            w={"auto"}
            p={2}
            as={NavLink}
            gap={"6px"}
            to={"/account/profile-settings"}
            cursor={"pointer"}
            alignItems={"center"}
            _hover={{ color: "#2179F3", bg: theme.colors.sidebar[colorMode] }}
          >
            <LuSettings color="#2179F3" size={"20px"} />
            <Text>Settings</Text>
          </Flex>
          <Flex
            w={"auto"}
            p={2}
            gap={"6px"}
            cursor={"pointer"}
            alignItems={"center"}
            _hover={{ color: "#2179F3", bg: theme.colors.sidebar[colorMode] }}
          >
            <BsInfoCircle color="#2179F3" size={"20px"} />
            <NavLink to={"#"}>Support</NavLink>
          </Flex>
          <Box
            onClick={handleClick}
            w={"auto"}
            display={"flex"}
            p={2}
            gap={"6px"}
            cursor={"pointer"}
            alignItems={"center"}
            _hover={{ color: "#2179F3", bg: theme.colors.sidebar[colorMode] }}
          >
            <CgLogOut color="#2179F3" size={"20px"} />
            <Text>Logout</Text>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProfileModal;
ProfileModal.propTypes = {
  nodeRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};
