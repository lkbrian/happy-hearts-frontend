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
import AddVaccinationRecord from "../Modals/VaccinationRecords/AddVacinationRecord";
import EditVaccinationRecords from "../Modals/VaccinationRecords/EditVacinationRecords";
// import { useProviderStore } from "../utils/store";
import { useOutletContext } from "react-router";
import ViewVaccinationRecords from "../Modals/VaccinationRecords/ViewVaccinationRecords";

function VaccinationRecords() {
  const theme = useTheme();
  const role = sessionStorage.getItem("userRole");
  const { colorMode } = useColorMode();
  const [elementData, setElementData] = useState(null);
  const contextData = useOutletContext();
  const vaccinationRecords = contextData.vaccination_records;

  // const { admissions, fetchAdmissions } = useProviderStore((state) => ({
  //   admissions: state.admissions,
  //   fetchAdmissions: state.fetchAdmissions,
  // }));

  // useEffect(() => {
  //   if (!admissions || admissions.length === 0) {
  //     fetchAdmissions();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
  const [filteredData, setFilteredData] = useState(vaccinationRecords);

  useEffect(() => {
    setFilteredData(vaccinationRecords);
  }, [vaccinationRecords]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = vaccinationRecords.filter(
      (item) =>
        item.reason_for_admission.toLowerCase().includes(value.toLowerCase()) ||
        item.admission_date.includes(value)
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
          display={role === "parent" ? "none" : "block"}
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
          Add Admission
        </Button>
        <AddVaccinationRecord isOpen={isAddModal} onClose={onAddModalClose} />
      </Flex>
      <Table variant="simple">
        <TableCaption>Admissions</TableCaption>
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
            <Th>ID</Th>
            <Th>Reason</Th>
            <Th>Room</Th>
            <Th>Bed</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData &&
            paginatedData.map((admission, index) => (
              <Tr key={index}>
                <Td>{admission.admission_id}</Td>
                <Td>{admission.reason_for_admission}</Td>
                <Td>{admission.room.room_number}</Td>
                <Td>{admission.bed.bed_number}</Td>
                <Td>{admission.admission_date}</Td>
                <Td>
                  <Flex alignItems={"center"} gap={"22px"}>
                    {" "}
                    <EditIcon
                      size="md"
                      onClick={() => {
                        setElementData(admission); // Set the admission data for editing
                        onEditModalOpen();
                      }}
                      display={role === "parent" ? "none" : "block"}
                      cursor={"pointer"}
                    />
                    <EditVaccinationRecords
                      isOpen={isEditModal}
                      onClose={onEditModalClose}
                      data={elementData}
                    />
                    <ViewIcon
                      size="20px"
                      onClick={() => {
                        setElementData(admission); // Set the admission data for editing
                        onViewModalOpen();
                      }}
                      cursor={"pointer"}
                    />
                    <ViewVaccinationRecords
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

export default VaccinationRecords;
