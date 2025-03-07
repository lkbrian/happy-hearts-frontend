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
import Pagination from "../Components/Pagination";
import AddDischargeSummary from "../Modals/Discharges/AddDischargeSummary";
import EditDischargeSummary from "../Modals/Discharges/EditDischargeSummary";
import { useProviderStore } from "../utils/store";

function Discharges() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [elementData, setElementData] = useState(null);

  const { discharge_summaries, fetchDischargeSummaries } = useProviderStore(
    (state) => ({
      discharge_summaries: state.discharge_summaries,
      fetchDischargeSummaries: state.fetchDischargeSummaries,
    })
  );

  useEffect(() => {
    if (!discharge_summaries || discharge_summaries.length === 0) {
      fetchDischargeSummaries();
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

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(discharge_summaries);

  useEffect(() => {
    setFilteredData(discharge_summaries);
  }, [discharge_summaries]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = discharge_summaries.filter(
      (item) =>
        item.discharge_diagnosis.toLowerCase().includes(value.toLowerCase()) ||
        item.discharge_date.includes(value)
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
            placeholder="Search by diagnosis"
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
          Add Discharge Summary
        </Button>
        <AddDischargeSummary isOpen={isAddModal} onClose={onAddModalClose} />
      </Flex>
      <Table variant="simple">
        <TableCaption>Discharge Summaries</TableCaption>
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
            <Th>Diagnosis</Th>
            <Th>Discharge Date</Th>
            <Th>Provider</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData &&
            paginatedData.map((summary, index) => (
              <Tr key={index}>
                <Td>{summary.discharge_diagnosis}</Td>
                <Td>{summary.discharge_date}</Td>
                <Td>{summary.provider.name}</Td>
                <Td>
                  <EditIcon
                    size="sm"
                    onClick={() => {
                      onEditModalOpen(setElementData(summary));
                    }}
                  />
                  <EditDischargeSummary
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

export default Discharges;
