import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

import { useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useAuth } from "../utils/AuthContext";
import { useParentStore } from "../utils/store";
import ParentDashboard from "./ParentDashboard";
import HeroSection from "../Components/HeroSection";
function ParentPortal() {
  const { parent, loading, fetchParent } = useParentStore((state) => ({
    parent: state.parent,
    loading: state.loading,
    fetchParent: state.fetchParent,
  }));

  const { userRole } = useAuth(); // assuming you still need this
  const id = localStorage.getItem("userId");

  useEffect(() => {
    if (!parent || parent.length === 0) {
      fetchParent(id); // Fetch only if parent data is not in the store
    }
  }, [parent, fetchParent, id]);

  return (
    <Flex
      pos={"relative"}
      bg={"#EDEFF8"}
      h={"100vh"}
      overflow={"hidden"}
      flexDir={"row"}
    >
      <Sidebar userRole={userRole} />
      {loading ? (
        <Box
          display={"flex"}
          flexDir={"column"}
          w={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner size={"lg"} />
          <Text>Please wait loading data</Text>
        </Box>
      ) : (
        <Flex flexDir={"column"} m={"16px"} gap={"10px"} w={"100%"}>
          <Header />
          <HeroSection />
          <ParentDashboard />
        </Flex>
      )}
    </Flex>
  );
}

export default ParentPortal;
