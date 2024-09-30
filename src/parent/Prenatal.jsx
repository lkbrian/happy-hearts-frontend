import { Box, Flex } from "@chakra-ui/react";
import TermsAndConditions from "../pages/TermsAndConditions";
import Privacy from "../pages/Privacy";

function Prenatal() {

  return (
    <>
      <Box>
        <Flex>
        <TermsAndConditions />
        <Privacy />
        </Flex>
      </Box>
    </>
  );
}

export default Prenatal;
