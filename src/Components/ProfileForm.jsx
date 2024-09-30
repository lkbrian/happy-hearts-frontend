// import React from "react";
import {
  Box,
  Button,
  // Flex,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";

const ProfileForm = () => {
  return (
    <Box p={4} borderWidth={1} borderRadius={4}>
      <Heading size="md">Profile</Heading>

      <HStack spacing={4}>
        <VStack spacing={2}>
          <Text>First Name</Text>
          <Input placeholder="First name" />
        </VStack>
        <VStack spacing={2}>
          <Text>Last Name</Text>
          <Input placeholder="Last name" />
        </VStack>
      </HStack>

      <HStack spacing={4}>
        <VStack spacing={2}>
          <Text>Email Address</Text>
          <Input type="email" placeholder="Email address" />
        </VStack>
        <VStack spacing={2}>
          <Text>Phone Number</Text>
          <Input type="tel" placeholder="Phone number" />
        </VStack>
      </HStack>

      <HStack spacing={4}>
        <VStack spacing={2}>
          <Text>Location</Text>
          <Input placeholder="Location" />
        </VStack>
        <VStack spacing={2}>
          <Text>Street Address</Text>
          <Input placeholder="Street address" />
        </VStack>
      </HStack>

      <HStack spacing={4}>
        <VStack spacing={2}>
          <Text>Date Of Birth</Text>
          <Input type="date" />
        </VStack>
        <VStack spacing={2}>
          <Text>Gender</Text>
          <Select placeholder="Select">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </VStack>
      </HStack>

      <Text>Add Your Bio</Text>
      <Input type="textarea" placeholder="Write here..." />

      <Button colorScheme="blue" mt={4}>
        Save Changes
      </Button>
    </Box>
  );
};

export default ProfileForm;
