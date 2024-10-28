import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
function EditAppointmentModal({ isOpen, onClose, data }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    national_id: Yup.string().required("Full Name is required"),
    reason: Yup.string().required("Provide a reason for appointment"),
    appointment_date: Yup.string().required("Date of birth is required"),
  });

  const provider_id = sessionStorage.getItem("userId");
  const initialValues = {
    reason: data?.reason,
    appointment_date: data?.appointment_date,
    provider_id: Number(provider_id),
  };
  console.log(data);
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // const { national_id, reason, appointment_date, provider_id } =
    //   values;
    setLoading(true);

    try {
      const response = await fetch(`/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const res = await response.json();
        console.log("Response res:", res);
        toast.success(res.msg || "Appointment created successfully!", {
          position: "top-right",
          autoClose: 6000,
        });
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "error Creating appointment", {
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
      resetForm();
      setTimeout(() => {
        // window.location.reload();
      }, 4000);
    }
  };
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={"xl"}
    >
      <ModalOverlay bg="rgba(0, 0, 0, 0.2)" />
      <ModalContent>
        <ModalHeader>Update Appointment</ModalHeader>
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
                          value={data.parent.national_id}
                          isDisabled={true}
                        />
                        <FormErrorMessage>
                          {form.errors.national_id}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="reason">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.reason && form.touched.reason}
                      >
                        <FormLabel>Reason for Appointment</FormLabel>
                        <Textarea
                          {...field}
                          outline={theme.colors.background[colorMode]}
                        />
                        <FormErrorMessage>
                          {form.errors.reason}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="appointment_date">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.appointment_date &&
                          form.touched.appointment_date
                        }
                      >
                        <FormLabel>Enter Appointment Date</FormLabel>
                        <Input
                          {...field}
                          outline={theme.colors.background[colorMode]}
                          type="datetime-local"
                          cursor={"text"}
                          min={new Date().toISOString().slice(0, 16)}
                          css={{
                            "&::-webkit-calendar-picker-indicator": {
                              cursor: "pointer",
                              width: "25px",
                              height: "25px", // this targets the date picker icon specifically
                            },
                          }}
                        />
                        <FormErrorMessage>
                          {form.errors.appointment_date}
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
                  {loading ? <Spinner /> : <Text>Update Appointment</Text>}
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditAppointmentModal;
EditAppointmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};
