import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import InnerFooter from "../Components/InnerFooter";
import Sidebar from "../Components/Sidebar";
import { useAuth } from "../utils/AuthContext";

function UserPortal() {
  const { userRole } = useAuth();

  return (
    <Flex
      pos={"relative"}
      bg={"#EDEFF8"}
      h={"100vh"}
      overflow={"hidden"}
      flexDir={"row"}
    >
      {/* Sidebar */}
      <Sidebar userRole={userRole} />

      {/* Main content area */}
      <Flex
        flexDir={"column"}
        m={"16px"}
        overflowY={"scroll"}
        mr={0}
        pr={"5px"}
        mb={0}
        gap={"10px"}
        w={"100%"}
      >
        <Header />
        <Box flexGrow={"1"}>
          <Outlet />
        </Box>
        <InnerFooter />
      </Flex>
    </Flex>
  );
}

export default UserPortal;
