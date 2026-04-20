const fs = require('fs');
const file = 'apps/frontend/features/client-portal/client-portal-page.tsx';
let code = fs.readFileSync(file, 'utf8');

const variantCardOld = `function VariantCard({
  variant,
  quantity,
  pulse,
  onQuantityChange,
}: {
  variant: MenuVariant;
  quantity: number;
  pulse: boolean;
  onQuantityChange: (next: number) => void;
}) {
  const active = quantity > 0;
  const available = variant.available ?? true;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl border p-4 transition-all duration-200",
        available
          ? "hover:-translate-y-0.5 hover:shadow-lg"
          : "cursor-not-allowed border-dashed bg-muted/25 opacity-70 grayscale",
        active
          ? "border-[hsl(var(--cater-primary))/0.5] bg-[hsl(var(--cater-primary))/0.08] shadow-[0_8px_26px_-16px_hsl(var(--cater-primary))]"
          : "border-border/70 bg-card/90",
        pulse && "animate-pulse",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 pr-2">
          <h4 className="text-[17px] sm:text-lg font-semibold tracking-tight text-foreground truncate">{variant.name}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{variant.note}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]",
            available ? "bg-emerald-500/12 text-emerald-700" : "bg-red-500/12 text-red-700",
          )}
        >
          <Clock3 className="h-3.5 w-3.5" />
          {available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {variant.items.map((item) => (
          <MealItemPill key={\`\${variant.id}-\${item}\`} label={item} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Quantity</p>
        <QuantityStepper value={quantity} disabled={!available} onChange={onQuantityChange} />
      </div>

      {!available ? (
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-muted/30" />
      ) : null}
    </article>
  );
}`;

const variantCardNew = `function VariantCard({
  variant,
  quantity,
  price,
  pulse,
  onQuantityChange,
}: {
  variant: MenuVariant;
  quantity: number;
  price: number;
  pulse: boolean;
  onQuantityChange: (next: number) => void;
}) {
  const active = quantity > 0;
  const available = variant.available ?? true;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl border transition-all duration-200 flex gap-3 p-3 sm:p-4",
        available
          ? "hover:-translate-y-0.5 hover:shadow-md bg-card"
          : "cursor-not-allowed border-dashed bg-muted/25 opacity-70 grayscale",
        active
          ? "border-[hsl(var(--cater-primary))/0.4] ring-1 ring-[hsl(var(--cater-primary))/0.4]"
          : "border-border/70",
        pulse && "animate-pulse"
      )}
    >
      <div className="flex flex-1 flex-col min-w-0">
        <h4 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
          {variant.name}
        </h4>
        <p className="mt-0.5 text-sm font-medium text-muted-foreground">
          Tk {price}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground line-clamp-2 sm:line-clamp-3">
           {variant.note} {variant.items.join(", ")}
        </p>
        
        {!available && (
          <span className="inline-flex mt-2 items-center gap-1 rounded-full bg-red-500/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-red-700 w-fit">
            Unavailable
          </span>
        )}
      </div>

      <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"
          alt={variant.name}
          className="h-full w-full object-cover"
        />
        {available && (
          <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2">
            {quantity === 0 ? (
              <button
                type="button"
                onClick={() => onQuantityChange(1)}
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-background text-foreground shadow-sm shadow-black/20 hover:bg-muted transition"
              >
                <Plus className="h-4 w-4" />
              </button>
            ) : (
              <div className="flex h-7 sm:h-8 items-center gap-1 sm:gap-2 rounded-full bg-background px-1 shadow-sm shadow-black/20">
                <button
                  type="button"
                  onClick={() => onQuantityChange(quantity - 1)}
                  className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-foreground hover:bg-muted/50 transition"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-[12px] sm:min-w-[16px] text-center text-xs sm:text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onQuantityChange(quantity + 1)}
                  className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-foreground hover:bg-muted/50 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}`;

if (!code.includes(variantCardOld)) {
  console.log("Could not find the old variant card layout. Falling back to alternative approach.");
} else {
  code = code.replace(variantCardOld, variantCardNew);
}

// Ensure the VariantCard instantiation gets the new 'price' prop
code = code.replace(
  'pulse={recentlyUpdatedKey === `${activePackage.id}::${key}`}',
  'price={activePackage.pricePerMeal}\n                              pulse={recentlyUpdatedKey === `${activePackage.id}::${key}`}'
);

const resetSelectionStr = `  const resetSelection = () => {`;
const updateQuantityGlobalStr = `  const updateQuantityGlobal = (pkgId: string, day: DayName, variantId: string, next: number) => {
    const safe = Math.max(0, Math.min(500, next));
    const key = createQuantityKey(day, variantId);

    setPackageSelections((prev) => {
      const pkgDefinition = packages.find((p) => p.id === pkgId);
      if (!pkgDefinition) return prev;
      const currentPkgSelection = prev[pkgId] ?? createInitialSelection(pkgDefinition);
      return {
        ...prev,
        [pkgId]: {
          ...currentPkgSelection,
          quantities: {
            ...currentPkgSelection.quantities,
            [key]: safe,
          },
        },
      };
    });

    setRecentlyUpdatedKey(\`\${pkgId}::\${key}\`);
  };

  const resetSelection = () => {`;

code = code.replace(resetSelectionStr, updateQuantityGlobalStr);

const orderRowsTypeOld = `  const orderRows = useMemo(() => {
    const rows: Array<{
      key: string;
      packageName: string;`;
const orderRowsTypeNew = `  const orderRows = useMemo(() => {
    const rows: Array<{
      key: string;
      pkgId: string;
      variantId: string;
      packageName: string;`;

code = code.replace(orderRowsTypeOld, orderRowsTypeNew);

const orderRowsPushOld = `            rows.push({
              key: \`\${pkg.id}::\${quantityKey}\`,
              packageName: pkg.name,`;
const orderRowsPushNew = `            rows.push({
              key: \`\${pkg.id}::\${quantityKey}\`,
              pkgId: pkg.id,
              variantId: variant.id,
              packageName: pkg.name,`;

code = code.replace(orderRowsPushOld, orderRowsPushNew);

// Desktop Order Summary Item Replacement
const desktopRowOld = `                      orderRows.map((row) => (
                        <div
                          key={row.key}
                          className={cn(
                            "rounded-xl border border-border/70 bg-background/75 p-3 transition",
                            recentlyUpdatedKey === row.key && "ring-1 ring-[hsl(var(--cater-primary))/0.35]",
                          )}
                        >
                          <p className="text-sm font-semibold text-foreground">
                            {row.packageName} - {row.day} - {row.label}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{row.items.join(", ")}</p>
                          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                            <span>{row.quantity} meal</span>
                            <span className="font-semibold text-foreground">{bdt.format(row.subtotal)}</span>
                          </div>
                        </div>
                      ))`;

const desktopRowNew = `                      orderRows.map((row) => (
                        <div
                          key={row.key}
                          className={cn(
                            "rounded-xl border border-border/70 bg-background/75 p-3 transition",
                            recentlyUpdatedKey === row.key && "ring-1 ring-[hsl(var(--cater-primary))/0.35]",
                          )}
                        >
                          <p className="text-sm font-semibold text-foreground">
                            {row.packageName} - {row.day} - {row.label}
                          </p>
                          <p className="mt-1 text-[11px] leading-tight text-muted-foreground line-clamp-2">{row.items.join(", ")}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background px-1.5 py-1">
                              <button
                                onClick={() => updateQuantityGlobal(row.pkgId, row.day, row.variantId, row.quantity - 1)}
                                className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-[16px] text-center text-xs font-semibold text-foreground">{row.quantity}</span>
                              <button
                                onClick={() => updateQuantityGlobal(row.pkgId, row.day, row.variantId, row.quantity + 1)}
                                className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="font-medium text-sm text-foreground">{bdt.format(row.subtotal)}</span>
                          </div>
                        </div>
                      ))`;

code = code.replace(desktopRowOld, desktopRowNew);

// Mobile Order Summary Item Replacement
const mobileRowOld = `                  orderRows.map((row) => (
                    <div key={row.key} className="rounded-xl border border-border/70 bg-background p-2.5">
                      <p className="text-sm font-semibold">
                        {row.packageName} - {row.day} - {row.label}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{row.items.join(", ")}</p>
                      <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{row.quantity} meal</span>
                        <span className="font-semibold text-foreground">{bdt.format(row.subtotal)}</span>
                      </div>
                    </div>
                  ))`;

const mobileRowNew = `                  orderRows.map((row) => (
                    <div key={row.key} className="rounded-xl border border-border/70 bg-background p-2.5">
                      <p className="text-sm font-semibold">
                        {row.packageName} - {row.day} - {row.label}
                      </p>
                      <p className="mt-1 text-[11px] leading-tight text-muted-foreground line-clamp-2">{row.items.join(", ")}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-muted/30 px-1.5 py-1">
                          <button
                            onClick={() => updateQuantityGlobal(row.pkgId, row.day, row.variantId, row.quantity - 1)}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[16px] text-center text-xs font-semibold text-foreground">{row.quantity}</span>
                          <button
                            onClick={() => updateQuantityGlobal(row.pkgId, row.day, row.variantId, row.quantity + 1)}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-medium text-sm text-foreground">{bdt.format(row.subtotal)}</span>
                      </div>
                    </div>
                  ))`;

code = code.replace(mobileRowOld, mobileRowNew);

fs.writeFileSync(file, code);
console.log('Successfully completed Variant layout and Order Summary stepper features.');
