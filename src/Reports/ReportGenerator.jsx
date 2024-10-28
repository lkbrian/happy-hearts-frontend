import { Button } from "@chakra-ui/react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { PropTypes } from "prop-types";
// Styles for PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 12, marginBottom: 3 },
});

// PDF Document Component
const VaccineReport = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Vaccination Report</Text>
      {data.map((vaccine) => (
        <View key={vaccine.vaccine_id} style={styles.section}>
          <Text style={styles.subtitle}>{vaccine.name}</Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Composition:</Text>{" "}
            {vaccine.composition}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Indication:</Text>{" "}
            {vaccine.indication}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Information:</Text>{" "}
            {vaccine.info}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Schedule:</Text>{" "}
            {vaccine.schedule.join(", ")}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Side Effects:</Text>{" "}
            {vaccine.side_effects.join(", ")}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Timestamp:</Text>{" "}
            {vaccine.timestamp}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);
VaccineReport.propTypes = {
  data: PropTypes.array,
};

// Main Report Generator Component
const ReportGenerator = ({ data }) => (
  <Button>
    <PDFDownloadLink
      document={<VaccineReport data={data} />}
      fileName="vaccine_report.pdf"
    >
      {({ loading }) =>
        loading ? "Loading document..." : "Download Vaccine Report"
      }
    </PDFDownloadLink>
  </Button>
);

export default ReportGenerator;
ReportGenerator.propTypes = {
  data: PropTypes.array,
};
