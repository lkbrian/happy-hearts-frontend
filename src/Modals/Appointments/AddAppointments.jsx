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
import { useParentsStore } from "../../utils/store";
function AddAppointment({ isOpen, onClose }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    provider_id: Yup.string().required("Select a doctor"),
    reason: Yup.string().required("Provide a reason for appointment"),
    appointment_date: Yup.string().required("Date of birth is required"),
  });

  const parent_id = sessionStorage.getItem("userId");
  const initialValues = {
    provider_id: "",
    reason: "",
    appointment_date: "",
    parent_id: Number(parent_id),
    status: "awaiting_approval",
  };
  const { providers, fetchProviders } = useParentsStore((state) => ({
    providers: state.providers,
    fetchProviders: state.fetchProviders,
  }));

  useEffect(() => {
    if (!providers || providers.length === 0) {
      fetchProviders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

      if (response.ok) {
        const res = await response.json();
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
        window.location.reload();
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
          <ModalHeader>Set Appointment</ModalHeader>
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
                    <Field name="provider_id">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.provider_id && form.touched.provider_id
                          }
                        >
                          <FormLabel>Select a room</FormLabel>
                          <Select
                            outline={theme.colors.background[colorMode]}
                            placeholder="Select a provider"
                            {...field}
                            onChange={async (e) => {
                              const roomId = e.target.value;
                              form.setFieldValue("provider_id", roomId); // Update form state
                            }}
                          >
                            {providers.map((provider) => (
                              <option
                                key={provider.provider_id}
                                value={provider.provider_id}
                              >
                                {provider.name} | {provider.provider_id}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {form.errors.provider_id}
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
                        //  today = new Date().toISOString().slice(0, 16);

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
                    {loading ? <Spinner /> : <Text>Set Appointment</Text>}
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

export default AddAppointment;
AddAppointment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
