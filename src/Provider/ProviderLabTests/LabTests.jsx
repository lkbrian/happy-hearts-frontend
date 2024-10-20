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
import { EditIcon, Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination";
import AddLabTest from "./AddLabTests";
import EditLabTest from "./EditLabTest";
import { useProviderStore } from "../../utils/store";

function LabTests() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [elementData, setElementData] = useState(null);

  const { labTests, fetchLabTests } = useProviderStore((state) => ({
    labTests: state.labTests,
    fetchLabTests: state.fetchLabTests,
  }));

  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!labTests || labTests.length === 0) {
      fetchLabTests(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(labTests);

  useEffect(() => {
    setFilteredData(labTests);
  }, [labTests]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = labTests.filter(
      (item) =>
        item.test_name.toLowerCase().includes(value.toLowerCase()) ||
        item.test_date.includes(value)
    );

    setFilteredData(filteredResults);
  };

  // Pagination logic
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Paginate the filtered data
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
            placeholder="Search by test name"
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
          outline={"none"}
        >
          Add Lab Test
        </Button>
        <AddLabTest isOpen={isAddModal} onClose={onAddModalClose} />
      </Flex>
      <Table variant="simple">
        <TableCaption>Labt test</TableCaption>
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
            <Th>ID </Th>
            <Th>Test Name</Th>
            <Th>Test Date</Th>
            <Th>Result</Th>
            <Th>Remarks</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData &&
            paginatedData.map((test, index) => (
              <Tr key={index}>
                <Td>{test.lab_test_id}</Td>
                <Td>{test.test_name}</Td>
                <Td>{test.test_date}</Td>
                <Td>{test.result}</Td>
                <Td>{test.remarks}</Td>
                <Td>
                  <EditIcon
                    size="sm"
                    onClick={() => {
                      onEditModalOpen(setElementData(test));
                    }}
                  />
                  <EditLabTest
                    isOpen={isEditModal}
                    onClose={onEditModalClose}
                    data={elementData}
                  />
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

export default LabTests;
