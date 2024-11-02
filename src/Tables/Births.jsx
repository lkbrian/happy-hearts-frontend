import {
  Box,
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
// import AddBirth from "../Modals/Births/AddBirth";
import EditBirth from "../Modals/Births/EditBirth";
import ViewBirth from "../Modals/Births/ViewBirth";
import { useOutletContext } from "react-router";
import BirthNotificationReports from "../Reports/BirthNotificationReports";

function Births() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [elementData, setElementData] = useState(null);
  const data = useOutletContext();
  const births = data.births;

  // console.log(births);
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
  const [filteredData, setFilteredData] = useState(births);

  useEffect(() => {
    setFilteredData(births);
  }, [births]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredResults = births.filter(
      (item) =>
        item.baby_name.toLowerCase().includes(value.toLowerCase()) ||
        item.father_full_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);

  return (
    <Box
      bg={theme.colors.background[colorMode]}
      color={theme.colors.text[colorMode]}
      borderRadius=".4rem"
      padding="10px"
      flex="1"
    >
      <Flex py="10px" justify="space-between">
        <InputGroup
          bg={theme.colors.primary[colorMode]}
          w="300px"
          borderRadius=".4rem"
        >
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search by baby name or father's name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        {/* <Button onClick={onAddModalOpen} colorScheme="blue">
          Add Birth
        </Button>
        <AddBirth isOpen={isAddModal} onClose={onAddModalClose} /> */}
      </Flex>
      <Table variant="simple">
        <TableCaption>Births</TableCaption>
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
            <Th>Baby Name</Th>
            <Th>Date of Birth</Th>
            <Th>Fate</Th>
            <Th>Gender</Th>
            <Th>Mother&apos;s Name</Th>
            <Th>Place of Birth</Th>
            <Th>Type of Birth</Th>
            <Th>Date of Notification</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData?.map((birth, index) => (
            <Tr key={index}>
              <Td>{birth.baby_name}</Td>
              <Td>{birth.date_of_birth}</Td>
              <Td>{birth.fate}</Td>
              <Td>{birth.gender}</Td>
              <Td>{birth.mother_full_name}</Td>
              <Td>{birth.place_of_birth}</Td>
              <Td>{birth.type_of_birth}</Td>
              <Td>{birth.date_of_notification}</Td>
              <Td>
                <Flex gap="20px">
                  <EditIcon
                    onClick={() => {
                      setElementData(birth);
                      onEditModalOpen();
                    }}
                    cursor="pointer"
                  />
                  <EditBirth
                    isOpen={isEditModal}
                    onClose={onEditModalClose}
                    data={elementData}
                  />
                  <ViewIcon
                    onClick={() => {
                      setElementData(birth);
                      onViewModalOpen();
                    }}
                    cursor="pointer"
                  />
                  <ViewBirth
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
      <BirthNotificationReports data={births} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default Births;
