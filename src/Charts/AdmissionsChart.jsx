import { Box, Heading } from "@chakra-ui/react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample colors for the chart
const COLORS = ["#2179f3", "#41cae3"];

function AdmissionsChart({ data }) {
  const transformedData = transformAdmissionsData(data);

  return (
    <Box w={{ base: "100%", lg: "45%" }}>
      <Heading size={"md"} textAlign={"center"}>
        Admissions Charts
      </Heading>
      <ResponsiveContainer width="100%" height={450}>
        <ComposedChart
          width={800}
          height={400}
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis axisLine={false} dataKey="day" />
          <YAxis axisLine={false} />
          <Tooltip />
          <Legend />

          {/* Bar Chart for Total Beds */}
          <Bar dataKey="total_beds" fill={COLORS[0]} name="Beds" barSize={50} />
          {/* Bar Chart for Total Rooms */}
          <Bar
            dataKey="total_rooms"
            fill={COLORS[1]}
            name="Rooms"
            barSize={50}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

AdmissionsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      admission_date: PropTypes.string.isRequired,
      room: PropTypes.shape({
        room_number: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

// Function to transform admission data to a more chart-friendly format
function transformAdmissionsData(admissions) {
  const groupedData = {
    Mon: { total_beds: 0, total_rooms: 0 },
    Tue: { total_beds: 0, total_rooms: 0 },
    Wed: { total_beds: 0, total_rooms: 0 },
    Thu: { total_beds: 0, total_rooms: 0 },
    Fri: { total_beds: 0, total_rooms: 0 },
    Sat: { total_beds: 0, total_rooms: 0 },
    Sun: { total_beds: 0, total_rooms: 0 },
  };

  // Count admissions by day of the week
  admissions.forEach((admission) => {
    const admissionDate = new Date(admission.admission_date);
    const day = format(admissionDate, "eee"); // Get short day name (e.g., Mon, Tue)

    // Increment counts
    groupedData[day].total_beds += 1; // Assuming each admission represents a bed being used
    groupedData[day].total_rooms += 1; // Assuming each admission corresponds to a room
  });

  // Convert the grouped object into an array
  const transformedData = Object.keys(groupedData).map((day) => ({
    day,
    total_beds: groupedData[day].total_beds,
    total_rooms: groupedData[day].total_rooms,
  }));

  return transformedData;
}

export default AdmissionsChart;
