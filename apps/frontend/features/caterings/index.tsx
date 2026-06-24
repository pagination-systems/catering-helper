"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search, SlidersHorizontal, Star, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, type SelectOption } from "@/components/ui/select";
import { type CateringDirectoryContent, cateringDirectoryContent } from "@/lib/i18n";
import { cn, formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

import { cateringAreas, cateringListings } from "./data";

export const CateringDirectory = () => {
  const { language } = useLanguage();
  const content = cateringDirectoryContent[language] as CateringDirectoryContent;

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minOrder, setMinOrder] = useState("");

  const locationOptions: SelectOption[] = useMemo(
    () => [{ label: content.allLocations, value: "" }, ...cateringAreas],
    [content.allLocations],
  );

  const hasActiveFilters = Boolean(search || area || maxPrice || minOrder);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return cateringListings.filter((listing) => {
      if (query && !listing.name.toLowerCase().includes(query)) return false;
      if (area && listing.area !== area) return false;
      if (maxPrice && listing.startingPrice > Number(maxPrice)) return false;
      if (minOrder && listing.minimumOrder > Number(minOrder)) return false;
      return true;
    });
  }, [search, area, maxPrice, minOrder]);

  const clearFilters = () => {
    setSearch("");
    setArea("");
    setMaxPrice("");
    setMinOrder("");
  };

  return (
    <div className="bg-background">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
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

        {/* Filters */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            {content.filtersLabel}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="catering-search">
                {content.searchPlaceholder}
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="catering-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={content.searchPlaceholder}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">{content.locationLabel}</span>
              <Select
                options={locationOptions}
                value={area}
                onValueChange={setArea}
                placeholder={content.allLocations}
              />
            </div>

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
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span> {content.resultsLabel}
            </p>
            {hasActiveFilters ? (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                {content.clearFilters}
              </Button>
            ) : null}
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <Link
                key={listing.slug}
                href={`/${listing.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <Image
                    src={listing.imageUrl}
                    alt={listing.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {listing.popular ? (
                    <Badge className="absolute left-3 top-3 shadow-sm">{content.popular}</Badge>
                  ) : null}
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    {listing.rating.toFixed(1)}
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
                    {listing.cuisines.map((cuisine) => (
                      <span
                        key={cuisine}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground"
                      >
                        {cuisine}
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
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      {content.viewMenu}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
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
