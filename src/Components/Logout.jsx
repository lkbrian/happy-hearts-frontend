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
      position={"fixed"}
      onClick={handleClick}
      w={"auto"}
      display={"flex"}
      color="#2179F3"
      bg={"#fff"}
      bottom={0}
      m={4}
      p={2}
      borderRadius={".4rem"}
      gap={"6px"}
      cursor={"pointer"}
      alignItems={"center"}
      shadow={"0 2px 8px rgba(0, 0, 0, 0.4)"}
    >
      <CgLogOut size={"20px"} />
      <Text>Logout</Text>
    </Box>
  );
}

export default Logout;
