import React, { useState } from "react";
import {
  Input,
  List,
  ListItem,
  ListIcon,
  Box,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { PropTypes } from "prop-types";

const AutoComplete = ({ options }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = React.useRef();

  // Close dropdown when clicking outside
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const filtered = options.filter((option) =>
        option.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      onOpen();
    } else {
      setFilteredOptions([]);
      onClose();
    }
  };

  const handleOptionClick = (option) => {
    setInputValue(option.name);
    setFilteredOptions([]);
    onClose();
  };

  return (
    <Box ref={ref} position="relative">
      <Input
        placeholder="Type to search..."
        value={inputValue}
        onChange={handleInputChange}
      />
      {isOpen && filteredOptions.length > 0 && (
        <List
          borderWidth="1px"
          borderRadius="md"
          maxHeight="200px"
          overflowY="auto"
          bg="white"
          zIndex={1000}
          position="absolute"
          width="100%"
        >
          {filteredOptions.map((option) => (
            <ListItem
              key={option.id}
              onClick={() => handleOptionClick(option)}
              padding="8px"
              _hover={{ bg: "gray.200", cursor: "pointer" }}
            >
              <ListIcon as={CheckCircleIcon} color="green.500" />
              {option.name}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AutoComplete;
AutoComplete.propTypes = {
  options: PropTypes.object,
};
