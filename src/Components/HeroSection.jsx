import { Box } from "@chakra-ui/react";

function HeroSection() {
  return (
    <Box
      bg={"linear-gradient(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"}
      color={"#47556A"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"12px 20px"}
      width={"100%"}
      h={"250px"}
      borderRadius={".4rem"}
    
    >
      <Box color={'#fff'}>Welcome Back</Box>
      <Box></Box>
    </Box>
  );
}

export default HeroSection