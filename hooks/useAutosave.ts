"use client";

import { useEffect, useCallback, useRef } from "react";

interface UseAutosaveOptions<T> {
  key: string;
  data: T;
  onRestore?: (data: T) => void;
  debounceMs?: number;
  enabled?: boolean;
}

export function useAutosave<T>({
  key,
  data,
  onRestore,
  debounceMs = 2000,
  enabled = true,
}: UseAutosaveOptions<T>) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);
  const storageKey = `autosave:${key}`;

  // Restore on mount
  useEffect(() => {
    if (!enabled || isInitializedRef.current) return;
    isInitializedRef.current = true;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && onRestore) {
        const parsed = JSON.parse(saved);
        const savedAt = parsed._savedAt;
        const now = Date.now();
        const hourAgo = now - 60 * 60 * 1000;

        // Only restore if saved within last hour
        if (savedAt && savedAt > hourAgo) {
          const shouldRestore = window.confirm(
            "पिछला अधूरा काम मिला। क्या आप उसे restore करना चाहते हैं?\n\n(Unsaved work found. Restore it?)"
          );
          if (shouldRestore) {
            delete parsed._savedAt;
            onRestore(parsed);
          } else {
            localStorage.removeItem(storageKey);
          }
        } else {
          localStorage.removeItem(storageKey);
        }
      }
    } catch (error) {
      console.error("Autosave restore error:", error);
      localStorage.removeItem(storageKey);
    }
  }, [storageKey, onRestore, enabled]);

  // Save on change (debounced)
  useEffect(() => {
    if (!enabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        const toSave = { ...data, _savedAt: Date.now() };
        localStorage.setItem(storageKey, JSON.stringify(toSave));
      } catch (error) {
        console.error("Autosave error:", error);
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, storageKey, debounceMs, enabled]);

  // Clear autosave (call on successful submit)
  const clearAutosave = useCallback(() => {
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return { clearAutosave };
}
