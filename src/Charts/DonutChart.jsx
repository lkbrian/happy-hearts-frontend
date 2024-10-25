import { Box, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = [
  "#FF0000",
  "#FFA500",
  "#2179f3",
  "#902923",
  "#008000",
  "#3fc49e",
];

function DonutChart({ data }) {
  const transformedData = transformDataForDonut(data);

  return (
    <Box w={{ base: "100%", lg: "45%" }}>
      <Heading size={"md"} textAlign={"center"}>
        Appointments Charts
      </Heading>

      <ResponsiveContainer width="100%" height={450}>
        <PieChart>
          <Pie
            data={transformedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={160}
            innerRadius={80}
            paddingAngle={2}
            textAnchor="'center"
            dominantBaseline="central"
            label={(entry) => `${entry.name}: ${entry.value}`} // Custom label rendering
          >
            {transformedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

DonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      appointment_date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Function to transform data for the Donut chart
function transformDataForDonut(appointments) {
  const statusCounts = {
    missed: 0,
    pending: 0,
    awaiting_approval: 0,
    rejected: 0,
    visited: 0,
    approved: 0,
  };

  appointments.forEach(({ status }) => {
    if (status === "missed") statusCounts.missed += 1;
    else if (status === "pending") statusCounts.pending += 1;
    else if (status === "awaiting_approval")
      statusCounts.awaiting_approval += 1;
    else if (status === "rejected") statusCounts.rejected += 1;
    else if (status === "visited") statusCounts.visited += 1;
    else if (status === "approved") statusCounts.approved += 1;
  });

  return [
    { name: "Missed", value: statusCounts.missed },
    { name: "Pending", value: statusCounts.pending },
    { name: "Awaiting Approval", value: statusCounts.awaiting_approval },
    { name: "Rejected", value: statusCounts.rejected },
    { name: "Visited", value: statusCounts.visited },
    { name: "Approved", value: statusCounts.approved },
  ];
}

export default DonutChart;
