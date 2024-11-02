import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { EditIcon, Search2Icon, ViewIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";
import AddPrescriptions from "../Modals/Prescriptions/AddPrescription";
import EditPrescriptions from "../Modals/Prescriptions/EditPrescriptions";
// import { useProviderStore } from "../utils/store";
import { useOutletContext } from "react-router";

import ViewMedicalInfo from "../Modals/Medications/ViewMedications";
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function Prescriptions() {
  const theme = useTheme();
  // const role = sessionStorage.getItem("userRole");
  const { colorMode } = useColorMode();
  const [elementData, setElementData] = useState(null);
  const contextData = useOutletContext();
  const prescriptions = contextData.prescriptions;
  console.log("context data", contextData);
  console.log("prescriptions data", prescriptions);

  const {
    isOpen: isAddModal,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModal,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const {
    isOpen: isViewModal,
    onOpen: onViewModalOpen,
    onClose: onViewModalClose,
  } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(prescriptions);
  const role = sessionStorage.getItem("userRole");

  useEffect(() => {
    setFilteredData(prescriptions);
  }, [prescriptions]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredResults = prescriptions.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.size_in_mg.toLowerCase().includes(value.toLowerCase()) ||
        item.route.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredResults);
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);

  return (
    <Box
      bg={theme.colors.background[colorMode]}
      color={theme.colors.text[colorMode]}
      borderRadius={".4rem"}
      padding={"10px"}
      flex={"1"}
    >
      <Flex py={"10px"} justify={"space-between"}>
        <InputGroup
          bg={theme.colors.primary[colorMode]}
          w={"300px"}
          borderRadius={".4rem"}
          border={"none"}
        >
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            border={"none"}
            outline={"none"}
            placeholder="Search by reason"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <Button
          // display={role === "parent" ? "none" : "block"}
          bg={
            "linear-gradient(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
          }
          color={"#fff"}
          _hover={{
            bg: "linear-gradient(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
          }}
          onClick={onAddModalOpen}
          outline={"none"}
        >
          Add Medication
        </Button>
        <AddPrescriptions isOpen={isAddModal} onClose={onAddModalClose} />
      </Flex>
      <Table variant="simple">
        <TableCaption>Medical Information</TableCaption>
        <Thead
          sx={{
            bg: colorMode === "light" ? "#1A202C" : "#ebf2fa",
            color: colorMode === "light" ? "#ebf2fa" : "#1A202C",
            th: {
              color: colorMode === "light" ? "#ebf2fa" : "#1A202C",
            },
          }}
        >
          <Tr>
            <Th>Medicine</Th>
            <Th isNumeric>Dosage</Th>
            <Th isNumeric>Duration(days)</Th>
            <Th>Expiry Date</Th>
            <Th>Filled Date</Th>
            <Th isNumeric>Quantity</Th>
            <Th isNumeric>Refill Count</Th>
            <Th display={role !== "provider" ? "static" : "none"}>Provider</Th>
            <Th>Parent/child</Th>

            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData?.map((prescription, index) => (
            <Tr key={index}>
              <Td>{prescription.medicine.name}</Td>
              <Td isNumeric>{prescription.dosage}</Td>
              <Td isNumeric>{prescription.duration}</Td>
              <Td>{formatDate(prescription.filled_date)}</Td>
              <Td>{formatDate(prescription.expiry_date)}</Td>
              <Td isNumeric>{prescription.quantity}</Td>
              <Td isNumeric>{prescription.refill_count}</Td>
              <Td display={role !== "provider" ? "static" : "none"}>
                {prescription.provider.name}
              </Td>
              <Td>
                {prescription.parent
                  ? prescription.parent.name + "(parent)"
                  : ""}
                {prescription.child
                  ? prescription.child.fullname + "(child)"
                  : ""}
              </Td>
              <Td>
                <Flex alignItems={"center"} gap={"22px"}>
                  {" "}
                  <EditIcon
                    size="md"
                    onClick={() => {
                      onEditModalOpen(setElementData(prescription));
                    }}
                    display={role === "provider" ? "block" : "none"}
                    cursor={"pointer"}
                  />
                  <EditPrescriptions
                    isOpen={isEditModal}
                    onClose={onEditModalClose}
                    data={elementData}
                  />
                  <ViewIcon
                    size="20px"
                    onClick={() => {
                      onViewModalOpen(setElementData(prescription));
                    }}
                    cursor={"pointer"}
                  />
                  <ViewMedicalInfo
                    isOpen={isViewModal}
                    onClose={onViewModalClose}
                    data={elementData}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default Prescriptions;
