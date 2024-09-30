import { Box, Heading, Text, useColorMode, useTheme, VStack } from "@chakra-ui/react";

const TermsAndConditions = () => {
    const theme = useTheme();
    const { colorMode } = useColorMode();
  return (
    <Box
      p={5}
      bg={theme.colors.background[colorMode]}
      color={theme.colors.text[colorMode]}
      borderRadius={'.4rem'}
    >
      <Heading as="h4" fontSize={"28px"} mb={4}>
        Terms and Conditions for Happy Hearts
      </Heading>
      <Text mb={2}>
        <strong>Effective Date:</strong> 2024/9/10
      </Text>

      <VStack spacing={4} align="start">
        <Heading as="h3" size="md">
          1. Acceptance of Terms
        </Heading>
        <Text>
          By accessing this website, you agree to be bound by these Terms and
          Conditions and our Privacy Policy. If you do not agree with any part
          of these terms, you must not use our website.
        </Text>

        <Heading as="h3" size="md">
          2. Use of the Website
        </Heading>
        <Text>
          You must be at least 18 years old to use our website or have the
          permission of a parent or guardian. You agree to use the website only
          for lawful purposes and in a manner that does not infringe the rights
          of others.
        </Text>

        <Heading as="h3" size="md">
          3. Intellectual Property
        </Heading>
        <Text>
          All content on this website, including text, graphics, logos, and
          images, is the property of Happy Hearts or its content suppliers and
          is protected by applicable copyright and trademark laws.
        </Text>

        <Heading as="h3" size="md">
          4. Medical Disclaimer
        </Heading>
        <Text>
          The information provided on this website is for informational purposes
          only and is not a substitute for professional medical advice,
          diagnosis, or treatment. Always seek the advice of your physician or
          other qualified health provider with any questions you may have
          regarding a medical condition.
        </Text>

        <Heading as="h3" size="md">
          5. Limitation of Liability
        </Heading>
        <Text>
          Happy Hearts shall not be liable for any direct, indirect, incidental,
          special, or consequential damages arising out of your use of or
          inability to use this website, even if we have been advised of the
          possibility of such damages.
        </Text>

        <Heading as="h3" size="md">
          6. Changes to Terms
        </Heading>
        <Text>
          We reserve the right to modify these Terms and Conditions at any time.
          Changes will be effective immediately upon posting on this page. Your
          continued use of the website after any changes constitutes your
          acceptance of the new terms.
        </Text>

        <Heading as="h3" size="md">
          7. Governing Law
        </Heading>
        <Text>
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of [State/Country], without regard to its
          conflict of law provisions.
        </Text>

        <Heading as="h3" size="md">
          8. Contact Us
        </Heading>
        <Text>
          If you have any questions about these Terms and Conditions, please
          contact us at:
          <ul>
            <li>Happy Hearts</li>
            <li>[Address]</li>
            <li>[City, State, Zip]</li>
            <li>[Email Address]</li>
            <li>[Phone Number]</li>
          </ul>
        </Text>
      </VStack>
    </Box>
  );
};

export default TermsAndConditions;
