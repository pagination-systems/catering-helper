import { Document, Font, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import { formatDecimal } from "@/lib/utils";
import type { IOrder } from "../schemas/order.schema";

type OrdersPdfProps = {
  orders: IOrder[];
  activeDay: string;
  i18n?: Record<string, any>;
};

type OrdersPdfDocumentProps = {
  orders: IOrder[];
  i18n?: Record<string, any>;
};

type PackageDetailLine = {
  key: string;
  text: string;
  isPackageName: boolean;
};

const DATE_FORMAT = "DD MMM YYYY";
const TIMESTAMP_FORMAT = "YYYY-MM-DD-HHmm";
const GENERATED_AT_FORMAT = "DD MMM YYYY, hh:mm A";

const formatCurrency = (amount: number) => formatDecimal(amount);

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

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    marginBottom: 14,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "column",
    gap: 2,
  },
  headerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  brandTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#0f172a",
    textAlign: "right",
  },
  subtitle: {
    fontSize: 9.5,
    color: "#475569",
  },
  headerDivider: {
    borderBottomWidth: 2,
    borderBottomColor: "#0f172a",
    marginBottom: 0,
  },

  // ── Table ─────────────────────────────────────────────────────────────────
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
  bodyRowLast: {
    borderBottomWidth: 0,
  },

  // ── Summary row ───────────────────────────────────────────────────────────
  summaryRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    minHeight: 26,
    paddingVertical: 5,
  },
  summaryLabelCell: {
    width: "74%",
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
  },
  summaryEmptyText: {
    fontSize: 9,
    color: "#94a3b8",
  },

  // ── Columns ───────────────────────────────────────────────────────────────
  colCustomer: {
    width: "22%",
    paddingHorizontal: 7,
  },
  colAddress: {
    width: "28%",
    paddingHorizontal: 7,
  },
  colItems: {
    width: "24%",
    paddingHorizontal: 7,
  },
  colMeals: {
    width: "8%",
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

  // ── Header cell text ──────────────────────────────────────────────────────
  tableHeaderText: {
    fontSize: 8.5,
    fontWeight: 700,
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },

  // ── Body cell text ────────────────────────────────────────────────────────
  tableCellText: {
    fontSize: 9,
    color: "#0f172a",
    lineHeight: 1.35,
  },
  customerNameText: {
    fontWeight: 700,
    fontSize: 9,
    color: "#0f172a",
  },
  customerPhoneText: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 1,
  },
  itemLine: {
    fontSize: 8.5,
    color: "#475569",
    lineHeight: 1.3,
  },
  packageNameLine: {
    fontSize: 9,
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.3,
  },
  amountText: {
    fontSize: 9,
    color: "#0f172a",
    textAlign: "right",
  },
  mealsText: {
    fontSize: 9,
    color: "#0f172a",
    textAlign: "center",
  },

  // ── Footer ────────────────────────────────────────────────────────────────
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
  footerBrand: {
    fontSize: 8.5,
    color: "#94a3b8",
    fontWeight: 500,
  },
});

const formatItems = (order: IOrder): PackageDetailLine[] => {
  return order.items.flatMap((item) => [
    { key: `${item.id}-package`, text: item.packageName, isPackageName: true },
    { key: `${item.id}-variant`, text: `${item.variantName} (${item.quantity})`, isPackageName: false },
  ]);
};

const OrdersPdfDocument = ({ orders, i18n }: OrdersPdfDocumentProps) => {
  const todayLabel = moment().format(DATE_FORMAT);

  const totalMeals = orders.reduce((sum, o) => sum + o.totalMeals, 0);
  const totalAmount = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <Document title={`Orders-${todayLabel}`}>
      <Page size="A4" style={styles.page}>
        {/* ── Page Header ── */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              {/* Order Report Indicator */}
              <Text style={styles.title}>{i18n?.pdf?.title || "Order Report"}</Text>
              <Text style={styles.subtitle}>
                {i18n?.pdf?.date || "Date"}: {todayLabel}
              </Text>
            </View>
            <View style={styles.headerRight}>
              {/* SaaS Branding */}
              <Text style={styles.brandTitle}>{companyInfo.name}</Text>
              <Text style={styles.subtitle}>Phone: {companyInfo.phone}</Text>
              <Text style={styles.subtitle}>
                {i18n?.pdf?.totalOrders || "Total Orders"}: {orders.length}
              </Text>
            </View>
          </View>
          <View style={styles.headerDivider} />
        </View>

        {/* ── Table ── */}
        <View style={styles.table}>
          {/* Table header row */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colCustomer]}>{i18n?.pdf?.customer || "Customer"}</Text>
            <Text style={[styles.tableHeaderText, styles.colAddress]}>
              {i18n?.pdf?.deliveryAddress || "Delivery Address"}
            </Text>
            <Text style={[styles.tableHeaderText, styles.colItems]}>
              {i18n?.pdf?.packageDetails || "Package Details"}
            </Text>
            <Text style={[styles.tableHeaderText, styles.colMeals, styles.textCenter]}>
              {i18n?.pdf?.meal || "Meal"}
            </Text>
            <Text style={[styles.tableHeaderText, styles.colAmount, styles.textRight]}>
              {i18n?.pdf?.amount || "Amount"}
            </Text>
            <Text style={[styles.tableHeaderText, styles.colPaidAmount, styles.textRight]}>
              {i18n?.pdf?.paid || "Paid"}
            </Text>
          </View>

          {/* Body rows */}
          {orders.map((order, index) => {
            const itemLines = formatItems(order);
            const isLast = index === orders.length - 1;
            const isAlt = index % 2 === 1;
            const rowStyle: Array<typeof styles.bodyRow | typeof styles.bodyRowAlt | typeof styles.bodyRowLast> = [
              styles.bodyRow,
            ];

            if (isAlt) rowStyle.push(styles.bodyRowAlt);
            if (isLast) rowStyle.push(styles.bodyRowLast);

            return (
              <View key={order.id} style={rowStyle} wrap={false}>
                <View style={styles.colCustomer}>
                  <Text style={styles.customerNameText}>{order.customerName}</Text>
                  <Text style={styles.customerPhoneText}>{order.customerPhone}</Text>
                </View>

                <View style={styles.colAddress}>
                  <Text style={styles.tableCellText}>{order.deliveryAddress}</Text>
                </View>

                <View style={styles.colItems}>
                  {itemLines.map((line) => (
                    <Text key={line.key} style={line.isPackageName ? styles.packageNameLine : styles.itemLine}>
                      {line.text}
                    </Text>
                  ))}
                </View>

                <View style={styles.colMeals}>
                  <Text style={styles.mealsText}>{order.totalMeals}</Text>
                </View>

                <View style={styles.colAmount}>
                  <Text style={styles.amountText}>{formatCurrency(order.total)}</Text>
                </View>

                <View style={styles.colPaidAmount}>{/* blank — to be filled manually */}</View>
              </View>
            );
          })}

          {/* ── Summary / Totals row (rendered after last data row) ── */}
          <View style={styles.summaryRow} wrap={false}>
            <View style={styles.summaryLabelCell}>
              <Text style={styles.summaryLabelText}>{i18n?.pdf?.total || "Total"}</Text>
            </View>

            <View style={styles.colMeals}>
              <Text style={[styles.summaryValueText, styles.textCenter]}>{totalMeals}</Text>
            </View>

            <View style={styles.colAmount}>
              <Text style={[styles.summaryValueText, styles.textRight]}>{formatCurrency(totalAmount)}</Text>
            </View>

            <View style={styles.colPaidAmount}>{/* blank paid total — to be filled manually */}</View>
          </View>
        </View>

        {/* ── Footer (fixed — no top border on the View itself) ── */}
        <View style={styles.footer} fixed>
          <View style={styles.footerDivider} />
          <View style={styles.footerRow}>
            <Text
              style={styles.footerText}
              render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
            />
            {/* Added Footer Branding */}
            <Text style={styles.footerBrand}>Powered by {companyInfo.name}</Text>
            <Text style={styles.footerText}>{`${i18n?.pdf?.generated}: ${moment().format(GENERATED_AT_FORMAT)}`}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const downloadOrdersPdf = async ({ orders, activeDay, i18n }: OrdersPdfProps) => {
  ensurePdfFontRegistered();

  const doc = <OrdersPdfDocument orders={orders} i18n={i18n} />;
  const blob = await pdf(doc).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileStamp = moment().format(TIMESTAMP_FORMAT);

  link.href = url;
  link.download = `orders-${activeDay.toLowerCase()}-${fileStamp}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
};
