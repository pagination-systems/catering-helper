"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Store,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, type SelectOption } from "@/components/ui/select";
import { type CateringDirectoryContent, cateringDirectoryContent } from "@/lib/i18n";
import { cn, formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

import { cateringAreas } from "./data";
import { useCaterings } from "./hooks/useCaterings";

type SortKey = "recommended" | "topRated" | "priceLow" | "priceHigh";

const totalAreas = cateringAreas.length;

export const CateringDirectory = () => {
  const { language } = useLanguage();
  const content = cateringDirectoryContent[language] as CateringDirectoryContent;

  const { listings, isLoading } = useCaterings();

  // Stats derived from the live directory data.
  const totalCaterers = listings.length;
  const averageRating = listings.length
    ? (listings.reduce((sum, listing) => sum + listing.rating, 0) / listings.length).toFixed(1)
    : "0.0";

  // Unique cuisine tags across all listings, used for the quick-filter chips.
  const cuisineOptions = useMemo(
    () => Array.from(new Set(listings.flatMap((listing) => listing.cuisines))).sort(),
    [listings],
  );

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");
  // Applied values drive the actual filtering — they only update when the
  // Search button is pressed, so typing a name or picking a location does not
  // filter the listings until the user submits.
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedArea, setAppliedArea] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [sort, setSort] = useState<SortKey>("recommended");

  const locationOptions: SelectOption[] = useMemo(
    () => [{ label: content.allLocations, value: "" }, ...cateringAreas],
    [content.allLocations],
  );

  const sortOptions: SelectOption<SortKey>[] = useMemo(
    () => [
      { label: content.sortRecommended, value: "recommended" },
      { label: content.sortTopRated, value: "topRated" },
      { label: content.sortPriceLow, value: "priceLow" },
      { label: content.sortPriceHigh, value: "priceHigh" },
    ],
    [content.sortRecommended, content.sortTopRated, content.sortPriceLow, content.sortPriceHigh],
  );

  const advancedFilterCount = (maxPrice ? 1 : 0) + (minOrder ? 1 : 0);
  const hasActiveFilters = Boolean(appliedSearch || appliedArea || cuisine || maxPrice || minOrder);

  const filtered = useMemo(() => {
    const query = appliedSearch.trim().toLowerCase();
    const results = listings.filter((listing) => {
      if (query) {
        const haystack = [listing.name, ...listing.cuisines, listing.location].join(" ").toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (appliedArea && listing.area !== appliedArea) return false;
      if (cuisine && !listing.cuisines.includes(cuisine)) return false;
      if (maxPrice && listing.startingPrice > Number(maxPrice)) return false;
      if (minOrder && listing.minimumOrder > Number(minOrder)) return false;
      return true;
    });

    return [...results].sort((a, b) => {
      switch (sort) {
        case "topRated":
          return b.rating - a.rating || b.reviews - a.reviews;
        case "priceLow":
          return a.startingPrice - b.startingPrice;
        case "priceHigh":
          return b.startingPrice - a.startingPrice;
        default:
          return Number(b.popular ?? false) - Number(a.popular ?? false) || b.rating - a.rating;
      }
    });
  }, [listings, appliedSearch, appliedArea, cuisine, maxPrice, minOrder, sort]);

  // Push the current name/location inputs into the applied state so the
  // listings re-filter. Triggered by the Search button / form submit.
  const applySearch = () => {
    setAppliedSearch(search);
    setAppliedArea(area);
  };

  const clearFilters = () => {
    setSearch("");
    setArea("");
    setAppliedSearch("");
    setAppliedArea("");
    setCuisine("");
    setMaxPrice("");
    setMinOrder("");
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              {content.badge}
            </div>
            <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 text-pretty text-sm leading-7 text-muted-foreground sm:text-base">{content.subtitle}</p>
          </motion.div>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onSubmit={(event) => {
              event.preventDefault();
              applySearch();
            }}
            className="mt-7 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm sm:flex-row sm:items-center sm:rounded-full"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={content.searchPlaceholder}
                aria-label={content.searchPlaceholder}
                className="h-10 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center gap-2 sm:border-l sm:border-border sm:pl-2">
              <div className="relative flex-1 sm:w-44">
                <MapPin className="pointer-events-none absolute left-2.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Select
                  options={locationOptions}
                  value={area}
                  onValueChange={setArea}
                  placeholder={content.allLocations}
                  className="h-10 rounded-full border-0 pl-7"
                />
              </div>
              <Button type="submit" size="lg" className="h-10 rounded-full px-5">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">{content.searchCta}</span>
              </Button>
            </div>
          </motion.form>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { icon: Store, value: `${totalCaterers}+`, label: content.statCaterers },
              { icon: MapPin, value: totalAreas, label: content.statAreas },
              { icon: Star, value: averageRating, label: content.statRating },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-4 w-4" />
                </div>
                <div className="leading-tight">
                  <p className="text-base font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Cuisine quick filters */}
        <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
          <button
            type="button"
            onClick={() => setCuisine("")}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              cuisine === ""
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted",
            )}
          >
            {content.cuisineAll}
          </button>
          {cuisineOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCuisine(cuisine === option ? "" : option)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                cuisine === option
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Toolbar: results + sort + more filters */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> {content.resultsLabel}
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <X className="h-3 w-3" />
                {content.clearAll}
              </button>
            ) : null}
          </p>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <SlidersHorizontal className="h-4 w-4" />
                  {content.moreFilters}
                  {advancedFilterCount > 0 ? (
                    <Badge className="ml-0.5 h-5 min-w-5 justify-center px-1.5 text-[10px]">
                      {advancedFilterCount}
                    </Badge>
                  ) : null}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="catering-max-price">
                    {content.priceLabel}
                  </label>
                  <Input
                    id="catering-max-price"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(event.target.value)}
                    placeholder={content.anyPrice}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="catering-min-order">
                    {content.minOrderLabel}
                  </label>
                  <Input
                    id="catering-min-order"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={minOrder}
                    onChange={(event) => setMinOrder(event.target.value)}
                    placeholder={content.anyMinOrder}
                  />
                </div>
                {advancedFilterCount > 0 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setMaxPrice("");
                      setMinOrder("");
                    }}
                  >
                    {content.clearFilters}
                  </Button>
                ) : null}
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2">
              <span className="hidden whitespace-nowrap text-sm text-muted-foreground sm:inline">
                {content.sortLabel}
              </span>
              <Select<SortKey>
                options={sortOptions}
                value={sort}
                onValueChange={setSort}
                className="h-9 w-48"
                isSearchable={false}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders
                key={index}
                className="h-72 animate-pulse rounded-2xl border border-border bg-card"
              />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <Link
                key={listing.slug}
                href={`/${listing.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <Image
                    src={listing.imageUrl}
                    alt={listing.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                  {listing.popular ? (
                    <Badge className="absolute left-3 top-3 shadow-sm">{content.popular}</Badge>
                  ) : null}
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    {listing.rating.toFixed(1)}
                    <span className="font-normal text-muted-foreground">({listing.reviews})</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">{listing.name}</h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {listing.location}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{listing.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {listing.cuisines.map((cuisineTag) => (
                      <span
                        key={cuisineTag}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground"
                      >
                        {cuisineTag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {content.startingFrom}
                      </p>
                      <p className="text-lg font-bold leading-tight text-foreground">
                        {formatCurrency(listing.startingPrice)}
                        <span className="ml-1 text-[11px] font-medium text-muted-foreground">{content.perMeal}</span>
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {content.minOrderCardLabel}: {listing.minimumOrder} {content.mealsUnit}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      {content.viewMenu}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <div
              className={cn("flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground")}
            >
              <UtensilsCrossed className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">{content.emptyTitle}</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">{content.emptyDescription}</p>
            <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
              {content.clearFilters}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
