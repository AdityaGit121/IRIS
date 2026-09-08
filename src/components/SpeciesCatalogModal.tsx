import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Search,
  BookOpen,
  Filter,
  Sparkles,
  Sun,
  Droplets,
  Sprout,
  Compass,
  Tag,
  Info,
  CheckCircle2
} from "lucide-react";
import { FLOWER_DATASET, FlowerDetail } from "../flowerDataset";

interface SpeciesCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSampleFlower?: (flowerKey: string) => void;
}

export function SpeciesCatalogModal({
  isOpen,
  onClose,
  onSelectSampleFlower
}: SpeciesCatalogModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [selectedSpeciesKey, setSelectedSpeciesKey] = useState<string | null>(null);

  const allEntries = useMemo(() => {
    return Object.entries(FLOWER_DATASET).map(([key, detail]) => ({
      key,
      ...detail
    }));
  }, []);

  // Compute unique botanical families
  const families = useMemo(() => {
    const set = new Set<string>();
    allEntries.forEach((item) => {
      if (item.botanicalFamily) {
        set.add(item.botanicalFamily);
      }
    });
    return ["All", ...Array.from(set).sort()];
  }, [allEntries]);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allEntries.filter((item) => {
      const matchesQuery =
        !q ||
        item.key.toLowerCase().includes(q) ||
        item.scientificName.toLowerCase().includes(q) ||
        item.botanicalFamily.toLowerCase().includes(q) ||
        item.nativeRegion.toLowerCase().includes(q) ||
        (item.aliases && item.aliases.some((a) => a.toLowerCase().includes(q)));

      const matchesFamily =
        selectedFamily === "All" || item.botanicalFamily === selectedFamily;

      return matchesQuery && matchesFamily;
    });
  }, [allEntries, searchQuery, selectedFamily]);

  const activeDetail: (FlowerDetail & { key: string }) | null = useMemo(() => {
    if (!selectedSpeciesKey || !FLOWER_DATASET[selectedSpeciesKey]) {
      return null;
    }
    return {
      key: selectedSpeciesKey,
      ...FLOWER_DATASET[selectedSpeciesKey]
    };
  }, [selectedSpeciesKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25 }}
        className="bg-white border border-stone-200 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200/80 bg-stone-50/70 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                <BookOpen className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                Botanical Flora Catalog ({allEntries.length} Species)
              </h2>
              <span className="bg-emerald-800 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                Combined Datasets
              </span>
            </div>
            <p className="text-xs text-stone-500 font-light max-w-2xl leading-relaxed">
              Synthesized from the <strong>Oxford 102 Category Flowers Benchmark</strong>, <strong>Kaggle/TF Flora</strong>, and the <strong>Royal Horticultural Society (RHS)</strong> catalog. Every species includes verified taxonomy, native distribution, and tailored 3-factor care instructions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-xl transition-colors"
            title="Close Catalog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="px-6 py-3.5 border-b border-stone-200/80 bg-white space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by common name, scientific name (e.g., 'Bellis', 'Orchidaceae', 'Rosa')..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Count Badge */}
            <div className="text-xs text-stone-500 whitespace-nowrap px-3 py-2 bg-stone-100/70 border border-stone-200/70 rounded-xl flex items-center justify-between sm:justify-start gap-2">
              <span className="font-semibold text-stone-800">{filteredEntries.length}</span>
              <span>of {allEntries.length} species shown</span>
            </div>
          </div>

          {/* Family Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            <span className="text-[11px] font-semibold text-stone-400 flex items-center gap-1 mr-1 shrink-0">
              <Filter className="w-3 h-3" /> Family:
            </span>
            {families.slice(0, 10).map((fam) => {
              const isSelected = selectedFamily === fam;
              const count = fam === "All" ? allEntries.length : allEntries.filter(e => e.botanicalFamily === fam).length;
              return (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`px-2.5 py-1 rounded-lg font-medium text-[11px] shrink-0 transition-colors ${
                    isSelected
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200/70 border border-stone-200/60"
                  }`}
                >
                  {fam === "All" ? "All Families" : fam.replace(/\s*\(.*\)/, "")} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area: Grid + Details Side/Modal */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-50/40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredEntries.map((species) => {
              const isSelected = selectedSpeciesKey === species.key;
              return (
                <div
                  key={species.key}
                  onClick={() => setSelectedSpeciesKey(species.key)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white relative flex flex-col justify-between group hover:shadow-md ${
                    isSelected
                      ? "border-emerald-600 ring-2 ring-emerald-600/20 shadow-sm"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-bold text-stone-900 text-sm capitalize group-hover:text-emerald-800 transition-colors">
                        {species.key}
                      </h3>
                      <span className="text-xs bg-stone-100 text-stone-600 font-mono px-2 py-0.5 rounded-md border border-stone-200/80">
                        #{species.key.slice(0, 4)}
                      </span>
                    </div>

                    <div className="text-xs italic text-emerald-800 font-serif mb-2">
                      {species.scientificName}
                    </div>

                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed font-light mb-3">
                      {species.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-md border border-emerald-200/60 truncate max-w-[150px]">
                      {species.botanicalFamily}
                    </span>
                    <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md truncate max-w-[140px]">
                      {species.nativeRegion}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-stone-200">
              <Search className="w-8 h-8 text-stone-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-stone-800">No matching botanical species found</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try searching for a different scientific term, common alias, or reset the family filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFamily("All");
                }}
                className="mt-4 px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Selected Species Detail Sheet (Footer Drawer) */}
        <AnimatePresence>
          {activeDetail && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="p-5 border-t border-stone-200 bg-white shadow-xl relative"
            >
              <button
                onClick={() => setSelectedSpeciesKey(null)}
                className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                title="Dismiss Details"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                <div className="md:col-span-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-stone-900 capitalize font-serif">
                      {activeDetail.key}
                    </h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Full Record
                    </span>
                  </div>
                  <div className="text-xs italic text-emerald-800 font-serif font-medium">
                    {activeDetail.scientificName}
                  </div>
                  <div className="space-y-1 text-xs text-stone-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-semibold text-stone-700">Family:</span>
                      <span>{activeDetail.botanicalFamily}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-semibold text-stone-700">Native Origin:</span>
                      <span className="truncate">{activeDetail.nativeRegion}</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pt-1 font-light">
                    {activeDetail.description}
                  </p>
                </div>

                {/* Fun fact and Care instructions */}
                <div className="md:col-span-8 space-y-3">
                  <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold mr-1">Botanical Trivia:</span>
                      <span className="font-light">{activeDetail.funFact}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
                    <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Cultivation & Horticultural Care Guide</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-stone-600">
                      <div className="p-2 bg-white rounded-lg border border-stone-200/70 space-y-0.5">
                        <div className="font-semibold text-stone-900 flex items-center gap-1 text-[10px] text-amber-800">
                          <Sun className="w-3 h-3 text-amber-600" /> Sunlight
                        </div>
                        <p className="font-light leading-snug">{activeDetail.careInstructions[0]}</p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-stone-200/70 space-y-0.5">
                        <div className="font-semibold text-stone-900 flex items-center gap-1 text-[10px] text-blue-800">
                          <Droplets className="w-3 h-3 text-blue-600" /> Moisture
                        </div>
                        <p className="font-light leading-snug">{activeDetail.careInstructions[1]}</p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-stone-200/70 space-y-0.5">
                        <div className="font-semibold text-stone-900 flex items-center gap-1 text-[10px] text-emerald-800">
                          <Sprout className="w-3 h-3 text-emerald-600" /> Soil & Media
                        </div>
                        <p className="font-light leading-snug">{activeDetail.careInstructions[2]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-stone-200/80 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dual-Engine: 106 On-Device Datasets + 400,000+ Multimodal Gemini Cloud Species</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-xl text-xs transition-colors"
          >
            Close Catalog
          </button>
        </div>
      </motion.div>
    </div>
  );
}
