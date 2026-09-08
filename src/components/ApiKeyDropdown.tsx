import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Key,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ExternalLink,
  Trash2,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Lock,
  RefreshCw
} from "lucide-react";

interface ApiKeyDropdownProps {
  userApiKey: string;
  onApiKeyChange: (newKey: string) => void;
  defaultApiReady: boolean;
}

export function ApiKeyDropdown({
  userApiKey,
  onApiKeyChange,
  defaultApiReady,
}: ApiKeyDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>(userApiKey);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifyStatus, setVerifyStatus] = useState<{
    tested: boolean;
    valid?: boolean;
    message?: string;
  }>({ tested: false });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputVal(userApiKey);
  }, [userApiKey]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSaveAndVerify = async () => {
    const trimmed = inputVal.trim();
    if (!trimmed) {
      onApiKeyChange("");
      setVerifyStatus({ tested: true, valid: false, message: "Please enter a valid API key or clear it." });
      return;
    }

    setIsVerifying(true);
    setVerifyStatus({ tested: false });

    try {
      const res = await fetch("/api/verify-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: trimmed }),
      });

      const data = await res.json();
      if (res.ok && data.valid) {
        onApiKeyChange(trimmed);
        setVerifyStatus({
          tested: true,
          valid: true,
          message: data.warning || "Key verified and active for all your detections!"
        });
      } else {
        setVerifyStatus({
          tested: true,
          valid: false,
          message: data.error || "Could not verify API Key with Google Gemini."
        });
      }
    } catch (err: any) {
      setVerifyStatus({
        tested: true,
        valid: false,
        message: "Network error while validating key."
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClear = () => {
    setInputVal("");
    onApiKeyChange("");
    setVerifyStatus({ tested: false });
  };

  const isCustomActive = Boolean(userApiKey && userApiKey.trim().length > 0);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Top Trigger Button */}
      <button
        id="api-key-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs border cursor-pointer ${
          isCustomActive
            ? "bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-300 ring-1 ring-purple-400/30"
            : defaultApiReady
            ? "bg-stone-100 hover:bg-stone-200/80 text-stone-800 border-stone-200"
            : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 animate-pulse"
        }`}
        title="Manage your Gemini API Key"
      >
        <Key className={`w-3.5 h-3.5 ${isCustomActive ? "text-purple-700" : "text-stone-600"}`} />
        <span>
          {isCustomActive ? (
            <span className="flex items-center gap-1.5">
              <span>My API Key:</span>
              <span className="font-mono text-[11px] bg-purple-200/80 text-purple-950 px-1.5 py-0.2 rounded">
                ••••{userApiKey.slice(-4)}
              </span>
            </span>
          ) : (
            <span>API Key Input</span>
          )}
        </span>
        <span
          className={`w-2 h-2 rounded-full ${
            isCustomActive
              ? "bg-purple-600"
              : defaultApiReady
              ? "bg-emerald-500"
              : "bg-amber-500"
          }`}
        />
        <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200/90 p-5 z-50 text-stone-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-100">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900">Gemini API Key Input</h3>
                  <p className="text-[10px] text-stone-500">Provide your personal Google Gemini Key</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isCustomActive
                  ? "bg-purple-100 text-purple-800 border border-purple-200"
                  : defaultApiReady
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-amber-100 text-amber-800 border border-amber-200"
              }`}>
                {isCustomActive ? "User Key Active" : defaultApiReady ? "System Key Ready" : "Key Required"}
              </span>
            </div>

            {/* Form */}
            <div className="mt-3.5 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Your Google Gemini API Key
                </label>
                <div className="relative">
                  <input
                    id="input-user-gemini-key"
                    type={showKey ? "text" : "password"}
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      setVerifyStatus({ tested: false });
                    }}
                    placeholder="AIzaSy..."
                    className="w-full text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 pr-16 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="p-1 text-stone-400 hover:text-stone-600 rounded-md transition-colors"
                      title={showKey ? "Hide key" : "Show key"}
                    >
                      {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    {inputVal && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="p-1 text-stone-400 hover:text-red-600 rounded-md transition-colors"
                        title="Clear key"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Message */}
              {verifyStatus.tested && (
                <div
                  className={`p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                    verifyStatus.valid
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {verifyStatus.valid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <span className="text-[11px] leading-tight font-medium">
                    {verifyStatus.message}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  id="btn-save-api-key"
                  onClick={handleSaveAndVerify}
                  disabled={isVerifying}
                  className="flex-1 bg-purple-800 hover:bg-purple-700 active:scale-[0.98] text-white text-xs font-semibold py-2 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying with Google...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                      <span>Save & Apply Key</span>
                    </>
                  )}
                </button>
              </div>

              {/* Security & Helper Links */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Saved locally in browser</span>
                </div>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 hover:underline"
                >
                  <span>Get Free Key</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
