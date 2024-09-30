import { MoonIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Text, useColorMode, useTheme } from "@chakra-ui/react";
import { AiFillSun } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  const theme = useTheme()
  const{colorMode,toggleColorMode}= useColorMode()
  
  return (
    <Flex
      justify="space-between"
      width={"100%"}
      px={{ base: 4, md: 50 }}
      h={70}
      align={"center"}
      top={0}
      pos={"fixed"}
      zIndex={"2"}
      bg={theme.colors.background[colorMode]}
    >
      <Flex
        direction="row"
        align="center"
        borderRadius={"50%"}
        alignSelf={"center"}
        m={"20px 0"}
        gap={"10px"}
      >
        <Image src={"/favicon.ico"} w="50px" alt="Clinic Logo" />
        <Text
          fontWeight={700}
          fontSize={"22px"}
          bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
          bgClip="text"
        >
          Happy Hearts
        </Text>
      </Flex>
      <Box display="flex" gap={4} mr={"50px"}>
        <HashLink smooth to='#home' className="links" >
          Home
        </HashLink>
        <HashLink className="links"smooth to="#about">
          About
        </HashLink>
        <HashLink className="links" smooth to="#contact">
          Contact
        </HashLink>
        <HashLink className="links"smooth to="#services">
          Services
        </HashLink>
        <HashLink className="links"smooth to="#blog">
          Blog
        </HashLink>
        <HashLink className="links"smooth to="#faqs">
          FAQ
        </HashLink>
        </Box>
        <Flex gap={"20px"}>
          <Flex align={'center'} borderRadius={'.4rem'} bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)">
          <NavLink className={"register"} to={"/login"}>
            Login
          </NavLink></Flex>
          <Flex
            onClick={toggleColorMode}
            cursor={"pointer"}
            // pos={"absolute"}
            // top={-8}
            // right={10}
            gap={"5px"}
            align={"center"}
            zIndex={"1000"}
          >
            {colorMode === "dark" ? <Text>light</Text> : <Text>dark</Text>}
            {colorMode === "dark" ? (
              <AiFillSun
                fontSize={"28px"}
                color={theme.colors.icon[colorMode]}
              />
            ) : (
              <MoonIcon
                fontSize={"20px"}
                color={theme.colors.icon[colorMode]}
              />
            )}
          </Flex>
        </Flex>
    </Flex>
  );
}

export default Navbar;
