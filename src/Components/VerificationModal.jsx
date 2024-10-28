import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  // Stack,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useAuth } from "../utils/AuthContext";

function VerificationModal({ isOpen, onClose, email }) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { logout } = useAuth();

  const validationSchema = Yup.object({
    pin_one: Yup.string().required(""),
    pin_two: Yup.string().required(""),
    pin_three: Yup.string().required(""),
    pin_four: Yup.string().required(""),
    pin_five: Yup.string().required(""),
  });

  const initialValues = {
    token: "",
    pin_one: "",
    pin_two: "",
    pin_three: "",
    pin_four: "",
    pin_five: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    const { pin_one, pin_two, pin_three, pin_four, pin_five } = values;
    const code = String(pin_one + pin_two + pin_three + pin_four + pin_five);
    try {
      const response = await fetch(`/api/verifyemail/${email}/${code}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: code }),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.msg || "Email updated sucessfully", {
          position: "top-right",
          autoClose: 6000,
        });
        sessionStorage.setItem("userEmail", email);

        setTimeout(() => {
          logout();
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "error encountered", {
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
      //   window.location.refresh();
      // }, 4000);
    }
  };
  const pinRefs = useRef([]);
  const move = (event, prev, current, next) => {
    const length = current.value.length;
    const maxlength = current.maxLength;

    if (length === maxlength && next) {
      next.focus();
    }
    if (event.key === "Backspace" && length === 0 && prev) {
      prev.focus();
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
        bg={theme.colors.sidebar[colorMode]}
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
                  <Text>
                    Verification Code was sent to you old email please enter to
                    verify your account and change your Email
                  </Text>
                  <Flex gap={"2px"} p="20px" pb={"40px"} align={"center"}>
                    {[
                      "pin_one",
                      "pin_two",
                      "pin_three",
                      "pin_four",
                      "pin_five",
                    ].map((name, index) => (
                      <Field name={name} key={index}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors[name] && form.touched[name]}
                          >
                            <Input
                              ref={(el) => (pinRefs.current[index] = el)}
                              onKeyUp={(e) =>
                                move(
                                  e,
                                  pinRefs.current[index - 1] || null,
                                  pinRefs.current[index],
                                  pinRefs.current[index + 1] || null
                                )
                              }
                              {...field}
                              w={"50px"}
                              h={"60px"}
                              maxLength="1"
                              fontSize={"20px"}
                              fontWeight={"bold"}
                              outline={"#2179f3"}
                              border={"2px solid #2179f3"}
                            />
                            <FormErrorMessage>
                              {form.errors[name]}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    ))}
                  </Flex>
                  <Button
                    w="100%"
                    m={"auto"}
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
              Note: that closing this modal will render the code useless. As a
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
