import { Box,  IconButton, Flex, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import PropTypes from 'prop-types'

function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    <Flex justifyContent="center" alignItems="center" mt={4}>
      <IconButton
        icon={<ChevronLeftIcon />}
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        mr={2}
      />
      <Text mx={2}>
        Page {currentPage} of {totalPages}
      </Text>
      <IconButton
        icon={<ChevronRightIcon />}
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        ml={2}
      />
    </Flex>
  );
}
Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};
function PaginatedList() {
  const totalItems = 100; // Total number of items
  const itemsPerPage = 10; // Items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Simulate fetching paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = Array.from(
    { length: totalItems },
    (_, index) => `Item ${index + 1}`
  );
  const paginatedItems = items.slice(startIndex, endIndex);

  return (
    <Box>
      <Box>
        {paginatedItems.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </Box>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default PaginatedList;
