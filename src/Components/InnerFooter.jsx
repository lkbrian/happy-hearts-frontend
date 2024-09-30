import { Flex, Image, Text, useColorMode, useTheme } from "@chakra-ui/react";

function InnerFooter() {
  const theme = useTheme()
  const{colorMode}=useColorMode()
  return (
    <footer>
      <Flex
        bg={theme.colors.background[colorMode]}
        color={theme.colors.text[colorMode]}
        borderTopRadius={".4rem"}
        align={"center"}
        justify={"center"}
        gap={"20px"}
        className="inner-footer"
        p={"1rem"}
        mt="auto"
        bottom={0}
      >
        <Image src="/favicon.ico" boxSize={"30px"} alt="Favicon" />
        <Text>&copy; 2024 Happy Hearts</Text>
        <Flex as={"ul"} gap={"10px"} flexWrap={"wrap"} listStyleType={"none"}>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </Flex>
        <Text>
          Owned by{" "}
          <Text as="span" color={"#2179f3"}>
            lkbrian
          </Text>
        </Text>
      </Flex>
    </footer>
  );
}

export default InnerFooter;
