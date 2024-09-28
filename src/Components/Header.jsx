import { Search2Icon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

function Header() {
  return (
    <Box
      as="header"
      bg={"#fff"}
      color={"#47556A"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"12px 20px"}
      width={"100%"}
      h={"70px"}
      borderRadius={".4rem"}
    >
      <InputGroup
        bg={"#EDEFF8"}
        w={"300px"}
        borderRadius={".4rem"}
        border={'none'}
    >
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input type="text" border={"none"} outline={"none"} placeholder={'Search....'}/>
      </InputGroup>
      <Box bg={"#d4d4d4"} h="50px" w={"50px"} borderRadius={"50%"}></Box>
    </Box>
  );
}

export default Header;
