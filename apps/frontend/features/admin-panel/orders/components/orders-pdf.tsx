import { Document, Font, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import type { IOrder } from "../schemas/order.schema";

type OrdersPdfProps = {
  orders: IOrder[];
  activeDay: string;
};

type OrdersPdfDocumentProps = {
  orders: IOrder[];
};

type PackageDetailLine = {
  text: string;
  isPackageName: boolean;
};

const bdt = new Intl.NumberFormat("en-BD", {
  style: "decimal",
  maximumFractionDigits: 0,
});

const companyInfo = {
  name: "Catering Helper",
  phone: "+880 1711-000000",
};

const PDF_FONT_FAMILY = "NotoSansBengali";
let isPdfFontRegistered = false;

const ensurePdfFontRegistered = () => {
  if (isPdfFontRegistered) return;

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  Font.register({
    family: PDF_FONT_FAMILY,
    fonts: [
      {
        src: `${baseUrl}/fonts/NotoSansBengali-Regular.ttf`,
        fontWeight: 400,
      },
      {
        src: `${baseUrl}/fonts/NotoSansBengali-Bold.ttf`,
        fontWeight: 700,
      },
    ],
  });

  isPdfFontRegistered = true;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 28,
    paddingHorizontal: 26,
    fontFamily: PDF_FONT_FAMILY,
    fontSize: 10,
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  header: {
    paddingBottom: 12,
    marginBottom: 5,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 10,
    color: "#334155",
  },
  table: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 2,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    minHeight: 30,
    alignItems: "center",
    paddingVertical: 4,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    minHeight: 20,
    paddingVertical: 4,
  },
  bodyRowLast: {
    borderBottomWidth: 0,
  },
  colCustomer: {
    width: "22%",
    paddingHorizontal: 6,
  },
  colAddress: {
    width: "28%",
    paddingHorizontal: 6,
  },
  colMeals: {
    width: "8%",
    paddingHorizontal: 6,
  },
  colItems: {
    width: "24%",
    paddingHorizontal: 6,
  },
  colAmount: {
    width: "9%",
    paddingHorizontal: 6,
  },
  colPaidAmount: {
    width: "9%",
    paddingHorizontal: 6,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: 700,
    color: "#1e293b",
    textTransform: "uppercase",
  },
  tableCellText: {
    fontSize: 9,
    color: "#0f172a",
    lineHeight: 1.3,
  },
  customerNameText: {
    fontWeight: 700,
  },
  customerPhoneText: {
    fontSize: 8.5,
    color: "#475569",
    lineHeight: 1.2,
    marginTop: 2,
  },
  itemLine: {
    fontSize: 8.5,
    color: "#334155",
    lineHeight: 1.25,
  },
  packageNameLine: {
    fontSize: 9,
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.25,
  },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 26,
    right: 26,
    paddingTop: 8,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
  },
  footerCol: {
    width: "50%",
  },
  footerColLeft: {
    textAlign: "left",
  },
  footerColRight: {
    textAlign: "right",
  },
  footerRegularText: {
    fontSize: 9,
    color: "#64748b",
  },
});

const formatItems = (order: IOrder): PackageDetailLine[] => {
  return order.items.flatMap((item) => [
    {
      text: item.packageName,
      isPackageName: true,
    },
    {
      text: `${item.variantName} (${item.quantity})`,
      isPackageName: false,
    },
  ]);
};

const OrdersPdfDocument = ({ orders }: OrdersPdfDocumentProps) => {
  const todayLabel = moment().format("DD MMM YYYY");

  return (
    <Document title={`Orders-${todayLabel}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{companyInfo.name}</Text>
          <Text style={styles.subtitle}>Phone: {companyInfo.phone}</Text>
          <Text style={styles.subtitle}>Date: {todayLabel}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colCustomer]}>Customer</Text>
            <Text style={[styles.tableHeaderText, styles.colAddress]}>Delivery Address</Text>
            <Text style={[styles.tableHeaderText, styles.colItems]}>Package Details</Text>
            <Text style={[styles.tableHeaderText, styles.colMeals]}>Meal</Text>
            <Text style={[styles.tableHeaderText, styles.colAmount]}>Amount</Text>
            <Text style={[styles.tableHeaderText, styles.colPaidAmount]}>Paid</Text>
          </View>

          {orders.map((order, index) => {
            const itemLines = formatItems(order);
            const rowStyle = index === orders.length - 1 ? [styles.headerRow, styles.bodyRowLast] : styles.headerRow;

            return (
              <View key={order.id} style={rowStyle} wrap={false}>
                <View style={styles.colCustomer}>
                  <Text style={[styles.tableCellText, styles.customerNameText]}>{order.customerName}</Text>
                  <Text style={styles.customerPhoneText}>{order.customerPhone}</Text>
                </View>

                <View style={styles.colAddress}>
                  <Text style={styles.tableCellText}>{order.address}</Text>
                </View>

                <View style={styles.colItems}>
                  {itemLines.map((line) => (
                    <Text
                      key={`${order.id}-item-${line.text}`}
                      style={line.isPackageName ? styles.packageNameLine : styles.itemLine}
                    >
                      {line.text}
                    </Text>
                  ))}
                </View>

                <View style={styles.colMeals}>
                  <Text style={styles.tableCellText}>{order.totalMeals}</Text>
                </View>

                <View style={styles.colAmount}>
                  <Text style={styles.tableCellText}>{bdt.format(order.total)}</Text>
                </View>

                <View style={styles.colPaidAmount}>
                  <Text style={styles.tableCellText}> </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.footer} fixed>
          <View style={styles.footerRow}>
            <View style={[styles.footerCol, styles.footerColLeft]}>
              <Text
                style={styles.footerRegularText}
                render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
              />
            </View>

            <View style={[styles.footerCol, styles.footerColRight]}>
              <Text style={styles.footerRegularText}>Generated: {moment().format("DD MMM YYYY, hh:mm A")}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const downloadOrdersPdf = async ({ orders, activeDay }: OrdersPdfProps) => {
  ensurePdfFontRegistered();

  const doc = <OrdersPdfDocument orders={orders} />;
  const blob = await pdf(doc).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileStamp = moment().format("YYYY-MM-DD-HHmm");

  link.href = url;
  link.download = `orders-${activeDay.toLowerCase()}-${fileStamp}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
};
