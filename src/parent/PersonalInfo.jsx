import {  Box, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode, useTheme } from "@chakra-ui/react"

function PersonalInfo() {
    const theme = useTheme();
    const { colorMode } = useColorMode();

  return (
    <Tabs bg={theme.colors.background[colorMode]} p={'10px'} borderRadius={'.4rem'} h={'auto'}>
      <TabList borderBottomWidth="0" gap={"20px"}>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Personal Information
        </Tab>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Terms & Condition
        </Tab>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Privacy Policy
        </Tab>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
        >
          Settings
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Box>Provident, minus blanditiis.
          </Box>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default PersonalInfo