import { Box, Flex, useColorMode, useTheme } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import InnerFooter from "../Components/InnerFooter";
import { useAuth } from "../utils/AuthContext";
import { useParentsStore } from "../utils/store";
import BreadCrumb from "../Components/BreadCrumb";

function ParentPortal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { data, fetchAllData } = useParentsStore((state) => ({
    data: state.data,
    fetchAllData: state.fetchAllData,
  }));
  const { userRole } = useAuth();
  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchAllData(id);
    console.log(data, id);
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
        ml={"16px"}
        justifyContent={"space-between"}
        overflowY={"scroll"}
        pr={"8px"}
        pt={"8px"}
        gap={"10px"}
        w={"100%"}
      >
        <Header />
        <BreadCrumb />
        <Box flexGrow={"1"}>
          <Outlet context={data} />
        </Box>
        <InnerFooter />
      </Flex>
    </Flex>
  );
}

export default ParentPortal;
