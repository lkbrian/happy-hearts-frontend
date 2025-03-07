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
import AddMedicalInfo from "../Modals/MedicalInfo/AddMedicalInfo";
import EditMedicalInfo from "../Modals/MedicalInfo/EditMedicalInfo";
// import { useProviderStore } from "../utils/store";
import { useOutletContext } from "react-router";

import ViewMedicalInfo from "../Modals/MedicalInfo/ViewMedicalInfo";

function MedicalInfo() {
  const theme = useTheme();
  const role = sessionStorage.getItem("userRole");
  const { colorMode } = useColorMode();
  const [elementData, setElementData] = useState(null);
  const contextData = useOutletContext();
  const medicalInfos = contextData.medical_info;
  // const { medicalInfos, fetchMedicalInfos } = useProviderStore((state) => ({
  //   medicalInfos: state.medicalInfos,
  //   fetchMedicalInfos: state.fetchMedicalInfos,
  // }));

  // useEffect(() => {
  //   if (!medicalInfos || medicalInfos.length === 0) {
  //     fetchMedicalInfos();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
  const [filteredData, setFilteredData] = useState(medicalInfos);

  useEffect(() => {
    setFilteredData(medicalInfos);
  }, [medicalInfos]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = medicalInfos.filter(
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
          Add Admission
        </Button>
        <AddMedicalInfo isOpen={isAddModal} onClose={onAddModalClose} />
      </Flex>
      <Table variant="simple">
        <TableCaption>Medical Information</TableCaption>
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
            <Th>Blood Transfusion</Th>
            <Th>Diabetes</Th>
            <Th>Hypertension</Th>
            <Th>Family History</Th>
            <Th>Tuberculosis</Th>
            <Th>Twins</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData &&
            paginatedData.map((info, index) => (
              <Tr key={index}>
                <Td>{info.blood_transfusion}</Td>
                <Td>{info.diabetes}</Td>
                <Td>{info.hypertension}</Td>
                <Td>{info.family_history}</Td>
                <Td>{info.tuberculosis}</Td>
                <Td>{info.twins}</Td>

                <Td>
                  <Flex alignItems={"center"} gap={"22px"}>
                    {" "}
                    <EditIcon
                      size="md"
                      onClick={() => {
                        onEditModalOpen(setElementData(info));
                      }}
                      display={role === "parent" ? "none" : "block"}
                      cursor={"pointer"}
                    />
                    <EditMedicalInfo
                      isOpen={isEditModal}
                      onClose={onEditModalClose}
                      data={elementData}
                    />
                    <ViewIcon
                      size="20px"
                      onClick={() => {
                        onViewModalOpen(setElementData(info));
                      }}
                      cursor={"pointer"}
                    />
                    <ViewMedicalInfo
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default MedicalInfo;
