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
import { useOutletContext } from "react-router";
import { EditIcon, Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination";
import AddAppoinmentModal from "./AddAppoinmentModal";
import EditAppointmentModal from "./EditAppointmentModal";

function Appointments() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const data = useOutletContext();
  const [elementData, setElementData] = useState(null);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const appointments = data?.appointments || [];

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(appointments);

  useEffect(() => {
    setFilteredData(appointments);
  }, [appointments]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = appointments.filter(
      (item) =>
        item.parent.name.toLowerCase().includes(value.toLowerCase()) ||
        item.appointment_date.includes(value)
    );

    setFilteredData(filteredResults);
  };

  // Pagination logic
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Paginate the filtered data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

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
            placeholder="Search by parent name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <Button
          bg={
            "linear-gradient(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
          }
          color={"#fff"}
          _hover={{
            bg: "linear-gradient(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
          }}
          onClick={onAddModalOpen}
        >
          Add new
        </Button>
        <AddAppoinmentModal isOpen={isAddModal} onClose={onAddModalClose} />
      </Flex>

      <Table variant="simple" padding={"8px"}>
        <TableCaption>Appointments</TableCaption>
        <Thead
          borderRadius={".4rem"}
          sx={{
            bg: colorMode === "light" ? "#1A202C" : "#ebf2fa",
            color: colorMode === "light" ? "#ebf2fa" : "#1A202C",
            th: {
              color: colorMode === "light" ? "#ebf2fa" : "#1A202C",
            },
          }}
        >
          <Tr>
            <Th>Id</Th>
            <Th>Parent Name</Th>
            <Th>Date</Th>
            <Th>Reason</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((element, index) => (
            <Tr key={index} w={"140px"}>
              <Td>{element.appointment_id}</Td>
              <Td>{element.parent.name}</Td>
              <Td>{element.appointment_date}</Td>
              <Td whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {element.reason}
              </Td>
              <Td
                style={{
                  color:
                    element.status === "pending"
                      ? "#F9B264"
                      : element.status === "visited"
                      ? "#228B22"
                      : element.status === "awaiting_approval"
                      ? "#2179f3"
                      : element.status === "missed"
                      ? "crimson"
                      : element.status === "rejected"
                      ? "crimson"
                      : element.status === "approved"
                      ? "#3fc49e"
                      : "gray.500",
                }}
              >
                {element.status}
              </Td>
              <Td textAlign={"center"}>
                <EditIcon
                  cursor={"pointer"}
                  size={"20px"}
                  onClick={() =>
                    onEditModalOpen(setElementData(paginatedData[index]))
                  }
                />
                <EditAppointmentModal
                  isOpen={isEditModal}
                  onClose={onEditModalClose}
                  data={elementData}
                />
                {}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination Component */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default Appointments;
