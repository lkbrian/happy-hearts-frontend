import {
  Box,
  // Button,
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
// import AddPreviousPregnancy from "../Modals/PreviousPregnancy/AddPreviousPregnancy";
import EditPreviousPregnancy from "../Modals/PreviousPregnancy/EditPreviousPregnancy";
// import { useProviderStore } from "../utils/store";
import { useOutletContext } from "react-router";
import ViewPreviousPregnancy from "../Modals/PreviousPregnancy/ViewPreviousPregnancy";
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function PreviousPregnancy() {
  const theme = useTheme();
  const role = sessionStorage.getItem("userRole");
  const { colorMode } = useColorMode();
  const [elementData, setElementData] = useState(null);

  const contextData = useOutletContext();
  const previousPregnancies = contextData.previous_pregnancies;

  // const {
  //   isOpen: isAddModal,
  //   onOpen: onAddModalOpen,
  //   onClose: onAddModalClose,
  // } = useDisclosure();
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
  const [filteredData, setFilteredData] = useState(previousPregnancies);

  useEffect(() => {
    setFilteredData(previousPregnancies);
  }, [previousPregnancies]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = previousPregnancies.filter(
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
      overflowX={"hidden"}
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
        {/* <Button
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
          Add pregnancy
        </Button>
        <AddPreviousPregnancy isOpen={isAddModal} onClose={onAddModalClose} /> */}
      </Flex>
      <Box className="scrollbar" overflowX={"auto"}>
        <Table variant="simple">
          <TableCaption>pregnancies</TableCaption>
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
              <Th>Delivery ID</Th>
              <Th>Fate</Th>
              <Th>Gender</Th>
              <Th>Maturity</Th>
              <Th>Puerperium</Th>
              <Th>Type of Delivery</Th>
              <Th>Weight (kg)</Th>
              <Th>Remarks</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData &&
              paginatedData.map((pregnancy, index) => (
                <Tr key={index}>
                  <Td>{pregnancy.delivery_id}</Td>
                  <Td>{pregnancy.fate}</Td>
                  <Td>{pregnancy.gender}</Td>
                  <Td>{pregnancy.maturity}</Td>
                  <Td>{pregnancy.puerperium}</Td>
                  <Td>{pregnancy.type_of_delivery}</Td>
                  <Td>{pregnancy.weight_in_kg}</Td>
                  <Td
                    maxW={"300px"}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pregnancy.remarks || "N/A"}
                  </Td>
                  <Td>{formatDate(pregnancy.timestamp)}</Td>

                  <Td>
                    <Flex alignItems={"center"} gap={"22px"}>
                      {" "}
                      <EditIcon
                        size="md"
                        onClick={() => {
                          onEditModalOpen(setElementData(pregnancy));
                        }}
                        display={role === "parent" ? "none" : "block"}
                        cursor={"pointer"}
                      />
                      <EditPreviousPregnancy
                        isOpen={isEditModal}
                        onClose={onEditModalClose}
                        data={elementData}
                      />
                      <ViewIcon
                        size="20px"
                        onClick={() => {
                          onViewModalOpen(setElementData(pregnancy));
                        }}
                        cursor={"pointer"}
                      />
                      <ViewPreviousPregnancy
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
      </Box>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default PreviousPregnancy;
