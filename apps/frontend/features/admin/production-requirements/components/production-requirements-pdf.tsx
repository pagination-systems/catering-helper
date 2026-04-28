import { Document, Font, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import { formatDecimal } from "@/lib/utils";
import type { ProductionRequirementsData } from "../schemas/production.schema";

type ProductionRequirementsPdfProps = {
  data: ProductionRequirementsData;
};

type ProductionRequirementsPdfDocumentProps = {
  data: ProductionRequirementsData;
};

const DATE_FORMAT = "DD MMM YYYY";
const TIMESTAMP_FORMAT = "YYYY-MM-DD-HHmm";
const GENERATED_AT_FORMAT = "DD MMM YYYY, hh:mm A";

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
    marginBottom: 10,
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
    marginTop: 2,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  summaryCard: {
    flexGrow: 1,
    flexBasis: 0,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 4,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 8.5,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  summaryValue: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: 700,
    color: "#0f172a",
  },
  packageSection: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },
  packageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: "#f8fafc",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  packageName: {
    fontSize: 11.5,
    fontWeight: 700,
    color: "#0f172a",
  },
  packageMeta: {
    fontSize: 8.5,
    color: "#64748b",
    marginTop: 1,
  },
  packageTotal: {
    fontSize: 11,
    fontWeight: 700,
    color: "#0f172a",
  },
  packageTotalLabel: {
    fontSize: 8,
    color: "#64748b",
    textAlign: "right",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e2e8f0",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    minHeight: 26,
    alignItems: "center",
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#edf2f7",
    minHeight: 24,
    paddingVertical: 6,
    backgroundColor: "#ffffff",
  },
  rowAlt: {
    backgroundColor: "#f8fafc",
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  colVariant: {
    width: "31%",
    paddingHorizontal: 10,
  },
  colItems: {
    width: "59%",
    paddingHorizontal: 10,
  },
  colMeals: {
    width: "10%",
    paddingHorizontal: 10,
  },
  tableHeaderText: {
    fontSize: 8.5,
    fontWeight: 700,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  variantText: {
    fontSize: 9,
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.35,
  },
  itemsText: {
    fontSize: 8.5,
    color: "#475569",
    lineHeight: 1.35,
  },
  mealsWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  mealsBadge: {
    minWidth: 34,
    borderRadius: 999,
    backgroundColor: "#0f172a",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  mealsBadgeText: {
    fontSize: 9,
    fontWeight: 700,
    color: "#ffffff",
    textAlign: "center",
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

const formatItems = (items: string[]) => (items.length ? items.join(" · ") : "No items listed");

const ProductionRequirementsPdfDocument = ({ data }: ProductionRequirementsPdfDocumentProps) => {
  const todayLabel = moment(data.date).format(DATE_FORMAT);
  const packageCount = data.packages.length;
  const variantCount = data.packages.reduce((sum, pkg) => sum + pkg.variants.length, 0);

  return (
    <Document title={`Production-Requirements-${todayLabel}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Production Requirements</Text>
              <Text style={styles.subtitle}>Clean production summary by package and variant</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Date: {todayLabel}</Text>
              <Text style={styles.subtitle}>Day: {data.dayName}</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Packages</Text>
              <Text style={styles.summaryValue}>{packageCount}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Variants</Text>
              <Text style={styles.summaryValue}>{variantCount}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Meals</Text>
              <Text style={styles.summaryValue}>{data.totalMeals}</Text>
            </View>
          </View>
        </View>

        {data.packages.map((pkg, packageIndex) => {
          const isLastPackage = packageIndex === data.packages.length - 1;

          return (
            <View key={pkg.packageId} style={[styles.packageSection, ...(isLastPackage ? [{ marginBottom: 0 }] : [])]}>
              <View style={styles.packageHeader}>
                <View>
                  <Text style={styles.packageName}>
                    {pkg.packageName} ({formatDecimal(pkg.packagePrice)})
                  </Text>
                  <Text style={styles.packageMeta}>
                    {pkg.variants.length} variant{pkg.variants.length !== 1 ? "s" : ""}
                  </Text>
                </View>
                <View>
                  <Text style={styles.packageTotal}>{pkg.totalMeals}</Text>
                  <Text style={styles.packageTotalLabel}>Meals</Text>
                </View>
              </View>

              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, styles.colVariant]}>Variant</Text>
                  <Text style={[styles.tableHeaderText, styles.colItems]}>Food Items</Text>
                  <Text style={[styles.tableHeaderText, styles.colMeals]}>Meals</Text>
                </View>

                {pkg.variants.map((variant, variantIndex) => {
                  const isLastVariant = variantIndex === pkg.variants.length - 1;

                  return (
                    <View
                      key={`${pkg.packageId}-${variant.variantName}`}
                      style={[
                        styles.row,
                        ...(variantIndex % 2 === 1 ? [styles.rowAlt] : []),
                        ...(isLastVariant ? [styles.rowLast] : []),
                      ]}
                      wrap={false}
                    >
                      <View style={styles.colVariant}>
                        <Text style={styles.variantText}>{variant.variantName}</Text>
                      </View>

                      <View style={styles.colItems}>
                        <Text style={styles.itemsText}>{formatItems(variant.items)}</Text>
                      </View>

                      <View style={[styles.colMeals, styles.mealsWrap]}>
                        <View style={styles.mealsBadge}>
                          <Text style={styles.mealsBadgeText}>{variant.totalQuantity}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}

        <View style={styles.footer} fixed>
          <View style={styles.footerDivider} />
          <View style={styles.footerRow}>
            <Text
              style={styles.footerText}
              render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
            />
            <Text style={styles.footerText}>Production Requirements</Text>
            <Text style={styles.footerText}>Generated: {moment(data.date).format(GENERATED_AT_FORMAT)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const downloadProductionRequirementsPdf = async ({ data }: ProductionRequirementsPdfProps) => {
  ensurePdfFontRegistered();

  const blob = await pdf(<ProductionRequirementsPdfDocument data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `production-requirements-${moment(data.date).format(TIMESTAMP_FORMAT)}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
};
