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
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function ViewPresentPregnancy({ isOpen, onClose, data }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  // national_id: "",
  // date: "",
  // weight_in_kg: "",
  // urinalysis: "",
  // blood_pressure: "",
  // pollar: "",
  // maturity_in_weeks: "",
  // fundal_height: "",
  // comments: "",
  // clinical_notes: "",

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
          <ModalHeader>View Pregnancy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6} p="10px">
              <HStack>
                <FormControl>
                  <FormLabel>Parent National ID</FormLabel>
                  <Input
                    value={data?.parent.national_id}
                    outline={theme.colors.background[colorMode]}
                    readOnly
                    type="text"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input
                    readOnly
                    value={formatDate(data?.date)}
                    outline={theme.colors.background[colorMode]}
                    type="date"
                  />
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel>Weight (in kg)</FormLabel>
                  <Input
                    readOnly
                    value={data?.weight_in_kg}
                    outline={theme.colors.background[colorMode]}
                    type="number"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Urinalysis</FormLabel>
                  <Input
                    readOnly
                    value={data?.urinalysis}
                    outline={theme.colors.background[colorMode]}
                    type="text"
                  />
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel>Blood Pressure</FormLabel>
                  <Input
                    readOnly
                    value={data?.blood_pressure}
                    outline={theme.colors.background[colorMode]}
                    type="text"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Pollar</FormLabel>
                  <RadioGroup value={data?.pollar} readOnly>
                    <HStack spacing={4}>
                      <Radio readOnly value="yes">
                        Yes
                      </Radio>
                      <Radio readOnly value="no">
                        No
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel>Maturity in Weeks</FormLabel>
                  <Input
                    readOnly
                    value={data?.maturity_in_weeks}
                    outline={theme.colors.background[colorMode]}
                    type="number"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Fundal Height in cm</FormLabel>
                  <Input
                    readOnly
                    value={data?.fundal_height}
                    outline={theme.colors.background[colorMode]}
                    type="number"
                  />
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Comments</FormLabel>
                <Textarea
                  readOnly
                  value={data?.comments}
                  outline={theme.colors.background[colorMode]}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Clinical Notes</FormLabel>
                <Textarea
                  readOnly
                  value={data?.clinical_notes}
                  outline={theme.colors.background[colorMode]}
                />
              </FormControl>
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

ViewPresentPregnancy.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default ViewPresentPregnancy;
