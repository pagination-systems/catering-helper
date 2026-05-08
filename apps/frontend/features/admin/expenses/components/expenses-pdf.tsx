import { Document, Font, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import type { Language } from "@/lib/i18n";
import { formatDecimal } from "@/lib/utils";
import { getExpensesContent, interpolate } from "../lib/expenses-i18n";
import type { IExpense } from "../schemas/expense.schema";

type ExpensesPdfProps = {
  entries: IExpense[];
  lang?: Language;
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
  colDate: {
    width: "18%",
    paddingHorizontal: 7,
  },
  colLabel: {
    width: "30%",
    paddingHorizontal: 7,
  },
  colCategory: {
    width: "18%",
    paddingHorizontal: 7,
  },
  colDesc: {
    width: "19%",
    paddingHorizontal: 7,
  },
  colAmount: {
    width: "15%",
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
    width: "85%",
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

const ExpensesPdfDocument = ({ entries, lang = "en" }: { entries: IExpense[]; lang?: Language }) => {
  const i18n = getExpensesContent(lang);
  const total = entries.reduce((s, e) => s + e.amount, 0);

  return (
    <Document title={i18n.pdf.title}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>{companyInfo.name}</Text>
              <Text style={styles.subtitle}>
                {i18n.pdf.phone}: {companyInfo.phone}
              </Text>
            </View>
            <View>
              <Text style={styles.subtitle}>
                {i18n.pdf.totalRecords}: {entries.length}
              </Text>
              <Text style={styles.subtitle}>
                {i18n.pdf.generated}: {moment().format(GENERATED_AT_FORMAT)}
              </Text>
            </View>
          </View>
          <View style={styles.headerDivider} />
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDate]}>{i18n.pdf.date}</Text>
            <Text style={[styles.tableHeaderText, styles.colLabel]}>{i18n.pdf.label}</Text>
            <Text style={[styles.tableHeaderText, styles.colCategory]}>{i18n.pdf.category}</Text>
            <Text style={[styles.tableHeaderText, styles.colDesc]}>{i18n.pdf.description}</Text>
            <Text style={[styles.tableHeaderText, styles.colAmount, styles.textRight]}>{i18n.pdf.amount}</Text>
          </View>

          {entries.map((entry, idx) => (
            <View
              key={entry.id}
              style={idx % 2 === 1 ? [styles.bodyRow, styles.bodyRowAlt] : [styles.bodyRow]}
              wrap={false}
            >
              <View style={styles.colDate}>
                <Text style={styles.tableCellText}>{moment(entry.date).format("DD/MM/YYYY")}</Text>
              </View>
              <View style={styles.colLabel}>
                <Text style={styles.nameText}>{entry.label}</Text>
              </View>
              <View style={styles.colCategory}>
                <Text style={styles.tableCellText}>{entry.category}</Text>
              </View>
              <View style={styles.colDesc}>
                <Text style={styles.tableCellText}>{entry.description ?? "-"}</Text>
              </View>
              <View style={styles.colAmount}>
                <Text style={[styles.tableCellText, styles.textRight]}>{formatDecimal(entry.amount)}</Text>
              </View>
            </View>
          ))}

          <View style={styles.summaryRow} wrap={false}>
            <View style={styles.summaryLabelCell}>
              <Text style={styles.summaryLabelText}>{i18n.pdf.total}</Text>
            </View>
            <View style={styles.colAmount}>
              <Text style={styles.summaryValueText}>{formatDecimal(total)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <View style={styles.footerDivider} />
          <View style={styles.footerRow}>
            <Text
              style={styles.footerText}
              render={({ pageNumber, totalPages }) =>
                interpolate(i18n.pdf.pageOf, { page: String(pageNumber), total: String(totalPages) })
              }
            />
            <Text style={styles.footerText}>{companyInfo.name}</Text>
            <Text style={styles.footerText}>{i18n.pdf.footerModule}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const downloadExpensesPdf = async ({ entries, lang = "en" }: ExpensesPdfProps) => {
  const i18n = getExpensesContent(lang);
  ensurePdfFontRegistered();

  const blob = await pdf(<ExpensesPdfDocument entries={entries} lang={lang} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${i18n.pdf.filePrefix}-${moment().format(TIMESTAMP_FORMAT)}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
};
