import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import { FaCalendarAlt, FaPills } from "react-icons/fa";
import { useOutletContext } from "react-router";
import { useParentStore } from "../utils/store";

import _ from "lodash";
import {
  FaChildren,
  FaPrescriptionBottle,
  FaTruckMedical,
} from "react-icons/fa6";
import { GiHypodermicTest, GiTestTubes, GiTwoCoins } from "react-icons/gi";
// import MedicationsTable from "./MedicationsTable";
// import ChildrensTable from "./ChildrensTable";
function ParentDashboard() {
  const data = useOutletContext();
  // console.log("contextual data",data);
  const [date, setDate] = useState(new Date());
  const parent = useParentStore((state) => state.parent);
  const appointments = _.get(parent, "appointments", []);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const counts = {
    appointments: data?.appointments?.length ?? 0,
    children: data?.children?.length ?? 0,
    deliveries: data?.delivery?.length ?? 0,
    medications: data?.medications?.length ?? 0,
    vaccinations: data?.vaccination_records?.length ?? 0,
    payments: data?.payments?.length ?? 0,
    prescriptions: data?.prescriptions?.length ?? 0,
    labtests: data?.lab_tests?.length ?? 0,
  };
  const icons = {
    appointments: FaCalendarAlt,
    children: FaChildren,
    deliveries: FaTruckMedical,
    medications: FaPills,
    vaccinations: GiHypodermicTest,
    payments: GiTwoCoins,
    prescriptions: FaPrescriptionBottle,
    labtests: GiTestTubes,
  };
  return (
    <Flex gap={"20px"} flexDir={"column"}>
      <Box
        bg={
          "linear-gradient(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
        }
        color={"#47556A"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"12px 20px"}
        width={"100%"}
        h={"300px"}
        gap={"30px"}
        borderRadius={".4rem"}
      >
        <Box color={"#fff"} w={{ base: "100%", md: "50%" }}>
          <Text>{date.toLocaleDateString("en-US", options)}</Text>
          <Text fontSize={"22px"} fontWeight={"600"}>
            Welcome Back, {data.name}
          </Text>
          <Text>
            prioritize your childs health with timely and effective
            vaccinations, ensuring they start life strong and healthy. Your
            familys well-being is our top priority.{" "}
            <Text
              as={"i"}
              textTransform={"lowercase"}
              textDecoration={"italics"}
            >
              Safe Pregnancy, Healthy Babies, Caring Hands.
            </Text>
          </Text>

          <Button mt={"20px"} bg={"#fff"} color={"#47556a"}>
            Register new child
          </Button>
        </Box>
        <Flex
          w={"50%"}
          // display={{ base: "none", md: "block" }}
          justifyContent={"flex-end"}
        >
          <Image src="/Pediatrician-cuate.png" width="380px" />
        </Flex>
      </Box>

      <Grid
        templateColumns="repeat(12, 1fr)"
        gap={4}
        p="8px"
        mb="10px"
        color="#47556a"
      >
        <GridItem
          bg={theme.colors.background[colorMode]}
          color={theme.colors.text[colorMode]}
          borderRadius={".4rem"}
          colSpan={{ base: 12, sm: 12, md: 8, lg: 9 }}
        >
          <Heading as={"h3"} size={"lg"} p={"10px"} textAlign={"center"}>
            Overall Statistics
          </Heading>
          <Flex
            gap={8}
            flexWrap="wrap"
            p="20px"
            justifyContent={{ base: "center", xl: "start" }}
            m="auto"
          >
            {Object.keys(counts).map((key, index) => (
              <StatGroup
                key={index}
                borderRadius="md"
                boxShadow="lg"
                minW="250px"
                maxW="350px"
                h="150px"
                p={4}
                textAlign="center"
                bg="linear-gradient(to bottom right, rgba(33,121,243,1) 45%, rgba(65,202,227,1) 100%)"
                color="#fff"
              >
                <Stat>
                  {/* Icon */}
                  {/* Label */}{" "}
                  <StatNumber fontSize="40px">{counts[key]}</StatNumber>
                  <StatLabel textTransform="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </StatLabel>
                  <Icon as={icons[key]} boxSize={8} mb={2} />
                  {/* Count */}
                </Stat>
              </StatGroup>
            ))}
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: 12, sm: 12, md: 4, lg: 3 }}>
          <Box
            bg={theme.colors.background[colorMode]}
            color={theme.colors.text[colorMode]}
            shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
            borderRadius="0.4rem"
            p="8px"
          >
            <Calendar
              onChange={setDate}
              value={date}
              // formatShortWeekday={(locale, date) =>
              //   date.toLocaleDateString(locale, { weekday: "narrow" })
              // }
              nextLabel={null}
              prevLabel={null}
            />

            <Box mt="16px">
              <Text fontSize="18px" fontWeight="bold">
                Upcoming Appointments
              </Text>

              <Stack>
                {appointments.length > 0 ? (
                  appointments.map((data, index) => (
                    <Flex
                      key={index}
                      p="8px"
                      borderBottom="1px solid #d4d4d4"
                      display="flex"
                      justifyContent="space-between"
                      flexWrap={"wrap"}
                    >
                      <Box>
                        <Text>{data.reason}</Text>
                        <Text fontSize="15px" color="gray.500">
                          {data.info.provider_name}
                        </Text>
                      </Box>

                      <Text>{data.appointment_date.split(" ")[0]}</Text>
                    </Flex>
                  ))
                ) : (
                  <Text>No appointments available</Text>
                )}
              </Stack>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default ParentDashboard;
