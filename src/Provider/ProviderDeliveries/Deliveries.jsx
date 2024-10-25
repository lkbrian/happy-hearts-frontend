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
import AddDelivery from "./AddDelivery";
import EditDelivery from "./EditDelivery";
import { useProviderStore } from "../../utils/store";

function Deliveries() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [elementData, setElementData] = useState(null);
  // const [deliveries, setDeliveries] = useState(null);
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
  const { deliveries, fetchDeliveries } = useProviderStore((state) => ({
    deliveries: state.deliveries,
    fetchDeliveries: state.fetchDeliveries,
  }));

  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!deliveries || deliveries.length === 0) {
      fetchDeliveries(id);
    }
  }, [fetchDeliveries, deliveries, id]);
  // condition_of_baby: "Healthy";
  // condition_of_mother: "Stable";
  // date: "2024-09-25 14:30:00";
  // delivery_id: 1;
  // duration_of_labour: "6 hours";
  // gender: "Female";
  // mode_of_delivery: "Caesarean";
  // useEffect(() => {
  //   const id = sessionStorage.getItem("userId");
  //   const role = sessionStorage.getItem("userRole");
  //   const providerUrl = `/api/appointments/provider/${id}`;
  //   const url = `/api/appointments`;
  //   const fetchDeliveries = async () => {
  //     const response = await fetch(role === "provider" ? providerUrl : url);
  //     if (!response.ok)
  //       throw new Error(`HTTP Error! status: ${response.status}`);
  //     const data = await response.json();
  //     setDeliveries(data);
  //     console.log(data);
  //   };
  //   fetchDeliveries();
  // }, []);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(deliveries);

  useEffect(() => {
    setFilteredData(deliveries);
  }, [deliveries]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = deliveries.filter(
      (item) =>
        item.mode_of_delivery.toLowerCase().includes(value.toLowerCase()) ||
        item.id.includes(value) ||
        item.date.includes(value)
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
        <AddDelivery isOpen={isAddModal} onClose={onAddModalClose} />
      </Flex>

      <Table
        variant="simple"
        padding={"8px"}
        overflow={"hidden"}
        // overflowX={"scroll"}
      >
        <TableCaption>Deliveries</TableCaption>
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
            <Th>Mode</Th>
            <Th>duration of labour</Th>
            <Th>Baby&apos;s condition</Th>
            <Th>Baby&apos;s weight</Th>
            <Th>Mothers&apos;s condition</Th>
            <Th>Gender</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData?.map((element, index) => (
            <Tr key={index} w={"140px"}>
              <Td>{element.delivery_id}</Td>
              <Td>{element.mode_of_delivery}</Td>
              <Td>{element.duration_of_labour}</Td>
              <Td>{element.condition_of_baby}</Td>
              <Td>{element.weight_at_birth}</Td>
              <Td>{element.condition_of_mother}</Td>
              <Td>{element.gender}</Td>
              <Td>{element.date}</Td>

              <Td textAlign={"center"}>
                <EditIcon
                  cursor={"pointer"}
                  size={"20px"}
                  onClick={() =>
                    onEditModalOpen(setElementData(paginatedData[index]))
                  }
                />
                <EditDelivery
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

export default Deliveries;

// Deliveries;
