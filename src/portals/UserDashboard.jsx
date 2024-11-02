// import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaHistory,
  FaPills,
  FaPrescriptionBottle,
} from "react-icons/fa";
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
  FaTruckMedical,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { GiHypodermicTest, GiTwoCoins } from "react-icons/gi";
// import AppointmentsChart from "../Charts/AppointmentsChart";
import { useOutletContext } from "react-router";
import AdmissionsChart from "../Charts/AdmissionsChart";
import DonutChart from "../Charts/DonutChart";
import Users from "../Tables/Users";
import { MdMedication } from "react-icons/md";

function UserDashboard() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const data = useOutletContext();

  // const [dashData, setDashData] = useState(null);
  const [isMore, setIsMore] = useState(false);
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
    <Box
      bg={theme.colors.background[colorMode]}
      color={theme.colors.text[colorMode]}
      p={"10px"}
    >
      {" "}
      <Flex
        gap={8}
        flexWrap="wrap"
        justifyContent={{ base: "center", xl: "start" }}
      >
        {(isMore ? Object.keys(data) : Object.keys(data).slice(0, 5)).map(
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
              <StatNumber fontSize="40px">{data[key]?.length ?? 0}</StatNumber>
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
      >
        {isMore ? "See less" : "See more"}
      </Text>
      <Box py={"20px"}>
        <Flex flexDir={{ base: "column", lg: "row" }}>
          {/* <AppointmentsChart data={data.appointments} /> */}
          <DonutChart data={data.appointments} />
          <AdmissionsChart data={data.admissions} />
        </Flex>
      </Box>
      <Box p={"10px"}>
        <Heading size={"md"}> Users Table</Heading>
        <Users />
      </Box>
    </Box>
  );
}

export default UserDashboard;
