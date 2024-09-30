import { Box, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useColorMode, useTheme } from '@chakra-ui/react';
import _ from 'lodash';
import { useParentStore } from '../utils/store';

function MedicationsTable() {
  const theme = useTheme()
  const{colorMode}=useColorMode()
    const parent = useParentStore((state) => state.parent);
    const medications = _.get(parent, "medications", []);
  return (
    <Box
      bg={theme.colors.background[colorMode]}
      color={theme.colors.text[colorMode]}
      borderRadius={".4rem"}
    >
      <Table variant={"simple"} borderTopRadius={".4rem"} padding={"8px"}>
        <TableCaption>medications</TableCaption>
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
            <Th>Name</Th>
            <Th>Dose in mg</Th>
            <Th>route</Th>
            <Th isNumeric>Dose per day</Th>
          </Tr>
        </Thead>
        <Tbody>
          {medications.map((element, index) => (
            <Tr key={index}>
              <Td>{element.name}</Td>
              <Td>{element.dose_in_mg}</Td>
              <Td>{element.route}</Td>
              <Td isNumeric>{element.dose_per_day}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default MedicationsTable