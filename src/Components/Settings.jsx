import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Text,
  useColorMode,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import VerificationModal from "./VerificationModal";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  newEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

function Settings() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [passedEmail, setEmail] = useState("");

  const email = sessionStorage.getItem("userEmail");
  const accountType = sessionStorage.getItem("userRole");
  const userId = sessionStorage.getItem("userId");

  const initialValues = {
    email: email || "",
    newEmail: "",
    accountType: accountType,
    userId: userId,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setEmail(values.newEmail);
    if (values.email === values.newEmail) {
      toast.error("New email same as current", {
        position: "top-right",
        autoClose: 6000,
      });
      setLoading(false);
      setSubmitting(false);
      return;
    }
    const { userId, accountType } = values;
    try {
      const response = await fetch(`/api/changeemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, accountType }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.msg || "code sent!", {
          position: "top-right",
          autoClose: 6000,
        });
        onOpen();
      } else {
        const errorData = await response.json();
        toast.error("An error occurred", {
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
    <Box>
      <Text>
        Note that changing your email address will log you out of your account.
        You&apos;ll need to use your new email for future logins. A confirmation
        email will be sent to verify the change, so please check your new email
        for updates and important notifications.
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex gap={6} p="20px" align={"center"}>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={field.value || ""}
                      {...field}
                      // isDisabled={true}
                      readOnly
                      outline={theme.colors.background[colorMode]}
                      type="email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="newEmail">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.newEmail && form.touched.newEmail}
                  >
                    <FormLabel>New Email</FormLabel>
                    <Input
                      value={field.value || ""}
                      {...field}
                      outline={theme.colors.background[colorMode]}
                      type="newEmail"
                    />
                    <FormErrorMessage>{form.errors.newEmail}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                w="200px"
                marginTop={"25px"}
                type="submit"
                bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                _hover={{
                  bg: "linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
                }}
                color="#fff"
                isLoading={isSubmitting}
                px={"20px"}
              >
                {loading ? <Spinner /> : <Text>Confirm</Text>}
              </Button>
              <VerificationModal
                onClose={onClose}
                isOpen={isOpen}
                email={passedEmail}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default Settings;
