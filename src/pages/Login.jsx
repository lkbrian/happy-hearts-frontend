import { MoonIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import login_img from "../assets/login.png";
import { useAuth } from "../utils/AuthContext";
import { AiFillSun } from "react-icons/ai";

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
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
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
      bg={theme.colors.background[colorMode]}
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
        minH="500px"
        borderRadius="md"
        bg={theme.colors.background[colorMode]}
        color={theme.colors.text[colorMode]}
        shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
        outline={"none"}
        border={"none"}
        maxW={{ base: "100%", md: "600px" }}
        flex={{ base: 1, lg: 0.5 }}
        p={4}
        overflow={"wrap"}
      >
        <Heading
          bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
          bgClip="text"
          py={"20px"}
          textAlign={"center"}
        >
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
                            // shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            // outline={"none"}
                            outline={theme.colors.background[colorMode]}
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
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel>Email:</FormLabel>
                      <Input
                        {...field}
                        // shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                        outline={theme.colors.background[colorMode]}
                        // border={"none"}
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
                          // shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                          outline={theme.colors.background[colorMode]}
                          // border={"none"}
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
                  bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"   
                  _hover={{bg:'linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)'}}               
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
