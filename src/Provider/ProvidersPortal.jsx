import { Box, Flex, useColorMode, useTheme } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import InnerFooter from "../Components/InnerFooter";
import Sidebar from "../Components/Sidebar";
import { useAuth } from "../utils/AuthContext";
import { useProviderStore } from "../utils/store";
import { useEffect } from "react";

function ProvidersPortal() {
  const { userRole } = useAuth();
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { provider, fetchProvider } = useProviderStore((state) => ({
    provider: state.provider,
    fetchProvider: state.fetchProvider,
  }));

  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!provider || provider.length === 0) {
      fetchProvider(id);
    }
  });
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
        mt={0}
        overflowY={"scroll"}
        mr={0}
        pr={"5px"}
        mb={0}
        gap={"10px"}
        w={"100%"}
      >
        <Box pt={"16px"}>
          <Header />
        </Box>

        <Box flexGrow={"1"}>
          <Outlet context={provider} />
        </Box>
        <InnerFooter />
      </Flex>
    </Flex>
  );
}

export default ProvidersPortal;
