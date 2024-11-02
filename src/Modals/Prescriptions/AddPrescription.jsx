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
  Stack,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import axiosInstance from "../../utils/axiosInstance";

function AddPrescription({ isOpen, onClose }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    prescription_for: Yup.string()
      .oneOf(["Parent", "Child"], "Invalid prescription_for")
      .required("Prescription for is required"),
    certificate_No: Yup.string().when("prescription_for", {
      is: "Child",
      then: (schema) =>
        schema
          .required("Certificate no is required for Child")
          .test("checkCertificate", "Invalid certificate number", (value) => {
            return value ? value.length <= 10 : true;
          }),
      otherwise: (schema) => schema.nullable(),
    }),
    national_id: Yup.number().when("prescription_for", {
      is: "Parent",
      then: (schema) =>
        schema
          .required("National ID is required for Parent")
          .test("checkNationalID", "Invalid national ID", (value) => {
            return value
              ? String(value).length >= 6 && String(value).length <= 8
              : true;
          }),
      otherwise: (schema) => schema.nullable(),
    }),

    medicine_id: Yup.number().required("Medicine ID is required"),
    quantity: Yup.number().required("Quantity is required"),
    dosage: Yup.string().required("Dosage is required"),
    duration: Yup.string().required("Duration is required"),
    refill_count: Yup.number().required("Refill count is required"),
    filled_date: Yup.date(),
    expiry_date: Yup.date(),
  });

  const initialValues = {
    national_id: "",
    certificate_No: "",
    medicine_id: "",
    quantity: "",
    dosage: "",
    duration: "",
    refill_count: "",
    filled_date: "",
    expiry_date: "",
    provider_id: Number(sessionStorage.getItem("userId")),
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log(values);
    const {
      national_id,
      certificate_No,
      medicine_id,
      quantity,
      dosage,
      duration,
      refill_count,
      filled_date,
      expiry_date,
      prescription_for,
      provider_id,
    } = values;
    const payload = {
      medicine_id,
      quantity,
      dosage,
      duration,
      refill_count,
      filled_date,
      expiry_date,
      provider_id,
      ...(prescription_for === "Parent" ? { national_id } : { certificate_No }),
    };
    try {
      const response = await axiosInstance.post("/prescriptions", payload);
      console.log(response);
      toast.success("Prescription created successfully!", {
        position: "top-right",
        autoClose: 6000,
      });
      onClose();
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "Error creating prescription";
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
          <ModalHeader>Add Prescription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <Stack spacing={6} p="10px">
                    <Field name="prescription_for">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.prescription_for &&
                            form.touched.prescription_for
                          }
                        >
                          <FormLabel>Prescription for</FormLabel>
                          <RadioGroup
                            {...field}
                            onChange={(e) => {
                              form.setFieldValue("prescription_for", e);
                              console.log(e);
                            }}
                          >
                            <HStack spacing={4}>
                              <Radio value="Parent">Parent</Radio>
                              <Radio value="Child">Child</Radio>
                            </HStack>
                          </RadioGroup>
                          <FormErrorMessage>
                            {form.errors.prescription_for}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <HStack>
                      {values.prescription_for === "Parent" && (
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

                      {values.prescription_for === "Child" && (
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
                    {/* Medicine ID */}
                    <Field name="medicine_id">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.medicine_id && form.touched.medicine_id
                          }
                        >
                          <FormLabel>Medicine</FormLabel>
                          <Input
                            {...field}
                            outline={theme.colors.background[colorMode]}
                            type="number"
                          />
                          <FormErrorMessage>
                            {form.errors.medicine_id}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <HStack>
                      {/* Quantity */}
                      <Field name="quantity">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.quantity && form.touched.quantity
                            }
                          >
                            <FormLabel>Quantity</FormLabel>
                            <Input
                              {...field}
                              outline={theme.colors.background[colorMode]}
                              type="number"
                            />
                            <FormErrorMessage>
                              {form.errors.quantity}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {/* Dosage */}
                      <Field name="dosage">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.dosage && form.touched.dosage
                            }
                          >
                            <FormLabel>Dosage</FormLabel>
                            <Input
                              {...field}
                              outline={theme.colors.background[colorMode]}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.dosage}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {/* Duration */}
                      <Field name="duration">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.duration && form.touched.duration
                            }
                          >
                            <FormLabel>Duration</FormLabel>
                            <Input
                              {...field}
                              outline={theme.colors.background[colorMode]}
                              type="text"
                            />
                            <FormErrorMessage>
                              {form.errors.duration}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="refill_count">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.refill_count &&
                              form.touched.refill_count
                            }
                          >
                            <FormLabel>Refill Count</FormLabel>
                            <Input
                              {...field}
                              outline={theme.colors.background[colorMode]}
                              type="number"
                            />
                            <FormErrorMessage>
                              {form.errors.refill_count}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>{" "}
                    </HStack>
                    <HStack>
                      {/* Filled Date */}
                      <Field name="filled_date">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.filled_date &&
                              form.touched.filled_date
                            }
                          >
                            <FormLabel>Filled Date</FormLabel>
                            <Input
                              {...field}
                              outline={theme.colors.background[colorMode]}
                              type="date"
                            />
                            <FormErrorMessage>
                              {form.errors.filled_date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      {/* Expiry Date */}
                      <Field name="expiry_date">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.expiry_date &&
                              form.touched.expiry_date
                            }
                          >
                            <FormLabel>Expiry Date</FormLabel>
                            <Input
                              {...field}
                              outline={theme.colors.background[colorMode]}
                              type="date"
                            />
                            <FormErrorMessage>
                              {form.errors.expiry_date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                  </Stack>

                  {/* Submit Button */}
                  <Button
                    w="100%"
                    type="submit"
                    bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                    _hover={{
                      bg: "linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
                    }}
                    color="#fff"
                    my="8px"
                    isLoading={isSubmitting}
                  >
                    Submit Prescription
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

AddPrescription.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddPrescription;
