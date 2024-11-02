import { useState } from "react";
import { Box, Input, List, ListItem, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Autocomplete = ({ options, isObjectArray }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredOptions(
      options.filter((option) => {
        const displayValue = isObjectArray ? "object" : option;
        return displayValue.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  const handleOptionClick = (option) => {
    setSelectedValues((prev) => [...prev, option]);
    setSearchTerm(""); // Clear input after selection
    setFilteredOptions(options); // Reset options
  };

  return (
    <VStack align="start" width="100%">
      <Input
        placeholder="Type to filter options..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm && filteredOptions.length > 0 && (
        <Box
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          mt={1}
          width="100%"
          maxHeight="150px"
          overflowY="auto"
        >
          <List spacing={1}>
            {filteredOptions.map((option, index) => {
              const displayValue = isObjectArray ? option.label : option;
              return (
                <ListItem
                  key={index}
                  p={2}
                  cursor="pointer"
                  _hover={{ backgroundColor: "gray.100" }}
                  onClick={() => handleOptionClick(option)}
                >
                  {displayValue}
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
      {/* Display selected values */}
      <Box mt={2} width="100%">
        <strong>Selected Values:</strong>
        <pre>{JSON.stringify(selectedValues, null, 2)}</pre>
      </Box>
    </VStack>
  );
};

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  ).isRequired,
  isObjectArray: PropTypes.bool.isRequired, // New flag to differentiate data type
};

export default Autocomplete;
