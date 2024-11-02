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
// import AddPresentPregnancy from "../Modals/PresentPregnancy/AddPresentPregnancy";
import AddPresentPregnancy from "../Modals/PresentPregnancy/AddPresentPregnancy";
import EditPresentPregnancy from "../Modals/PresentPregnancy/EditPresentPregnancy";
// import { useProviderStore } from "../utils/store";
import { useOutletContext } from "react-router";
import ViewPresentPregnancy from "../Modals/PresentPregnancy/ViewPresentPregnancy";
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function PresentPregnancy() {
  const theme = useTheme();
  const role = sessionStorage.getItem("userRole");
  const { colorMode } = useColorMode();
  const [elementData, setElementData] = useState(null);

  const contextData = useOutletContext();
  const presentPregnancies = contextData.present_pregnancies;

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
  const [filteredData, setFilteredData] = useState(presentPregnancies);

  useEffect(() => {
    setFilteredData(presentPregnancies);
  }, [presentPregnancies]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = presentPregnancies.filter(
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
          Add pregnancy
        </Button>
        <AddPresentPregnancy isOpen={isAddModal} onClose={onAddModalClose} />
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
              <Th>ID</Th>

              <Th>Weight (kg)</Th>
              <Th>Urinalysis</Th>
              <Th>Blood Pressure</Th>
              <Th>Pollar</Th>
              <Th>Maturity (weeks)</Th>
              <Th>Fundal Height</Th>
              <Th>Comments</Th>
              <Th>Clinical Notes</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData &&
              paginatedData.map((pregnancy, index) => (
                <Tr key={index}>
                  <Td>{pregnancy.pp_id}</Td>
                  <Td>{pregnancy.weight_in_kg}</Td>
                  <Td>{pregnancy.urinalysis}</Td>
                  <Td>{pregnancy.blood_pressure}</Td>
                  <Td>{pregnancy.pollar}</Td>
                  <Td>{pregnancy.maturity_in_weeks}</Td>
                  <Td>{pregnancy.fundal_height}</Td>
                  <Td
                    maxW={"300px"}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pregnancy.comments || "None"}
                  </Td>
                  <Td
                    maxW={"300px"}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pregnancy.clinical_notes || "None"}
                  </Td>
                  <Td>{formatDate(pregnancy.date)}</Td>

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
                      <EditPresentPregnancy
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
                      <ViewPresentPregnancy
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

export default PresentPregnancy;
