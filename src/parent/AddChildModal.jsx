import {
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
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsFillCloudUploadFill } from "react-icons/bs";
import * as Yup from "yup";

function AddChildModal({ isOpen, onClose }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState("");

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full Name is required"),
    certificate_No: Yup.string().required("Certificate no ID is required"),
    date_of_birth: Yup.string().required("Date of birth is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Invalid gender")
      .required("Gender is required"),
    media: Yup.mixed().required("A file is required"),
  });

  const parent_id = sessionStorage.getItem("userId");
  const initialValues = {
    fullname: "",
    certificate_No: "",
    date_of_birth: "",
    gender: "",
    parent_id: Number(parent_id),
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Submitting form with values: ", values);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("certificate_No", values.certificate_No);
      formData.append("date_of_birth", values.date_of_birth);
      formData.append("gender", values.gender);
      formData.append("parent_id", values.parent_id);
      formData.append("media", values.media); // Assuming values.media holds the selected file

      const response = await fetch(`/api/children`, {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const res = await response.json();
        console.log("Response res:", res);
        toast.success(res.msg || "Child created successfully!", {
          position: "top-right",
          autoClose: 6000,
        });
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "error encountered", {
          position: "top-right",
          autoClose: 6000,
        });
        throw new Error(errorData.msg || "An error occurred");
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      onClose();
    } finally {
      setSubmitting(false);
      setLoading(false);
      setFilename("");
      resetForm();
      setTimeout(() => {
        window.location.refresh();
      }, 4000);
    }
  };

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Child</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              enableReinitialize={true}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={6} p="10px">
                    <Field name="fullname">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.fullname && form.touched.fullname
                          }
                        >
                          <FormLabel>Full Name</FormLabel>
                          <Input
                            {...field}
                            outline={theme.colors.background[colorMode]}
                            type="text"
                          />
                          <FormErrorMessage>
                            {form.errors.fullname}
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

                    <Field name="gender">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.gender && form.touched.gender}
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
                            {...field}
                            outline={theme.colors.background[colorMode]}
                            type="datetime"
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
                            {form.errors.date_of_birth}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="media">
                      {({ form }) => (
                        <FormControl
                          isInvalid={form.errors.media && form.touched.media}
                        >
                          <FormLabel
                            bg={theme.colors.background[colorMode]}
                            color={theme.colors.text[colorMode]}
                            htmlFor="media"
                            className="flex items-center px-4 py-2 font-bold text-white h-[auto] rounded cursor-pointer w-[100%] border-dashed border-2"
                          >
                            <Flex
                              flexDir={"column"}
                              gap={2}
                              align={"center"}
                              mx={"auto"}
                            >
                              <BsFillCloudUploadFill size={"24px"} />
                              <Text>Upload child passport pic</Text>
                              {filename && (
                                <Text mt={2}>Selected file: {filename}</Text>
                              )}
                            </Flex>
                          </FormLabel>

                          <Input
                            id="media"
                            name="media"
                            type="file"
                            accept="image/png, image/jpeg,image/jpg, pdf"
                            hidden
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              const renamedFile = new File(
                                [file],
                                `Child-passport-${Date.now()}${file.name.slice(
                                  file.name.lastIndexOf(".")
                                )}`,
                                {
                                  type: file.type,
                                  lastModified: file.lastModified,
                                }
                              );
                              form.setFieldValue("media", renamedFile);
                              setFilename(file.name); // Update filename state
                            }}
                          />

                          <FormErrorMessage>
                            {form.errors.media}
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
                    {loading ? <Spinner /> : <Text>Create</Text>}
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

export default AddChildModal;
AddChildModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
