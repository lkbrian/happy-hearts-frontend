import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import { useOutletContext } from "react-router";
import { useParentStore } from "../utils/store";
import _ from "lodash";
import MedicationsTable from "./MedicationsTable";
import ChildrensTable from "./ChildrensTable";
function ParentDashboard() {
  const data = useOutletContext();
  console.log(data);
  const [date, setDate] = useState(new Date());
  const parent = useParentStore((state) => state.parent);
  const appointments = _.get(parent, "appointments", []);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const theme = useTheme()
  const{colorMode} = useColorMode()
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
        <GridItem colSpan={{ base: 12, sm: 12, md: 8, lg: 9 }}>
          <Flex
            gap={"10px"}
            flexDir={"column"}
            p="10px"
            borderRadius="0.4rem"
            w="100%"
          >
            <MedicationsTable />
            <ChildrensTable />
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
                    <GridItem
                      key={index}
                      p="8px"
                      borderBottom="1px solid #d4d4d4"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Text>{data.reason}</Text>
                        <Text fontSize="15px" color="gray.500">
                          {data.info.provider_name}
                        </Text>
                      </Box>

                      <Text>{data.appointment_date.split(" ")[0]}</Text>
                    </GridItem>
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
