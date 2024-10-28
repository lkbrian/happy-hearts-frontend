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
  Select,
  FormErrorMessage,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Form, Formik, Field } from "formik";

function AddDelivery({ onClose, isOpen }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    national_id: Yup.string().required("national id is required"),
    mode_of_delivery: Yup.string().required("Mode of delivery is required"),
    date: Yup.date()
      .required("Date is required")
      .typeError("Invalid date format, use YYYY-MM-DD HH:mm"),
    duration_of_labour: Yup.string().required("Duration of labour is required"),
    condition_of_mother: Yup.string().required(
      "Condition of mother is required"
    ),
    condition_of_baby: Yup.string().required("Condition of baby is required"),
    weight_at_birth: Yup.string().required("Birth weight is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Invalid gender")
      .required("Gender is required"),
  });

  const provider_id = sessionStorage.getItem("userId");
  const initialValues = {
    mode_of_delivery: "",
    national_id: "",
    date: "",
    duration_of_labour: "",
    condition_of_mother: "",
    condition_of_baby: "",
    weight_at_birth: "",
    gender: "",
    provider_id: Number(provider_id),
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/deliveries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.msg || "Appointment created successfully!", {
          position: "top-right",
          autoClose: 6000,
        });
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Error creating appointment", {
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
        <ModalHeader>Add Delivery</ModalHeader>
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
                  <Field name="national_id">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.national_id && form.touched.national_id
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
                  <HStack spacing={4}>
                    {/* Mode of Delivery */}
                    <Field name="mode_of_delivery">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.mode_of_delivery &&
                            form.touched.mode_of_delivery
                          }
                        >
                          <FormLabel>Mode of Delivery</FormLabel>
                          <Select
                            outline={theme.colors.background[colorMode]}
                            {...field}
                            placeholder="Select mode of delivery"
                          >
                            <option value="normal">Normal</option>
                            <option value="cesarean">Cesarean</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.mode_of_delivery}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    {/* Date */}
                    <Field name="date">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.date && form.touched.date}
                        >
                          <FormLabel>Date</FormLabel>
                          <Input {...field} type="datetime-local" />
                          <FormErrorMessage>
                            {form.errors.date}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>
                  <HStack spacing={4}>
                    {/* Duration of Labour */}
                    <Field name="duration_of_labour">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.duration_of_labour &&
                            form.touched.duration_of_labour
                          }
                        >
                          <FormLabel>Duration of Labour</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.duration_of_labour}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    {/* Condition of Mother */}
                    <Field name="condition_of_mother">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.condition_of_mother &&
                            form.touched.condition_of_mother
                          }
                        >
                          <FormLabel>Condition of Mother</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.condition_of_mother}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>

                  <HStack spacing={4}>
                    {/* Condition of Baby */}
                    <Field name="condition_of_baby">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.condition_of_baby &&
                            form.touched.condition_of_baby
                          }
                        >
                          <FormLabel>Condition of Baby</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.condition_of_baby}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    {/* Birth Weight at Birth */}
                    <Field name="weight_at_birth">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.weight_at_birth &&
                            form.touched.weight_at_birth
                          }
                        >
                          <FormLabel>Child Weight at Birth</FormLabel>
                          <Input {...field} type="text" />
                          <FormErrorMessage>
                            {form.errors.weight_at_birth}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>
                  {/* Gender */}
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

export default AddDelivery;

AddDelivery.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
