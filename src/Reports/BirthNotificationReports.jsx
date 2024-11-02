/* eslint-disable react/no-unescaped-entities */
import { Button } from "@chakra-ui/react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";
import TimesNewRoman from "../Fonts/times new roman.ttf"; // Path to your font file

// Register the font
Font.register({
  family: "Times New Roman",
  src: TimesNewRoman,
});

// Styles for PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 12, marginBottom: 3, fontFamily: "Times New Roman" },
  header: {
    fontFamily: "Times New Roman",
    textAlign: "center",
    textDecoration: "underline",
    textDecorationStyle: "dotted",
    textUnderlineOffset: "12px",
    paddingVertical: "10px",
  },
  acknowledgment: {
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: "20px",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  infoSection: { marginBottom: 5 },
});

// PDF Document Component
const BirthReport = ({ data }) => (
  <Document>
    {data.map((entry, index) => (
      <Page style={styles.page} key={index}>
        {/* Header */}
        <Text style={styles.header}>REPUBLIC OF KENYA</Text>
        <Text style={styles.header}>
          THE BIRTHS AND DEATHS REGISTRATION ACT{" "}
          <Text style={{ fontStyle: "italic" }}>(Cap 149)</Text>
        </Text>
        <Text style={styles.header}>
          ACKNOWLEDGEMENT OF BIRTH NOTIFICATION (FOR PARENTS)
        </Text>

        {/* Serial Number and Form Number */}
        <View style={styles.footer}>
          <Text>Serial No. {entry.serial_number}</Text>
          <Text>Form B1</Text>
        </View>

        {/* Child Information */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Child Name:</Text>{" "}
              {entry.baby_name}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Date of Birth:</Text>{" "}
              {entry.date_of_birth}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Gender:</Text> {entry.gender}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Type of Birth:</Text>{" "}
              {entry.type_of_birth}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Fate:</Text> {entry.fate}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Place of Birth:</Text>{" "}
              {entry.place_of_birth}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Sub-County:</Text>{" "}
              {entry.subCounty}
            </Text>
          </View>
        </View>

        {/* Parents Information */}
        <View style={styles.section}>
          <Text style={styles.title}>Parent Details</Text>
          <View style={styles.infoSection}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Mother's Full Name:</Text>{" "}
              {entry.mother_full_name}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Mother's National ID:</Text>{" "}
              {entry.mother_national_id}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Father's Full Name:</Text>{" "}
              {entry.father_full_name}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Father's National ID:</Text>{" "}
              {entry.father_national_id}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Date of Notification:</Text>{" "}
              {entry.date_of_notification}
            </Text>
          </View>
        </View>

        {/* Note */}
        <Text style={styles.text}>
          Note that to obtain a Birth certificate, this information will be
          passed to the Sub-County Registrar of Births, where this birth
          occurred.
        </Text>
      </Page>
    ))}
  </Document>
);

BirthReport.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Main Report Generator Component
const BirthNotificationReports = ({ data }) => (
  <Button>
    <PDFDownloadLink
      document={<BirthReport data={data} />}
      fileName="birth_notifications.pdf"
    >
      {({ loading }) =>
        loading ? "Loading document..." : "Download Birth Report"
      }
    </PDFDownloadLink>
  </Button>
);

export default BirthNotificationReports;

BirthNotificationReports.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
