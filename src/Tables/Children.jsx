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
import { useOutletContext } from "react-router";
import AddChildModal from "../Modals/Child/AddChildModal";
import EditChildModal from "../Modals/Child/EditChildModal";
function Children() {
  const theme = useTheme();
  // const role = sessionStorage.getItem("userRole");
  const { colorMode } = useColorMode();
  const data = useOutletContext();
  const children = data?.children;
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
  // const {
  //   isOpen: isViewModal,
  //   onOpen: onViewModalOpen,
  //   onClose: onViewModalClose,
  // } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(children);

  useEffect(() => {
    setFilteredData(children);
  }, [children]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = children.filter(
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
  const paginatedData = filteredData?.slice(startIndex, endIndex) || [];

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
            placeholder="Search by reason"
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
          Add Child
        </Button>
        <AddChildModal isOpen={isAddModal} onClose={onAddModalClose} />
      </Flex>
      <Table variant="simple" padding={"8px"}>
        <TableCaption>children</TableCaption>
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
            <Th>Cert No</Th>
            <Th>Name </Th>
            <Th>Gender</Th>
            <Th>Age</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData &&
            paginatedData?.map((element, index) => (
              <Tr key={index}>
                <Td>{element.certificate_No}</Td>
                <Td>{element.fullname}</Td>
                <Td>{element.gender}</Td>
                <Td>
                  {(() => {
                    const ageParts = element.age.split(",");

                    for (let part of ageParts) {
                      let value = parseInt(part);
                      if (value !== 0) {
                        return part;
                      }
                    }

                    return "0 days";
                  })()}
                </Td>
                <Td isNumeric>
                  <Flex alignItems={"center"} gap={"22px"}>
                    {" "}
                    <EditIcon
                      size="md"
                      onClick={() => {
                        onEditModalOpen(setElementData(paginatedData[index]));
                      }}
                      // display={role === "parent" ? "none" : "block"}
                      cursor={"pointer"}
                    />
                    <EditChildModal
                      isOpen={isEditModal}
                      onClose={onEditModalClose}
                      data={elementData}
                    />
                    {/* <ViewIcon
                    size="20px"
                    onClick={() => {
                      setElementData(admission); // Set the admission data for editing
                      onViewModalOpen();
                    }}
                    cursor={"pointer"}
                  />
                  <ViewAdmission
                    isOpen={isViewModal}
                    onClose={onViewModalClose}
                    data={elementData}
                  /> */}
                  </Flex>
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

export default Children;
