import { Button } from "@chakra-ui/react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";

// Styles for PDF with table layout
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "16.66%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#e4e4e4",
    padding: 5,
  },
  tableCol: {
    width: "16.66%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
  },
  tableCell: { fontSize: 10 },
});

// PDF Document Component with Table Layout
const VaccineReport = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Vaccination Report</Text>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Composition</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Indication</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Information</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Schedule</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Side Effects</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Timestamp</Text>
          </View>
        </View>

        {/* Table Rows */}
        {data.map((vaccine) => (
          <View key={vaccine.vaccine_id} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{vaccine.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{vaccine.composition}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{vaccine.indication}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{vaccine.info}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {vaccine.schedule.join(", ")}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {vaccine.side_effects.join(", ")}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{vaccine.timestamp}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
VaccineReport.propTypes = {
  data: PropTypes.array,
};

// Main Report Generator Component
const VaccinesReport = ({ data }) => (
  <Button>
    <PDFDownloadLink
      document={<VaccineReport data={data} />}
      fileName="vaccine_report_table.pdf"
    >
      {({ loading }) =>
        loading ? "Loading document..." : "Download Vaccine Report"
      }
    </PDFDownloadLink>
  </Button>
);

export default VaccinesReport;
VaccinesReport.propTypes = {
  data: PropTypes.array,
};
