import { Document, Font, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import { formatDecimal } from "@/lib/utils";
import type { ICustomerLedger } from "../schemas/customer-ledger.schema";

type CustomerLedgerPdfProps = {
  entries: ICustomerLedger[];
};

type CustomerLedgerPdfDocumentProps = {
  entries: ICustomerLedger[];
};

const TIMESTAMP_FORMAT = "YYYY-MM-DD-HHmm";
const GENERATED_AT_FORMAT = "DD MMM YYYY, hh:mm A";

const companyInfo = {
  name: "Catering Helper",
  phone: "+880 1711-000000",
};

const PDF_FONT_FAMILY = "NotoSansBengali";
let isPdfFontRegistered = false;

const ensurePdfFontRegistered = () => {
  if (isPdfFontRegistered) return;

  Font.register({
    family: PDF_FONT_FAMILY,
    fonts: [
      {
        src: "/fonts/NotoSansBengali-Regular.ttf",
        fontWeight: 400,
      },
      {
        src: "/fonts/NotoSansBengali-Bold.ttf",
        fontWeight: 700,
      },
    ],
  });

  isPdfFontRegistered = true;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 48,
    paddingHorizontal: 26,
    fontFamily: PDF_FONT_FAMILY,
    fontSize: 10,
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 14,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 9.5,
    color: "#475569",
  },
  headerDivider: {
    borderBottomWidth: 2,
    borderBottomColor: "#0f172a",
  },
  table: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 3,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#334155",
    minHeight: 28,
    alignItems: "center",
    paddingVertical: 5,
  },
  bodyRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    minHeight: 22,
    paddingVertical: 5,
    backgroundColor: "#ffffff",
  },
  bodyRowAlt: {
    backgroundColor: "#f8fafc",
  },
  summaryRow: {
    flexDirection: "row",
    borderTopColor: "#e2e8f0",
    minHeight: 26,
    paddingVertical: 5,
  },
  colName: {
    width: "30%",
    paddingHorizontal: 7,
  },
  colPhone: {
    width: "20%",
    paddingHorizontal: 7,
  },
  colAmount: {
    width: "17%",
    paddingHorizontal: 6,
  },
  colPaid: {
    width: "17%",
    paddingHorizontal: 6,
  },
  colDue: {
    width: "16%",
    paddingHorizontal: 6,
  },
  tableHeaderText: {
    fontSize: 8.5,
    fontWeight: 700,
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  textRight: {
    textAlign: "right",
  },
  tableCellText: {
    fontSize: 9,
    color: "#0f172a",
    lineHeight: 1.35,
  },
  nameText: {
    fontWeight: 700,
    fontSize: 9,
    color: "#0f172a",
  },
  summaryLabelCell: {
    width: "50%",
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  summaryLabelText: {
    fontSize: 9,
    fontWeight: 700,
    color: "#0f172a",
    textAlign: "right",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryValueText: {
    fontSize: 9,
    fontWeight: 700,
    color: "#0f172a",
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 16,
    left: 26,
    right: 26,
  },
  footerDivider: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    marginBottom: 5,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8.5,
    color: "#64748b",
  },
});

const CustomerLedgerPdfDocument = ({ entries }: CustomerLedgerPdfDocumentProps) => {
  const totalAmount = entries.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalPaid = entries.reduce((sum, item) => sum + item.totalPaidAmount, 0);
  const totalDue = entries.reduce((sum, item) => sum + item.dueAmount, 0);

  return (
    <Document title="Customer-Ledger">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>{companyInfo.name}</Text>
              <Text style={styles.subtitle}>Phone: {companyInfo.phone}</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Total Customers: {entries.length}</Text>
              <Text style={styles.subtitle}>Generated: {moment().format(GENERATED_AT_FORMAT)}</Text>
            </View>
          </View>
          <View style={styles.headerDivider} />
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colName]}>Customer</Text>
            <Text style={[styles.tableHeaderText, styles.colPhone]}>Phone Number</Text>
            <Text style={[styles.tableHeaderText, styles.colAmount, styles.textRight]}>Total Amount</Text>
            <Text style={[styles.tableHeaderText, styles.colPaid, styles.textRight]}>Paid Amount</Text>
            <Text style={[styles.tableHeaderText, styles.colDue, styles.textRight]}>Due Amount</Text>
          </View>

          {entries.map((entry, index) => (
            <View
              key={entry.id}
              style={index % 2 === 1 ? [styles.bodyRow, styles.bodyRowAlt] : [styles.bodyRow]}
              wrap={false}
            >
              <View style={styles.colName}>
                <Text style={styles.nameText}>{entry.customerName}</Text>
              </View>
              <View style={styles.colPhone}>
                <Text style={styles.tableCellText}>{entry.customerPhone}</Text>
              </View>
              <View style={styles.colAmount}>
                <Text style={[styles.tableCellText, styles.textRight]}>{formatDecimal(entry.totalAmount)}</Text>
              </View>
              <View style={styles.colPaid}>
                <Text style={[styles.tableCellText, styles.textRight]}>{formatDecimal(entry.totalPaidAmount)}</Text>
              </View>
              <View style={styles.colDue}>
                <Text style={[styles.tableCellText, styles.textRight]}>{formatDecimal(entry.dueAmount)}</Text>
              </View>
            </View>
          ))}

          <View style={styles.summaryRow} wrap={false}>
            <View style={styles.summaryLabelCell}>
              <Text style={styles.summaryLabelText}>Totals</Text>
            </View>
            <View style={styles.colAmount}>
              <Text style={styles.summaryValueText}>{formatDecimal(totalAmount)}</Text>
            </View>
            <View style={styles.colPaid}>
              <Text style={styles.summaryValueText}>{formatDecimal(totalPaid)}</Text>
            </View>
            <View style={styles.colDue}>
              <Text style={styles.summaryValueText}>{formatDecimal(totalDue)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <View style={styles.footerDivider} />
          <View style={styles.footerRow}>
            <Text
              style={styles.footerText}
              render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
            />
            <Text style={styles.footerText}>{companyInfo.name}</Text>
            <Text style={styles.footerText}>Customer Ledger</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const downloadCustomerLedgerPdf = async ({ entries }: CustomerLedgerPdfProps) => {
  ensurePdfFontRegistered();

  const blob = await pdf(<CustomerLedgerPdfDocument entries={entries} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `customer-ledger-${moment().format(TIMESTAMP_FORMAT)}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
};
