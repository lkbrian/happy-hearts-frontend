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
  StatLabel,
  StatNumber,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import { FaCalendarAlt, FaFileAlt, FaHistory, FaPills } from "react-icons/fa";
import { useOutletContext } from "react-router";
import {
  FaBabyCarriage,
  FaBed,
  FaCapsules,
  FaChild,
  FaChildren,
  FaClipboardCheck,
  FaClipboardList,
  FaFileMedical,
  FaFlask,
  FaHospitalUser,
  FaHouseMedical,
  FaPrescriptionBottle,
  FaTruckMedical,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { GiHypodermicTest, GiTwoCoins } from "react-icons/gi";
import { useProviderStore } from "../utils/store";
import { useEffect } from "react";
import { MdMedication } from "react-icons/md";
function ProviderDashboard() {
  const data = useOutletContext();
  const [isMore, setIsMore] = useState(false);

  const { provider, fetchProvider } = useProviderStore((state) => ({
    provider: state.provider,
    fetchProvider: state.fetchProvider,
  }));
  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchProvider(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [date, setDate] = useState(new Date());
  const appointments = data.appointments.slice(-2);
  console.log(data);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const icons = {
    providers: FaUsers, // Example: replace with the actual icon you want for providers
    users: FaUser,
    vaccines: GiHypodermicTest,
    discharge_medications: FaPills,
    parents_medical_info: FaFileMedical,
    payments: GiTwoCoins,
    present_pregnancies: FaBabyCarriage,
    previous_pregnancies: FaHistory,
    vacination_records: FaClipboardCheck,
    medicines: FaCapsules,
    medications: MdMedication,
    prescriptions: FaPrescriptionBottle,
    parents: FaChild,
    documents: FaFileAlt,
    children: FaChildren,
    FaChildren,
    lab_tests: FaFlask,
    appointments: FaCalendarAlt,
    deliveries: FaTruckMedical,
    discharge_summaries: FaClipboardList,
    rooms: FaHouseMedical,
    admissions: FaHospitalUser,
    beds: FaBed,
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
            Welcome Back, {provider?.name}
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
            Create Appointment
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
            {(isMore ? Object.keys(data) : Object.keys(data).slice(0, 8)).map(
              (key) => (
                <Stat
                  key={key}
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
                  <StatNumber fontSize="40px">
                    {data[key]?.length ?? 0}
                  </StatNumber>
                  <StatLabel textTransform="capitalize">
                    {key.replace(/_/g, " ")}
                  </StatLabel>
                  <Icon as={icons[key]} boxSize={8} mb={2} />
                </Stat>
              )
            )}
          </Flex>
          <Text
            bgGradient="linear(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
            bgClip="text"
            cursor={"pointer"}
            onClick={() => setIsMore(!isMore)}
            p={4}
            align={"bottom"}
            w={"100%"}
          >
            {isMore ? "See less" : "See more"}
          </Text>
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

              {appointments && appointments.length > 0 ? (
                <Stack>
                  {appointments.map((data, index) => (
                    <Flex
                      key={index}
                      p="8px"
                      borderBottom="1px solid #d4d4d4"
                      display="flex"
                      justifyContent="space-between"
                      flexWrap="wrap"
                    >
                      <Box>
                        <Text>{data.reason}</Text>
                        <Text fontSize="15px" color="gray.500">
                          {data.parent.name}
                        </Text>
                        <Text
                          fontSize="15px"
                          color={
                            data.status === "pending"
                              ? "#F9B264"
                              : data.status === "approved"
                              ? "#3fc49e"
                              : data.status === "visited"
                              ? "#228B22"
                              : data.status === "rejected"
                              ? "crimson"
                              : data.status === "awaiting_approval"
                              ? "#2179F3"
                              : data.status === "missed"
                              ? "crimson"
                              : "gray.500" // default color if none of the statuses match
                          }
                        >
                          {data.status}
                        </Text>
                      </Box>

                      <Text>
                        {new Date(data.appointment_date).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }
                        )}
                      </Text>
                    </Flex>
                  ))}
                </Stack>
              ) : (
                <Text>No appointments available</Text>
              )}
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default ProviderDashboard;
