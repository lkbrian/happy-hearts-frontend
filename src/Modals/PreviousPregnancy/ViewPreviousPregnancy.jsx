import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  // Text,
  Textarea,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function ViewPreviousPregnancy({ isOpen, onClose, data }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const admissionBelongsTo = data?.child_id !== null ? "Child" : "Parent";
  const parent_national_id = data?.parent?.national_id ?? "";
  const child_certificate_No = data?.child?.certificate_No ?? "";

  const initialValues = {
    admission_for: admissionBelongsTo,
    national_id: parent_national_id,
    certificate_No: child_certificate_No,
    reason_for_admission: data?.reason_for_admission,
    admission_date: data?.admission_date,
    room_id: data?.room_id,
    bed_id: data?.bed_id,
  };

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Admission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6} p="10px">
              <FormControl>
                <FormLabel>Admission for</FormLabel>
                <RadioGroup value={initialValues.admission_for} readOnly>
                  <HStack spacing={4}>
                    <Radio readOnly value="Parent">
                      Parent
                    </Radio>
                    <Radio readOnly value="Child">
                      Child
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              {initialValues.admission_for === "Parent" && (
                <FormControl>
                  <FormLabel>Parent National ID</FormLabel>
                  <Input
                    value={initialValues.national_id}
                    isReadOnly
                    outline={theme.colors.background[colorMode]}
                    type="text"
                  />
                </FormControl>
              )}
              {initialValues.admission_for === "Child" && (
                <HStack>
                  <FormControl>
                    <FormLabel>Parent National ID</FormLabel>
                    <Input
                      value={initialValues.national_id}
                      isReadOnly
                      outline={theme.colors.background[colorMode]}
                      type="text"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Certificate Number</FormLabel>
                    <Input
                      value={initialValues.certificate_No}
                      isReadOnly
                      outline={theme.colors.background[colorMode]}
                      type="text"
                    />
                  </FormControl>
                </HStack>
              )}
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Select a room</FormLabel>
                  <Input
                    value={data?.room.room_number || ""}
                    isReadOnly
                    outline={theme.colors.background[colorMode]}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Select a bed</FormLabel>
                  <Input
                    value={data?.bed.bed_number || ""}
                    isReadOnly
                    outline={theme.colors.background[colorMode]}
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Admission Date</FormLabel>
                <Input
                  value={initialValues.admission_date}
                  isReadOnly
                  outline={theme.colors.background[colorMode]}
                  type="datetime-local"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Reason for Admission</FormLabel>
                <Textarea
                  value={initialValues.reason_for_admission}
                  isReadOnly
                  outline={theme.colors.background[colorMode]}
                />
              </FormControl>
              {initialValues.general_assessment === null && (
                <FormControl>
                  <FormLabel>General Assessment (optional)</FormLabel>
                  <Textarea
                    value={data?.general_assessment || ""}
                    isReadOnly
                    outline={theme.colors.background[colorMode]}
                  />
                </FormControl>
              )}
            </Stack>

            <Button
              w="100%"
              bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
              _hover={{
                bg: "linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
              }}
              color="#fff"
              my="8px"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

ViewPreviousPregnancy.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default ViewPreviousPregnancy;
