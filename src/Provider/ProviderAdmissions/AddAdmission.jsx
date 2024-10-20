import {
  Button,
  FormControl,
  FormErrorMessage,
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
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useProviderStore } from "../../utils/store";

function AddAdmission({ isOpen, onClose }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    certificate_No: Yup.string().when("admission_for", {
      is: "Child",
      then: (schema) =>
        schema
          .required("Certificate no is required for Child")
          .test("checkCertificate", "Invalid certificate number", (value) => {
            return value ? value.length <= 10 : true;
          }),
      otherwise: (schema) => schema.nullable(),
    }),
    national_id: Yup.string().when("admission_for", {
      is: (value) => ["Parent", "Child"].includes(value),
      then: (schema) =>
        schema
          .required("National ID is required for Parent")
          .test("checkNationalID", "Invalid national ID", (value) => {
            return value ? value.length === 8 : true;
          }),
      otherwise: (schema) => schema.nullable(),
    }),
    admission_for: Yup.string()
      .oneOf(["Parent", "Child"], "Invalid admission_for")
      .required("Provide the entity this test belongs to"),
    reason_for_admission: Yup.string().required(
      "Reason for admission is required"
    ),
    general_assessment: Yup.string(),
    // physician_assessment: Yup.string(),
    // insurance_details: Yup.string(),
    admission_date: Yup.string().required("Admission date is required"),
    room_id: Yup.number().required("Room ID is required"),
    bed_id: Yup.number().required("Bed ID is required"),
  });

  const provider_id = sessionStorage.getItem("userId");
  const initialValues = {
    admission_for: "",
    national_id: "",
    certificate_No: "",
    reason_for_admission: "",
    admission_date: "",
    room_id: "",
    bed_id: "",
    provider_id: Number(provider_id),
  };
  const { beds, rooms, fetchRooms, fetchBeds } = useProviderStore((state) => ({
    rooms: state.rooms,
    beds: state.beds,
    fetchRooms: state.fetchRooms,
    fetchBeds: state.fetchBeds,
  }));

  useEffect(() => {
    if (!rooms || rooms.length === 0) {
      fetchRooms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log(values);

    try {
      const response = await fetch(`/api/admissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.msg || "Admission created successfully!", {
          position: "top-right",
          autoClose: 6000,
        });
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Error creating admission", {
          position: "top-right",
          autoClose: 6000,
        });
        throw new Error(errorData.msg || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
      resetForm();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    }
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
          <ModalHeader>Add Admission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              enableReinitialize={true}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <Stack spacing={6} p="10px">
                    <Field name="admission_for">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.admission_for &&
                            form.touched.admission_for
                          }
                        >
                          <FormLabel>Admission for</FormLabel>
                          <RadioGroup
                            {...field}
                            onChange={(value) =>
                              form.setFieldValue("admission_for", value)
                            }
                          >
                            <HStack spacing={4}>
                              <Radio value="Parent">Parent</Radio>
                              <Radio value="Child">Child</Radio>
                            </HStack>
                          </RadioGroup>
                          <FormErrorMessage>
                            {form.errors.admission_for}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {values.admission_for === "Parent" && (
                      <Field name="national_id">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.national_id &&
                              form.touched.national_id
                            }
                          >
                            <FormLabel>Parent National ID</FormLabel>
                            <Input
                              {...field}
                              outline={theme.colors.background[colorMode]}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.national_id}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    )}
                    {values.admission_for === "Child" && (
                      <HStack>
                        <Field name="national_id">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.national_id &&
                                form.touched.national_id
                              }
                            >
                              <FormLabel>Parent National ID</FormLabel>
                              <Input
                                {...field}
                                outline={theme.colors.background[colorMode]}
                                type="text"
                              />
                              <FormErrorMessage>
                                {form.errors.national_id}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="certificate_No">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.certificate_No &&
                                form.touched.certificate_No
                              }
                            >
                              <FormLabel>Certificate Number</FormLabel>
                              <Input
                                {...field}
                                outline={theme.colors.background[colorMode]}
                                type="text"
                              />
                              <FormErrorMessage>
                                {form.errors.certificate_No}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </HStack>
                    )}
                    <HStack spacing={4}>
                      {/* Room Selection */}
                      <Field name="room_id">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.room_id && form.touched.room_id
                            }
                          >
                            <FormLabel>Select a room</FormLabel>
                            <Select
                              outline={theme.colors.background[colorMode]}
                              placeholder="Select a room"
                              {...field}
                              onChange={async (e) => {
                                const roomId = e.target.value;
                                form.setFieldValue("room_id", roomId); // Update form state
                                await fetchBeds(roomId); // Fetch available beds for the selected room
                              }}
                            >
                              {rooms.map((room) => (
                                <option key={room.room_id} value={room.room_id}>
                                  {room.room_number} | {room.room_type}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.room_id}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      {/* Bed Selection */}
                      <Field name="bed_id">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.bed_id && form.touched.bed_id
                            }
                          >
                            <FormLabel>Select a bed</FormLabel>
                            <Select
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              placeholder="Select a bed"
                              onChange={async (e) => {
                                const bedId = e.target.value;
                                form.setFieldValue("bed_id", bedId); // Update form state
                              }}
                              disabled={beds.length === 0} // Disable bed select if no beds are available
                            >
                              {beds.length > 0 ? (
                                beds.map((bed) => (
                                  <option key={bed.bed_id} value={bed.bed_id}>
                                    {bed.bed_number} | {bed.bed_type}
                                  </option>
                                ))
                              ) : (
                                <option value="">No beds available</option>
                              )}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.bed_id}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>

                    <Field name="admission_date">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.admission_date &&
                            form.touched.admission_date
                          }
                        >
                          <FormLabel>Admission Date</FormLabel>
                          <Input
                            {...field}
                            outline={theme.colors.background[colorMode]}
                            type="datetime-local"
                            cursor={"text"}
                            css={{
                              "&::-webkit-calendar-picker-indicator": {
                                cursor: "pointer",
                                width: "25px",
                                height: "25px", // this targets the date picker icon specifically
                              },
                            }}
                          />
                          <FormErrorMessage>
                            {form.errors.admission_date}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="reason_for_admission">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.reason_for_admission &&
                            form.touched.reason_for_admission
                          }
                        >
                          <FormLabel>Reason for Admission</FormLabel>
                          <Textarea
                            {...field}
                            outline={theme.colors.background[colorMode]}
                          />
                          <FormErrorMessage>
                            {form.errors.reason_for_admission}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="general_assessment">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.general_assessment &&
                            form.touched.general_assessment
                          }
                        >
                          <FormLabel>General assesment(optional)</FormLabel>
                          <Textarea
                            {...field}
                            outline={theme.colors.background[colorMode]}
                          />
                          <FormErrorMessage>
                            {form.errors.general_assessment}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>

                  <Button
                    w="100%"
                    type="submit"
                    bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                    _hover={{
                      bg: "linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
                    }}
                    color="#fff"
                    my="8px"
                    isLoading={isSubmitting || loading}
                  >
                    {loading ? <Spinner /> : <Text>Add Admission</Text>}
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

AddAdmission.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddAdmission;
