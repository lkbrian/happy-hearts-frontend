import { Box, Flex, useColorMode, useTheme } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import InnerFooter from "../Components/InnerFooter";
import { useAuth } from "../utils/AuthContext";
import { useParentStore } from "../utils/store";
import BreadCrumb from "../Components/BreadCrumb";

function ParentPortal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { parent, fetchParent } = useParentStore((state) => ({
    parent: state.parent,
    fetchParent: state.fetchParent,
  }));

  const { userRole } = useAuth();
  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!parent || parent.length === 0) {
      fetchParent(id); // Fetch parent data if not available
    }
    
  }, [parent, fetchParent, id]);

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
       justifyContent={'space-between'}
        overflowY={"scroll"}
        
        pr={"8px"}
        pt={'8px'}
        
        gap={"10px"}
        w={"100%"}
      >
        <Header />
          <BreadCrumb />
        <Box flexGrow={"1"}>
          <Outlet context={parent} />
        </Box>
        <InnerFooter />
      </Flex>
    </Flex>
  );
}

export default ParentPortal;
