import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import Rooms from "./Rooms/Rooms";
import Beds from "./Beds/Beds";

function Facilities() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Tabs
      bg={theme.colors.background[colorMode]}
      p={"10px"}
      borderRadius={".4rem"}
      h={"auto"}
    >
      <TabList borderBottomWidth="0" spacing={"20px"}>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
          minW={"200px"}
        >
          Rooms
        </Tab>
        <Tab
          _selected={{ bg: "#2179f3", color: "white" }}
          borderRadius={".4rem"}
          minW={"200px"}
        >
          Beds
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Rooms />
        </TabPanel>
        <TabPanel>
          <Beds />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Facilities;
