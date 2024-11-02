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

function ViewMedicalInfo({ isOpen, onClose, data }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const admissionBelongsTo = data?.child_id !== null ? "Child" : "Parent";
  const parent_national_id = data?.parent?.national_id ?? "";
  const child_certificate_No = data?.child?.certificate_No ?? "";

  const initialValues = {
    blood_transfusion: data?.blood_transfusion,
    diabetes: data?.diabetes,
    family_history: data?.family_history,
    history_id: data?.history_id,
    hypertension: data?.hypertension,
    parent_id: data?.parent_id,
    tuberclosis: data?.tuberclosis,
    twins: data?.twins,
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
          <ModalHeader>View Medical Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6} p="10px">
              <FormControl>
                <FormLabel>Blood transfusion</FormLabel>
                <RadioGroup value={initialValues.blood_transfusion} readOnly>
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
                    value={initialValues.diabetes}
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
                      value={initialValues.family_history}
                      isReadOnly
                      outline={theme.colors.background[colorMode]}
                      type="text"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Certificate Number</FormLabel>
                    <Input
                      value={initialValues.history_id}
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
                    value={initialValues.hypertension}
                    isReadOnly
                    outline={theme.colors.background[colorMode]}
                  />
                </FormControl>
                <FormControl>
                  {/* <FormLabel>Select a bed</FormLabel> */}
                  <Input
                    value={initialValues.parent_id}
                    isReadOnly
                    outline={theme.colors.background[colorMode]}
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Admission Date</FormLabel>
                <Input
                  value={initialValues.tuberclosis}
                  isReadOnly
                  outline={theme.colors.background[colorMode]}
                  type="datetime-local"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Reason for Admission</FormLabel>
                <Textarea
                  value={initialValues.twins}
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

ViewMedicalInfo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default ViewMedicalInfo;
