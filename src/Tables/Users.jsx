/* eslint-disable react-hooks/exhaustive-deps */
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
  // useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";
import { useOutletContext } from "react-router";

function Users() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const userData = useOutletContext();
  const data = userData.users;
  const [filteredData, setFilteredData] = useState(data);
  const [isDashboard, setIsDashboard] = useState(false);
  const path = window.location.pathname;
  const dashboard = path.split("/").pop();

  const {
    // isOpen: isAddModal,
    onOpen: onAddModalOpen,
    // onClose: onAddModalClose,
  } = useDisclosure();
  // const {
  //   isOpen: isEditModal,
  //   onOpen: onEditModalOpen,
  //   onClose: onEditModalClose,
  // } = useDisclosure();

  useEffect(() => {
    if (dashboard === "dashboard") {
      setIsDashboard(!isDashboard);
    }
  }, [dashboard]);
  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredResults = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search by name or email"
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
          display={isDashboard ? "none" : "block"}
        >
          Add new
        </Button>
      </Flex>

      <Table variant="simple" padding={"8px"}>
        <TableCaption>Users</TableCaption>
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
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th isNumeric>Created on</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((user, index) => (
            <Tr key={index}>
              <Td>{user.user_id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td isNumeric>{user.timestamp}</Td>
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

export default Users;
