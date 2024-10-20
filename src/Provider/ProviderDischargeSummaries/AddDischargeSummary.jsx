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
  Textarea,
} from "@chakra-ui/react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Form, Formik, Field } from "formik";

function AddDischargeSummary({ onClose, isOpen }) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const validationSchema = Yup.object({
    admission_date: Yup.date().required("Admission date is required"),
    discharge_date: Yup.date().required("Discharge date is required"),
    discharge_diagnosis: Yup.string().required("Diagnosis is required"),
    procedure: Yup.string(),
    national_id: Yup.string().required("National ID is required"),
    parent_id: Yup.string().required("Parent ID is required"),
    provider_id: Yup.number().required("Provider ID is required"),
  });

  const initialValues = {
    admission_date: "",
    discharge_date: "",
    discharge_diagnosis: "",
    procedure: "",
    national_id: "",
    parent_id: "",
    provider_id: Number(sessionStorage.getItem("userId")),
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/discharge_summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.msg || "Discharge summary created successfully!", {
          position: "top-right",
          autoClose: 6000,
        });
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Error creating Discharge summary", {
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
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={"2xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Discharge Summary</ModalHeader>
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
                  <Field name="admission_date">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.admission_date &&
                          form.touched.admission_date
                        }
                      >
                        <FormLabel>Admission Date</FormLabel>
                        <Input {...field} type="date" />
                        <FormErrorMessage>
                          {form.errors.admission_date}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="discharge_date">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.discharge_date &&
                          form.touched.discharge_date
                        }
                      >
                        <FormLabel>Discharge Date</FormLabel>
                        <Input {...field} type="date" />
                        <FormErrorMessage>
                          {form.errors.discharge_date}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="discharge_diagnosis">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.discharge_diagnosis &&
                          form.touched.discharge_diagnosis
                        }
                      >
                        <FormLabel>Discharge Diagnosis</FormLabel>
                        <Input {...field} type="text" />
                        <FormErrorMessage>
                          {form.errors.discharge_diagnosis}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="procedure">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Procedure (optional)</FormLabel>
                        <Input {...field} type="text" />
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
                        <FormLabel>Parent National ID</FormLabel>
                        <Input {...field} type="text" />
                        <FormErrorMessage>
                          {form.errors.national_id}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="parent_id">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.parent_id && form.touched.parent_id
                        }
                      >
                        <FormLabel>Parent ID</FormLabel>
                        <Input {...field} type="text" />
                        <FormErrorMessage>
                          {form.errors.parent_id}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

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

export default AddDischargeSummary;

AddDischargeSummary.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
