import PropTypes from "prop-types";
import {
  AreaChart,
  Bar,
  CartesianGrid,
  Legend,
  // CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function AppointmentsChart({ data }) {
  // Ensure the transformed data is used
  const transformedData = transformData(data);

  return (
    // <ResponsiveContainer>
    <AreaChart
      width={800}
      height={400}
      data={transformedData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis domain={[0, "dataMax + 5"]} ticks={[0, 5, 10, 15, 20, 25, 30]} />
      <Tooltip />
      <Legend />
      {/* Add bars for each appointment status */}
      <Bar dataKey="missed" fill="#FF0000" name="Missed" width={70} />
      <Bar dataKey="pending" fill="#FFA500" name="Pending" />
      <Bar
        dataKey="awaiting_approval"
        fill="#2179f3"
        name="Awaiting Approval"
      />
      <Bar dataKey="rejected" fill="#902923" name="Rejected" />
      <Bar dataKey="visited" fill="#008000" name="Visited" />
    </AreaChart>
    // </ResponsiveContainer>
  );
}

AppointmentsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      appointment_date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Function to transform data to group by month
function transformData(appointments) {
  const groupedData = Array(12)
    .fill(null)
    .map((_, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "short" }),
      missed: 0,
      pending: 0,
      awaiting_approval: 0,
      rejected: 0,
      visited: 0,
    }));

  appointments.forEach(({ appointment_date, status }) => {
    const monthIndex = new Date(appointment_date).getMonth(); // Get month index (0-11)

    // Increment the count for the status of the current appointment
    if (status === "missed") groupedData[monthIndex].missed += 1;
    else if (status === "pending") groupedData[monthIndex].pending += 1;
    else if (status === "awaiting_approval")
      groupedData[monthIndex].awaiting_approval += 1;
    else if (status === "rejected") groupedData[monthIndex].rejected += 1;
    else if (status === "visited") groupedData[monthIndex].visited += 1;
  });

  return groupedData;
}

export default AppointmentsChart;
