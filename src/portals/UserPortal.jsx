import { Box, Flex, useColorMode, useTheme } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import InnerFooter from "../Components/InnerFooter";
import Sidebar from "../Components/Sidebar";
import { useAuth } from "../utils/AuthContext";
import { useUsersStore } from "../utils/store";
import { useEffect } from "react";

function UserPortal() {
  const { userRole } = useAuth();
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { data, fetchAllData } = useUsersStore((state) => ({
    data: state.data,
    fetchAllData: state.fetchAllData,
  }));
  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex
      pos={"relative"}
      bg={theme.colors.primary[colorMode]}
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
          <Outlet context={data} />
        </Box>
        <InnerFooter />
      </Flex>
    </Flex>
  );
}

export default UserPortal;
