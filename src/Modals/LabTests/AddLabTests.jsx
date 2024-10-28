import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorMode,
  useTheme,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  RadioGroup,
  HStack,
  Radio,
  Textarea,
} from "@chakra-ui/react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Form, Formik, Field } from "formik";

function AddLabTest({ onClose, isOpen }) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const validationSchema = Yup.object({
    test_name: Yup.string().required("Test name is required"),
    certificate_No: Yup.string().when("test_for", {
      is: "Child",
      then: (schema) =>
        schema
          .required("Certificate no is required for Child")
          .test("checkCertificate", "Invalid certificate number", (value) => {
            return value ? value.length === 10 : true;
          }),
      otherwise: (schema) => schema.nullable(),
    }),
    national_id: Yup.string().when("test_for", {
      is: "Parent",
      then: (schema) =>
        schema
          .required("National ID is required for Parent")
          .test("checkNationalID", "Invalid national ID", (value) => {
            return value ? value.length === 8 : true;
          }),
      otherwise: (schema) => schema.nullable(),
    }),
    test_date: Yup.date()
      .required("Test date is required")
      .typeError("Invalid date format, use YYYY-MM-DD"),
    result: Yup.string().required("Result is required"),
    remarks: Yup.string(),
    test_for: Yup.string()
      .oneOf(["Parent", "Child"], "Invalid test_for")
      .required("Provide the entity this test belongs to"),
  });

  const provider_id = sessionStorage.getItem("userId");
  const initialValues = {
    test_for: "",
    test_name: "",
    national_id: "",
    certificate_No: "",
    test_date: "",
    result: "",
    remarks: "",
    provider_id: Number(provider_id),
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/labtests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.msg || "Lab Test created successfully!", {
          position: "top-right",
          autoClose: 6000,
        });
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Error creating Lab Test", {
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
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={"2xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Lab Test</ModalHeader>
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
                  <Field name="test_for">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.test_for && form.touched.test_for
                        }
                      >
                        <FormLabel>Test for</FormLabel>
                        <RadioGroup
                          {...field}
                          onChange={(value) =>
                            form.setFieldValue("test_for", value)
                          }
                        >
                          <HStack spacing={4}>
                            <Radio value="Parent">Parent</Radio>
                            <Radio value="Child">Child</Radio>
                          </HStack>
                        </RadioGroup>
                        <FormErrorMessage>
                          {form.errors.test_for}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <HStack>
                    {values.test_for === "Parent" && (
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

                    {values.test_for === "Child" && (
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
                    )}
                  </HStack>
                  <HStack>
                    <Field name="test_name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.test_name && form.touched.test_name
                          }
                        >
                          <FormLabel>Test Name</FormLabel>
                          <Input {...field} type="text" />
                          <FormErrorMessage>
                            {form.errors.test_name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="test_date">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.test_date && form.touched.test_date
                          }
                        >
                          <FormLabel>Test Date</FormLabel>
                          <Input {...field} type="date" />
                          <FormErrorMessage>
                            {form.errors.test_date}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>

                  <Field name="result">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.result && form.touched.result}
                      >
                        <FormLabel>Result</FormLabel>
                        <Textarea {...field} type="text" />
                        <FormErrorMessage>
                          {form.errors.result}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="remarks">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Remarks (optional)</FormLabel>
                        <Textarea {...field} type="text" />
                      </FormControl>
                    )}
                  </Field>

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
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddLabTest;

AddLabTest.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
