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
  Spinner,
  Stack,
  Text,
  Textarea,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import axiosInstance from "../../utils/axiosInstance";
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function EditPresentPregnancy({ isOpen, onClose, data }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    national_id: Yup.string()
      .required("National ID is required for Parent")
      .test("checkNationalID", "Invalid national ID", (value) => {
        return value ? value.length === 8 : true;
      }),
    date: Yup.date()
      .typeError("Invalid date format. Use 'YYYY-MM-DD HH:mm'")
      .required("Date is required"),
    weight_in_kg: Yup.number()
      .positive("Weight must be a positive number")
      .required("Weight is required"),
    urinalysis: Yup.string().required("Urinalysis is required"),
    blood_pressure: Yup.string()
      .matches(
        /^\d+\/\d+$/,
        "Blood pressure should be in the format 'systolic/diastolic'"
      )
      .required("Blood pressure is required"),
    pollar: Yup.string()
      .required("Pollar is required")
      .oneOf(["yes", "no"], "Invalid pollar"),
    maturity_in_weeks: Yup.number()
      .positive("Maturity in weeks must be a positive number")
      .required("Maturity in weeks is required"),
    fundal_height: Yup.number()
      .positive("Fundal height must be a positive number")
      .required("Fundal height is required"),
    comments: Yup.string(),
    clinical_notes: Yup.string(),
  });

  const provider_id = sessionStorage.getItem("userId");
  const initialValues = {
    national_id: data?.parent.national_id,
    date: formatDate(data?.date),
    weight_in_kg: data?.weight_in_kg,
    urinalysis: data?.urinalysis,
    blood_pressure: data?.blood_pressure,
    pollar: data?.pollar,
    maturity_in_weeks: data?.maturity_in_weeks,
    fundal_height: data?.fundal_height,
    comments: data?.comments,
    clinical_notes: data?.clinical_notes,
    provider_id: Number(provider_id),
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    try {
      const response = await axiosInstance.patch(
        `/present_pregnancies/${data?.pp_id}`,
        values
      );

      // Handle the response
      toast.success(response.data.msg || "Admission created successfully!", {
        position: "top-right",
        autoClose: 6000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      onClose();
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Error creating admission";
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
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Pregnancy</ModalHeader>
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
                              cursor={"not-allowed"}
                              outline={theme.colors.background[colorMode]}
                              readOnly
                              {...field}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.national_id}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="date">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel>Date</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="date"
                            />
                            <FormErrorMessage>
                              {form.errors.date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <HStack>
                      <Field name="weight_in_kg">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.weight_in_kg &&
                              form.touched.weight_in_kg
                            }
                          >
                            <FormLabel>Weight (in kg)</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="number"
                            />
                            <FormErrorMessage>
                              {form.errors.weight_in_kg}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="urinalysis">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.urinalysis && form.touched.urinalysis
                            }
                          >
                            <FormLabel>Urinalysis</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.urinalysis}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <HStack>
                      <Field name="blood_pressure">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.blood_pressure &&
                              form.touched.blood_pressure
                            }
                          >
                            <FormLabel>Blood Pressure</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="text"
                              placeholder="e.g., 120/80"
                            />
                            <FormErrorMessage>
                              {form.errors.blood_pressure}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="pollar">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.pollar && form.touched.pollar
                            }
                          >
                            <FormLabel>Pollar</FormLabel>
                            <RadioGroup
                              {...field}
                              onChange={(value) =>
                                form.setFieldValue("pollar", value)
                              }
                            >
                              <HStack spacing={4}>
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no">No</Radio>
                              </HStack>
                            </RadioGroup>
                            <FormErrorMessage>
                              {form.errors.pollar}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <HStack>
                      <Field name="maturity_in_weeks">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.maturity_in_weeks &&
                              form.touched.maturity_in_weeks
                            }
                          >
                            <FormLabel>Maturity in Weeks</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="number"
                            />
                            <FormErrorMessage>
                              {form.errors.maturity_in_weeks}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="fundal_height">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.fundal_height &&
                              form.touched.fundal_height
                            }
                          >
                            <FormLabel>Fundal Height in cm</FormLabel>
                            <Input
                              outline={theme.colors.background[colorMode]}
                              {...field}
                              type="number"
                            />
                            <FormErrorMessage>
                              {form.errors.fundal_height}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <Field name="comments">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel>Comments</FormLabel>
                          <Textarea {...field} />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="clinical_notes">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel>Clinical Notes</FormLabel>
                          <Textarea {...field} />
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
                    {loading ? <Spinner /> : <Text>Submit</Text>}
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

EditPresentPregnancy.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default EditPresentPregnancy;
