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
  useTheme,
  useDisclosure,
  Select,
  HStack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination";
import { useOutletContext } from "react-router";
import ApproveAppointment from "./ApproveAppointment";

function UserAppointments() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const contextData = useOutletContext();
  const data = contextData.data.appointments;
  const {
    isOpen: isAddModal,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  // const {
  //   isOpen: isEditModal,
  //   onOpen: onEditModalOpen,
  //   onClose: onEditModalClose,
  // } = useDisclosure();
  const status = [
    "approved",
    "awaiting_approval",
    "missed",
    "rejected",
    "visited",
    "pending",
  ];
  const [filteredData, setFilteredData] = useState(data);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const filteredResults = data.filter((item) => {
      // Filter by searchTerm (searchTerm matches status, parent name, or provider name)
      const matchesSearchTerm =
        item.status.includes(searchTerm) ||
        item.parent.name.includes(searchTerm) ||
        item.info.provider_name.includes(searchTerm);

      // Filter by filterTerm (matches parent name or status, but only if filterTerm is provided)
      const matchesFilterTerm = item.status.includes(filterTerm);

      // Return items that match both searchTerm and filterTerm
      return matchesSearchTerm && matchesFilterTerm;
    });

    setFilteredData(filteredResults);
  }, [searchTerm, filterTerm, data]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
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
        <HStack>
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
              placeholder="Search by parent|provider|status"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
          <Select
            outline={theme.colors.background[colorMode]}
            placeholder="Select a provider"
            onChange={(e) => {
              setFilterTerm(e.target.value);
            }}
            w={"250px"}
          >
            {status.map((status) => (
              <option
                key={status}
                value={status}
                style={{ textTransform: "Capitalize" }}
              >
                {status.replace(/_/g, " ")}
              </option>
            ))}
          </Select>
        </HStack>
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
        <ApproveAppointment onClose={onAddModalClose} isOpen={isAddModal} />
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
            <Th>Provider Name</Th>
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
              <Td>{element.info.provider_name}</Td>
              <Td>{element.appointment_date}</Td>
              <Td
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
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
                {element.status.replace(/_/g, " ")}
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

export default UserAppointments;
