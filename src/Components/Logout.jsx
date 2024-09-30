import { Box, Text } from "@chakra-ui/react";
import { CgLogOut } from "react-icons/cg";
import { useAuth } from "../utils/AuthContext";

function Logout() {
  const { logout } = useAuth();

  const handleClick = async () => {
    await logout();
  };
  return (
    <Box
      onClick={handleClick}
      w={"auto"}
      display={"flex"}
      p={2}
      gap={"6px"}
      cursor={"pointer"}
      alignItems={"center"}
      _hover={{ color: "#2179F3", bg: "#e9f0fca1" }}
      // shadow={"0 2px 8px rgba(0, 0, 0, 0.4)"}
    >
      <CgLogOut color="#2179F3" size={"20px"} />
      <Text>Logout</Text>
    </Box>
  );
}

export default Logout;
