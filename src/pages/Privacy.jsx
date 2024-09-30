import {
  Box,
  Heading,
  Text,
  useColorMode,
  useTheme,
  VStack,
} from "@chakra-ui/react";

const Privacy = () => {
    const theme = useTheme();
    const { colorMode } = useColorMode();
    return (
      <Box
        p={5}
        bg={theme.colors.background[colorMode]}
        color={theme.colors.text[colorMode]}
        borderRadius={".4rem"}
      >
        <Heading as="h2" mb={4}>
          Privacy Policy for Happy Hearts
        </Heading>
        <Text mb={2}>
          <strong>Effective Date:</strong> 2024/9/10
        </Text>
        <Text mb={4}>
          Happy Hearts is committed to protecting the privacy of our patients
          and visitors. This Privacy Policy outlines how we collect, use,
          disclose, and protect your information when you visit our website.
        </Text>

        <VStack spacing={4} align="start">
          <Heading as="h3" size="lg">
            1. Information We Collect
          </Heading>
          <Text>
            We may collect the following types of information:
            <ul>
              <li>
                <strong>Personal Information:</strong> Information that can
                identify you, such as your name, email address, phone number,
                and medical history.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> Information that does
                not identify you, such as browser type, operating system, and
                website usage patterns.
              </li>
            </ul>
          </Text>

          <Heading as="h3" size="lg">
            2. How We Use Your Information
          </Heading>
          <Text>
            We use your information for the following purposes:
            <ul>
              <li>To provide and improve our healthcare services.</li>
              <li>
                To communicate with you regarding appointments, health updates,
                and services.
              </li>
              <li>To respond to your inquiries and requests.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </Text>

          <Heading as="h3" size="lg">
            3. Disclosure of Your Information
          </Heading>
          <Text>
            We may share your information in the following circumstances:
            <ul>
              <li>
                <strong>With Healthcare Providers:</strong> To facilitate your
                treatment and care.
              </li>
              <li>
                <strong>With Third-Party Service Providers:</strong> To perform
                functions on our behalf, such as billing and customer service.
              </li>
              <li>
                <strong>As Required by Law:</strong> To comply with applicable
                laws and regulations.
              </li>
            </ul>
          </Text>

          <Heading as="h3" size="lg">
            4. Security of Your Information
          </Heading>
          <Text>
            We take appropriate security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the Internet or
            electronic storage is 100% secure.
          </Text>

          <Heading as="h3" size="lg">
            5. Your Rights
          </Heading>
          <Text>
            You have the right to:
            <ul>
              <li>Access your personal information.</li>
              <li>Request correction of your personal information.</li>
              <li>
                Request deletion of your personal information, subject to legal
                obligations.
              </li>
            </ul>
          </Text>

          <Heading as="h3" size="lg">
            6. Changes to This Privacy Policy
          </Heading>
          <Text>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date. We
            encourage you to review this policy periodically.
          </Text>

          <Heading as="h3" size="lg">
            7. Contact Us
          </Heading>
          <Text>
            If you have any questions about this Privacy Policy or our privacy
            practices, please contact us at:
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

export default Privacy;
