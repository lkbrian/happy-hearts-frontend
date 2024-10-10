import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Text,
  Input,
  Spinner,
  useTheme,
  useColorMode,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import forgot_img from "../assets/forgot.png";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { AiFillSun } from "react-icons/ai";
import { MoonIcon } from "@chakra-ui/icons";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const validation = Yup.object({
    account_type: Yup.string().required("Account type is needed"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });
  const initialvalues = {
    account_type: "",
    email: "",
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // const { account_type, email } = values;
    setLoading(true);
    try {
      const response = await fetch("api/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.msg || "reset link has been sent to your email", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
        console.log(data);
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "An error occurred", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
        throw new Error(errorData.msg || "An error occurred");
      }
    } catch (error) {
      console.error("Erorror submitting form:", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
      resetForm();
    }
  };
  return (
    <Flex
      h="100vh"
      px={{ base: "20px", md: "70px" }}
      w="100vw"
      align="center"
      justifyContent="center"
    >
      <Flex
        onClick={toggleColorMode}
        cursor={"pointer"}
        pos={"absolute"}
        top={4}
        right={10}
        gap={"5px"}
        align={"center"}
      >
        {colorMode === "dark" ? <Text>light</Text> : <Text>dark</Text>}
        {colorMode === "dark" ? (
          <AiFillSun fontSize={"28px"} color={theme.colors.icon[colorMode]} />
        ) : (
          <MoonIcon fontSize={"20px"} color={theme.colors.icon[colorMode]} />
        )}
      </Flex>
      <Box
        shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
        outline={"none"}
        border={"none"}
        borderRadius="md"
        bg={theme.colors.background[colorMode]}
        maxW={{ base: "100%", md: "600px" }}
        flex={{ base: 1, lg: 0.5 }}
        p={4}
        py={"30px"}
      >
        <Heading
          bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
          bgClip={"text"}
          py={"20px"}
          textAlign={"center"}
        >
          Forgot Password
        </Heading>
        <Formik
          validationSchema={validation}
          initialValues={initialvalues}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={8} px={"20px"}>
                <Field name="account_type">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.account_type && form.touched.account_type
                      }
                    >
                      <FormLabel mb={"12px"}>Account type:</FormLabel>

                      <RadioGroup
                        {...field}
                        w={"100%"}
                        onChange={(value) =>
                          form.setFieldValue("account_type", value)
                        }
                        value={field.value}
                      >
                        <Flex mt={2} justify="space-between" wrap="wrap">
                          <Radio
                            // shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={theme.colors.background[colorMode]}
                            // border={"none"}
                            size={{ base: "md", md: "lg" }}
                            value="parent"
                          >
                            Parent
                          </Radio>
                          <Radio
                            // shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={theme.colors.background[colorMode]}
                            // border={"none"}
                            size={{ base: "md", md: "lg" }}
                            colorScheme="green"
                            value="provider"
                          >
                            Provider
                          </Radio>
                          <Radio
                            // shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={theme.colors.background[colorMode]}
                            // border={"none"}
                            size={{ base: "md", md: "lg" }}
                            colorScheme="red"
                            value="user"
                          >
                            User
                          </Radio>
                        </Flex>
                      </RadioGroup>
                      <FormErrorMessage>
                        {form.errors.account_type}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.errors.touched}
                    >
                      <FormLabel>Email:</FormLabel>
                      <Input
                        {...field}
                        // shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                        outline={theme.colors.background[colorMode]}
                        // border={"none"}
                        mb={"20px"}
                      />
                      <FormErrorMessage>{form.errors.mail}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  w={"100%"}
                  type="submit"
                  bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                  _hover={{
                    bg: "#linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
                  }}
                  color="#fff"
                  mb={"20px"}
                  disabled={isSubmitting}
                >
                  {loading ? <Spinner /> : <Text>Submit</Text>}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        w="50%"
        flex={{ base: 1, lg: 0.5 }}
        display={{ base: "none", lg: "block" }}
      >
        <Image maxW={"100%"} objectFit={"contain"} src={forgot_img} />
      </Box>
    </Flex>
  );
}

export default ForgotPassword;
