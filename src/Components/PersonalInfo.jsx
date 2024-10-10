import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  useTheme
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Privacy from "../pages/Privacy";
import TermsAndConditions from "../pages/TermsAndConditions";

const validationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  national_id: Yup.string().required("National ID is required"),
  occupation: Yup.string().required("Occupation is required"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be digits only"),
  marital_status: Yup.string().required("Marital status is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female"], "Invalid gender")
    .required("Gender is required"),
  next_of_kin: Yup.string().required("Next of Kin is required"),
  kin_phone_number: Yup.string()
    .required("Next of Kin Phone Number is required")
    .matches(/^[0-9]+$/, "Phone number must be digits only"),
  kin_email: Yup.string()
    .email("Invalid email format")
    .required("Next of Kin Email is required"),
  kin_occupation: Yup.string().required("Next of Kin Occupation is required"), // Optional field for passport
});

function PersonalInfo() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    address: "",
    national_id: "",
    occupation: "",
    phone_number: "",
    marital_status: "",
    gender: "",
    next_of_kin: "",
    kin_phone_number: "",
    kin_email: "",
    kin_occupation: "",
  };

  // const [show, setShow] = useState(false);
  // const handleClick = () => setShow(!show);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/parents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response status:", response.status); // Log response status

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        toast.success(data.msg || "Success!", {
          position: "top-right",
          autoClose: 6000,
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "An error occurred", {
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
    <Tabs
      bg={theme.colors.background[colorMode]}
      p={"10px"}
      borderRadius={".4rem"}
      h={"auto"}
    >
      <TabList borderBottomWidth="0" spacing={"20px"}>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Personal Information
        </Tab>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Terms & Condition
        </Tab>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Privacy Policy
        </Tab>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Settings
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={6} p="20px">
                  <HStack spacing={6}>
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>Full Name</FormLabel>
                          <Input
                            {...field}
                            outline={theme.colors.background[colorMode]}
                            type="text"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel>Email</FormLabel>
                          <Input
                            {...field}
                            outline={theme.colors.background[colorMode]}
                            type="email"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>
                  <HStack spacing={6}>
                    <Field name="national_id">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.national_id && form.touched.national_id
                          }
                        >
                          <FormLabel>National ID</FormLabel>
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
                    <Field name="occupation">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.occupation && form.touched.occupation
                          }
                        >
                          <FormLabel>Occupation</FormLabel>
                          <Input
                            {...field}
                            outline={theme.colors.background[colorMode]}
                            type="text"
                          />
                          <FormErrorMessage>
                            {form.errors.occupation}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>
                  <HStack spacing={6}>
                    <Field name="address">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.address && form.touched.address
                          }
                        >
                          <FormLabel>Address</FormLabel>
                          <Input
                            {...field}
                            outline={theme.colors.background[colorMode]}
                            type="text"
                          />
                          <FormErrorMessage>
                            {form.errors.address}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="phone_number">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.phone_number && form.touched.phone_number
                        }
                      >
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                          {...field}
                          outline={theme.colors.background[colorMode]}
                          type="text"
                        />
                        <FormErrorMessage>
                          {form.errors.phone_number}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  </HStack>
                  <HStack spacing={6}>
                  
                  <Field name="marital_status">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.marital_status &&
                          form.touched.marital_status
                        }
                      >
                        <FormLabel>Marital Status</FormLabel>
                        <RadioGroup
                          {...field}
                          onChange={(value) =>
                            form.setFieldValue("marital_status", value)
                          }
                          value={field.value}
                        >
                          <HStack spacing={4}>
                            <Radio value="Single">Single</Radio>
                            <Radio value="Married">Married</Radio>
                            <Radio value="Divorced">Divorced</Radio>
                          </HStack>
                        </RadioGroup>
                        <FormErrorMessage>
                          {form.errors.marital_status}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
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
                          value={field.value}
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
                  </HStack>
                  <HStack spacing={6}>
                  <Field name="next_of_kin">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.next_of_kin && form.touched.next_of_kin
                        }
                      >
                        <FormLabel>Next of Kin</FormLabel>
                        <Input
                          {...field}
                          outline={theme.colors.background[colorMode]}
                          type="text"
                        />
                        <FormErrorMessage>
                          {form.errors.next_of_kin}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="kin_phone_number">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.kin_phone_number &&
                          form.touched.kin_phone_number
                        }
                      >
                        <FormLabel>Next of Kin Phone Number</FormLabel>
                        <Input
                          {...field}
                          outline={theme.colors.background[colorMode]}
                          type="text"
                        />
                        <FormErrorMessage>
                          {form.errors.kin_phone_number}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  </HStack>
                  <HStack spacing={6}>
                  <Field name="kin_email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.kin_email && form.touched.kin_email
                        }
                      >
                        <FormLabel>Next of Kin Email</FormLabel>
                        <Input
                          {...field}
                          outline={theme.colors.background[colorMode]}
                          type="email"
                        />
                        <FormErrorMessage>
                          {form.errors.kin_email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="kin_occupation">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.kin_occupation &&
                          form.touched.kin_occupation
                        }
                      >
                        <FormLabel>Next of Kin Occupation</FormLabel>
                        <Input
                          {...field}
                          outline={theme.colors.background[colorMode]}
                          type="text"
                        />
                        <FormErrorMessage>
                          {form.errors.kin_occupation}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  </HStack>
                  <Button
                    w="100px"
                    type="submit"
                    bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
                    _hover={{
                      bg: "linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
                    }}
                    color="#fff"
                    mt="8px"
                    isLoading={isSubmitting}
                  >
                    {loading ? <Spinner /> : <Text>Save</Text>}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </TabPanel>
        <TabPanel>
          <TermsAndConditions />
        </TabPanel>
        <TabPanel>
          <Privacy />
        </TabPanel>

        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default PersonalInfo;
