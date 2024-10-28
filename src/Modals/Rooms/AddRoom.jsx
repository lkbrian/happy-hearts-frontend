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
  FormErrorMessage,
  Select,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Form, Formik, Field } from "formik";

function AddRoom({ onClose, isOpen }) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const roomType = [
    "Pediatrician",
    "Obstetrician",
    "Gynecologist",
    "Pharmacist",
    "Laboratory Technician",
    "Nutritionist",
    "Mental Health Counselor",
    "Physiotherapist",
    "Speech Therapist",
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone_number: Yup.number().required("Phone number is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Invalid gender")
      .required("Gender is required"),
    national_id: Yup.number().required("National ID is required"),
    role: Yup.string()
      .oneOf(roomType, "Invalid role")
      .required("Role is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    gender: "",
    national_id: "",
    role: "",
    password: "1234",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.msg || "Provider created successfully!", {
          position: "top-right",
          autoClose: 6000,
        });
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Error creating provider", {
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
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
        <ModalHeader>Add Room</ModalHeader>
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
                  <HStack>
                    <Field name="role">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.role && form.touched.role}
                        >
                          <FormLabel>Select a room</FormLabel>
                          <Select
                            outline={theme.colors.background[colorMode]}
                            placeholder="Select a provider"
                            {...field}
                            onChange={async (e) => {
                              const roomId = e.target.value;
                              form.setFieldValue("role", roomId); // Update form state
                            }}
                          >
                            {roomType.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {form.errors.role}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>Name</FormLabel>
                          <Input
                            outline={theme.colors.background[colorMode]}
                            {...field}
                            type="text"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>
                  <HStack>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel>Email</FormLabel>
                          <Input
                            outline={theme.colors.background[colorMode]}
                            {...field}
                            type="email"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="phone_number">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.phone_number &&
                            form.touched.phone_number
                          }
                        >
                          <FormLabel>Phone Number</FormLabel>
                          <Input
                            outline={theme.colors.background[colorMode]}
                            {...field}
                            type="text"
                          />
                          <FormErrorMessage>
                            {form.errors.phone_number}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>
                  <HStack>
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

                    <Field name="national_id">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.national_id && form.touched.national_id
                          }
                        >
                          <FormLabel>National ID</FormLabel>
                          <Input
                            outline={theme.colors.background[colorMode]}
                            {...field}
                            type="text"
                          />
                          <FormErrorMessage>
                            {form.errors.national_id}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>
                  <Button
                    mx={"auto"}
                    w="60%"
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

export default AddRoom;

AddRoom.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
