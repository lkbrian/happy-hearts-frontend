import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Header from "./Header";
import InnerFooter from "./InnerFooter";
import Sidebar from "./Sidebar";
import { useAuth } from "../utils/AuthContext";

function NotFound() {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const theme = useTheme();
  const { colorMode } = useColorMode();
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

        <Box
          h={"85vh"}
          borderRadius={".4rem"}
          bg={theme.colors.background[colorMode]}
        >
          <Box
            h={"100%"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign={"center"}
          >
            {" "}
            <Heading>OOPS! Page Not Found! </Heading>
            <Text>
              But no worries! Our team is looking ever where while you wait
              safely.
            </Text>
            <Box overflow={"hidden"} h={"50vh"}>
              <Image objectFit={"cover"} h={"100%"} src="/Error.png" />
            </Box>
            <Box
              my={"10px"}
              onClick={() => navigate(-1)}
              scale={1}
              bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
              color={"#fff"}
              _hover={{
                bg: "linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
                scale: ".85",
              }}
              // bgClip="text"
              cursor={"pointer"}
              px={"40px"}
              py={"10px"}
              borderRadius={".4rem"}
            >
              Go Back
            </Box>
          </Box>
        </Box>
        <InnerFooter />
      </Flex>
    </Flex>
  );
}

export default NotFound;
