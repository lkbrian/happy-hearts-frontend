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
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination";
import { useOutletContext } from "react-router";
import AddMedicine from "./AddMedicine";

function Medicines() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const contextData = useOutletContext();
  const data = contextData.data.medicines;
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

  const [filteredData, setFilteredData] = useState(data);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredResults = data.filter((item) =>
      item.name.includes(searchTerm)
    );
    setFilteredData(filteredResults);
  }, [searchTerm, data]);

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
            placeholder="Search by room number"
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
        <AddMedicine onClose={onAddModalClose} isOpen={isAddModal} />
      </Flex>
      <Box></Box>
      <Table variant="simple" padding={"8px"}>
        <TableCaption>Medicines</TableCaption>
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
            <Th>Medicine ID</Th>
            <Th>Name</Th>
            <Th>Indication</Th>
            <Th>Dosage</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((medicine) => (
            <Tr key={medicine.medicine_id}>
              <Td>{medicine.medicine_id}</Td>
              <Td>{medicine.name}</Td>
              <Td
                maxW={"300px"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {medicine.indication}
              </Td>
              <Td
                maxW={"300px"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {medicine.dosage}
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

export default Medicines;
