import {
  Box,
  Flex,
  Heading,
  Image,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  FormLabel,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useState } from "react";
import login_img from "../assets/login.png";
import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const validation = Yup.object({
  account_type: Yup.string().required("Account type is needed"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be atleast 8 characters long"),
});

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const initialvalues = {
    account_type: "",
    email: "",
    password: "",
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    try {
      await login(values.email, values.password, values.account_type);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
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
      <Box
        minH="500px"
        borderRadius="md"
        bg="white"
        shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
        outline={"none"}
        border={"none"}
        maxW={{ base: "100%", md: "600px" }}
        flex={{ base: 1, lg: 0.5 }}
        p={4}
        overflow={"wrap"}
      >
        <Heading color={"#2179F3"} py={"20px"} textAlign={"center"}>
          Login
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
                            shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={"none"}
                            border={"none"}
                            size={{ base: "md", md: "lg" }}
                            value="parent"
                          >
                            Parent
                          </Radio>
                          <Radio
                            shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={"none"}
                            border={"none"}
                            size={{ base: "md", md: "lg" }}
                            colorScheme="green"
                            value="provider"
                          >
                            Provider
                          </Radio>
                          <Radio
                            shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={"none"}
                            border={"none"}
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
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel>Email:</FormLabel>
                      <Input
                        {...field}
                        shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                        outline={"none"}
                        border={"none"}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel>Password:</FormLabel>
                      <InputGroup>
                        <Input
                          shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                          outline={"none"}
                          border={"none"}
                          {...field}
                          type={show ? "text" : "password"}
                        />
                        <InputRightElement>
                          <Box cursor={"pointer"} onClick={handleClick}>
                            {show ? <ViewIcon /> : <ViewOffIcon />}
                          </Box>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Text>
                  <Link to="/forgot_password">Forgot password?</Link> |{" "}
                  <Link to={"/register"}>Create account</Link>
                </Text>
                <Button
                  w={"100%"}
                  type="submit"
                  bg="#101f3c"
                  _hover={{ bg: "#2179F3" }}
                  color="#fff"
                  m={"10px"}
                  mb={"12px"}
                  disabled={isSubmitting}
                >
                  {loading ? <Spinner /> : <Text>Sign in</Text>}
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
        <Image objectFit={"contain"} maxW={"100%"} src={login_img} />
      </Box>
    </Flex>
  );
}

export default Login;
