import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import _ from "lodash";
import { useParentStore } from "../utils/store";

function ChildrensTable() {
    const theme = useTheme();
    const { colorMode } = useColorMode();
  const parent = useParentStore((state) => state.parent);
  const children = _.get(parent, "children", []);
  return (
    <Box
      bg={theme.colors.background[colorMode]}
      color={theme.colors.text[colorMode]}
      borderRadius={".4rem"}
    >
      <Table variant="simple"  padding={"8px"}>
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
            <Th isNumeric>Age</Th>
          </Tr>
        </Thead>
        <Tbody>
          {children.map((element, index) => (
            <Tr key={index}>
              <Td>{element.certificate_No}</Td>
              <Td>{element.fullname}</Td>
              <Td>{element.gender}</Td>
              <Td isNumeric>{element.age.split(",")[0]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default ChildrensTable;


