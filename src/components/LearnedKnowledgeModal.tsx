import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Sparkles,
  X,
  Trash2,
  Calendar,
  CheckCircle2,
  Layers,
  Search,
  ArrowRight,
  Database,
  Cpu,
  RefreshCw,
  Info
} from "lucide-react";
import { LearnedSpecies, clearAllLearnedSpecies, deleteLearnedSpecies } from "../utils/localKnowledgeBase";

interface LearnedKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnedList: LearnedSpecies[];
  onLearnedListUpdated: () => void;
  onSelectSampleToTest?: (thumbnailOrName: string) => void;
}

export function LearnedKnowledgeModal({
  isOpen,
  onClose,
  learnedList,
  onLearnedListUpdated,
  onSelectSampleToTest,
}: LearnedKnowledgeModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = learnedList.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.commonName.toLowerCase().includes(q) ||
      item.scientificName.toLowerCase().includes(q) ||
      item.botanicalFamily.toLowerCase().includes(q)
    );
  });

  const handleDelete = (id: string) => {
    deleteLearnedSpecies(id);
    onLearnedListUpdated();
    setDeleteConfirmId(null);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to reset all learned species in local memory? The built-in 106 species will remain.")) {
      clearAllLearnedSpecies();
      onLearnedListUpdated();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
                <Brain className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Local ML Continual Learning Memory
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-medium border border-emerald-400/40">
                    Live Auto-Sync
                  </span>
                </h2>
                <p className="text-sm text-emerald-100/80">
                  New flower species detected by Cloud AI are permanently learned and added to your on-device ML model
                </p>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/15">
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                <div className="text-xs text-emerald-200/80 flex items-center gap-1.5 font-medium">
                  <Database className="w-3.5 h-3.5" /> Built-in Dataset
                </div>
                <div className="text-xl font-bold text-white mt-0.5">106 Species</div>
              </div>
              <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-3 backdrop-blur-xs">
                <div className="text-xs text-emerald-300 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5" /> Learned from AI
                </div>
                <div className="text-xl font-bold text-emerald-200 mt-0.5">{learnedList.length} Species</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                <div className="text-xs text-emerald-200/80 flex items-center gap-1.5 font-medium">
                  <Cpu className="w-3.5 h-3.5" /> Total Local Index
                </div>
                <div className="text-xl font-bold text-white mt-0.5">{106 + learnedList.length} Species</div>
              </div>
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search learned botanical specimens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
              />
            </div>
            {learnedList.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5 border border-red-200/60"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reset Learned Memory
              </button>
            )}
          </div>

          {/* Content Body */}
          <div className="p-6 max-h-[55vh] overflow-y-auto space-y-4">
            {learnedList.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-xs">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  No Species Learned Yet
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  Select <span className="font-semibold text-emerald-700">"Cloud AI Multimodal Model"</span> or upload an unindexed flower. Once Cloud AI identifies it, its visual fingerprint and botanical profile will appear here and become instantly detectable on-device by your Local ML engine!
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Continual Online Learning is Active
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                No learned species matching "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          {item.sampleThumbnail ? (
                            <img
                              src={item.sampleThumbnail}
                              alt={item.commonName}
                              className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xl shrink-0">
                              🌸
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-slate-900 text-base capitalize flex items-center gap-1.5">
                              {item.commonName}
                            </h4>
                            <p className="text-xs text-slate-500 italic font-medium">
                              {item.scientificName}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                          Learned
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {item.botanicalFamily}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {new Date(item.learnedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      {item.sampleThumbnail && onSelectSampleToTest ? (
                        <button
                          onClick={() => {
                            onSelectSampleToTest(item.sampleThumbnail!);
                            onClose();
                          }}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
                        >
                          Test in Local ML <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ready in Local ML
                        </span>
                      )}

                      {deleteConfirmId === item.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-[11px] px-2 py-1 bg-red-600 text-white rounded font-medium hover:bg-red-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-[11px] px-2 py-1 bg-slate-200 text-slate-700 rounded font-medium hover:bg-slate-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                          title="Remove from learned memory"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Learned specimens are cached locally and recognized offline by your browser's ML engine.
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
