import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

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
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
