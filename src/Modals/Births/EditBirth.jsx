import {
  Box,
  Button,
  Flex,
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
  Spinner,
  Stack,
  // Switch,
  Text,
  // Textarea,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import axiosInstance from "../../utils/axiosInstance";

// import { CloseIcon } from "@chakra-ui/icons";
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function EditBirth({ isOpen, onClose, data }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    baby_name: Yup.string().required("Baby name is required"),
    date_of_birth: Yup.date()
      .typeError("Invalid date format. Use 'YYYY-MM-DD'")
      .required("Date of birth is required"),
    date_of_notification: Yup.date()
      .typeError("Invalid date format. Use 'YYYY-MM-DD'")
      .required("Date of notification is required"),
    fate: Yup.string()
      .oneOf(["Alive", "Dead"], "Invalid fate")
      .required("Fate is required"),
    father_full_name: Yup.string().required("Father's full name is required"),
    father_national_id: Yup.string().required(
      "Father's national ID is required"
    ),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Invalid gender")
      .required("Gender is required"),
    // is_registered: Yup.boolean().required("Registration status is required"),
    mother_full_name: Yup.string().required("Mother's full name is required"),
    mother_national_id: Yup.string().required(
      "Mother's national ID is required"
    ),
    parent_id: Yup.number().required("Parent ID is required"),
    place_of_birth: Yup.string().required("Place of birth is required"),
    provider_id: Yup.number().required("Provider ID is required"),
    type_of_birth: Yup.string().required("Type of birth is required"),
    subCounty: Yup.string().required("sub County is required"),
  });

  const initialValues = {
    baby_name: data?.baby_name || "",
    date_of_birth: data?.date_of_birth ? formatDate(data.date_of_birth) : "",
    date_of_notification: data?.date_of_notification
      ? formatDate(data.date_of_notification)
      : "",
    fate: data?.fate || "",
    father_full_name: data?.father_full_name || "",
    father_national_id: data?.father_national_id || "",
    gender: data?.gender || "",
    // is_registered: data?.is_registered || false,
    mother_full_name: data?.mother_full_name || "",
    mother_national_id: data?.mother_national_id || "",
    place_of_birth: data?.place_of_birth || "",
    type_of_birth: data?.type_of_birth || "",
    subCounty: data?.sub_county || "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log("Submit triggered", values);
    try {
      const response = await axiosInstance.patch(
        `/births/${data?.birth_id}`,
        values
      );

      toast.success(response.data.msg || "Birth record updated successfully!", {
        position: "top-right",
        autoClose: 6000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      onClose();
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "Error updating birth record";
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 6000,
      });
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
      resetForm();
    }
  };

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"4xl"}
        useInert
      >
        <ModalOverlay />
        <ModalContent overflow={"hidden"} h="700px">
          <ModalHeader
            fontWeight={"400px"}
            position="sticky"
            top="0"
            bg="white"
            zIndex="1"
            borderBottom={"2px solid #111"}
          >
            <Flex w={"100%"} align={"center"} justify={"space-between"}>
              <Text fontWeight={"bold"}>Edit Birth</Text>
              <ModalCloseButton />
            </Flex>
            <Box fontFamily={"Times New Roman"}>
              <Text
                textAlign={"center"}
                textDecoration={"underline"}
                textDecorationStyle={"dotted"}
                textUnderlineOffset={"12px"}
                py={"10px"}
              >
                REPUBLIC OF KENYA
              </Text>
              <Text textAlign={"center"}>
                THE BIRTHS AND DEATHS REGISTRATION ACT{" "}
                <Text as={"span"} fontStyle={"italic"}>
                  (Cap 149)
                </Text>
              </Text>
              <Text textAlign={"center"} fontWeight={"bold"} pb={"20px"}>
                ACKNOWLEDGEMENT OF BIRTH NOTIFICATION(FOR PARENTS)
              </Text>
              <Flex>
                {" "}
                <Text pos={"absolute"} bottom={0}>
                  Serial No. {data?.serial_number}
                </Text>
                <Text pos={"absolute"} bottom={0} right={"4"}>
                  Form B1
                </Text>
              </Flex>
            </Box>
          </ModalHeader>
          <ModalBody overflowY="auto">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              enableReinitialize={true}
              debug={true}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={6} p="10px">
                    <HStack>
                      <Field name="baby_name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.baby_name && form.touched.baby_name
                            }
                          >
                            <FormLabel>Baby Name</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.baby_name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>

                    <HStack>
                      <Field name="date_of_birth">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.date_of_birth &&
                              form.touched.date_of_birth
                            }
                          >
                            <FormLabel>Date of Birth</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="date"
                            />
                            <FormErrorMessage>
                              {form.errors.date_of_birth}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="date_of_notification">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.date_of_notification &&
                              form.touched.date_of_notification
                            }
                          >
                            <FormLabel>Date of Notification</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="date"
                            />
                            <FormErrorMessage>
                              {form.errors.date_of_notification}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>

                    <HStack>
                      <Field name="gender">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.gender && form.touched.gender
                            }
                          >
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                              {...field}
                              onChange={(value) =>
                                form.setFieldValue("gender", value)
                              }
                            >
                              <HStack spacing={4}>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                              </HStack>
                            </RadioGroup>
                            <FormErrorMessage>
                              {form.errors.gender}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="fate">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.fate && form.touched.fate}
                          >
                            <FormLabel>Nature of Birth</FormLabel>
                            <RadioGroup
                              {...field}
                              onChange={(value) =>
                                form.setFieldValue("fate", value)
                              }
                            >
                              <HStack spacing={4}>
                                <Radio value="Alive">Alive</Radio>
                                <Radio value="Dead">Dead</Radio>
                              </HStack>
                            </RadioGroup>
                            <FormErrorMessage>
                              {form.errors.fate}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="type_of_birth">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.type_of_birth &&
                              form.touched.type_of_birth
                            }
                          >
                            <FormLabel>Type of Birth</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.type_of_birth}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {/* <Field name="is_registered">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Registered</FormLabel>
                            <Switch {...field} isChecked={field.value} />
                          </FormControl>
                        )}
                      </Field> */}
                    </HStack>

                    <HStack>
                      <Field name="mother_full_name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.mother_full_name &&
                              form.touched.mother_full_name
                            }
                          >
                            <FormLabel>Mothers Full Name</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.mother_full_name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="mother_national_id">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.mother_national_id &&
                              form.touched.mother_national_id
                            }
                          >
                            <FormLabel>Mothers National ID</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.mother_national_id}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <HStack>
                      <Field name="father_full_name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.father_full_name &&
                              form.touched.father_full_name
                            }
                          >
                            <FormLabel>Fathers Full Name</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.father_full_name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="father_national_id">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.father_national_id &&
                              form.touched.father_national_id
                            }
                          >
                            <FormLabel>Fathers National ID</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.father_national_id}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>

                    <HStack>
                      <Field name="place_of_birth">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.place_of_birth &&
                              form.touched.place_of_birth
                            }
                          >
                            <FormLabel>Place of Birth</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.place_of_birth}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="subCounty">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.subCounty && form.touched.subCounty
                            }
                          >
                            <FormLabel>Place of Birth</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.subCounty}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <Text fontSize={"sm"}>
                      Note that to obtain a Birth cetificate this information
                      will be passed to the Sub-County Registar of Births, where
                      this birth ocuured
                    </Text>
                    <Button
                      w="50%"
                      m={"auto"}
                      type="submit"
                      bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                      _hover={{
                        bg: "linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
                      }}
                      color="#fff"
                      my="8px"
                      isLoading={isSubmitting}
                    >
                      {loading ? <Spinner /> : <Text>Submit</Text>}
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

EditBirth.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default EditBirth;
