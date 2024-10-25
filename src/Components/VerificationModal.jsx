import {
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
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
import * as Yup from "yup";

function VerificationModal({ isOpen, onClose, email }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    token: Yup.string()
      .required("Token is required")
      .length(5, "Token must be exactly 5 digits"),
  });

  const initialValues = {
    token: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Submitting form with values: ", values);
    setLoading(true);
    const { token } = values;

    try {
      const response = await fetch(`/api/verifyemail/${email}/${token}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
          <ModalHeader>Verify Email</ModalHeader>
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
                    <Field name="token">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.token && form.touched.token}
                        >
                          <Text>
                            Verification Code was sent to you old email please
                            enter to verify your account and change your Email
                          </Text>
                          <PinInput>
                            <PinInputField
                              outline={theme.colors.background[colorMode]}
                              {...field}
                            />
                            <PinInputField
                              outline={theme.colors.background[colorMode]}
                              {...field}
                            />
                            <PinInputField
                              outline={theme.colors.background[colorMode]}
                              {...field}
                            />
                            <PinInputField
                              outline={theme.colors.background[colorMode]}
                              {...field}
                            />
                            <PinInputField
                              outline={theme.colors.background[colorMode]}
                              {...field}
                            />
                          </PinInput>
                          <FormErrorMessage>
                            {form.errors.token}
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
                    {loading ? <Spinner /> : <Text>Confirm</Text>}
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <small>
              Note: that closing this modal will render the code useless as a
              new one gets generated and your email won&apos;t be changed
            </small>
          </ModalFooter>{" "}
        </ModalContent>
      </Modal>
    </>
  );
}

export default VerificationModal;
VerificationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  email: PropTypes.string,
};
