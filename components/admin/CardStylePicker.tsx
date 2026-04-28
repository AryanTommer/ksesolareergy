"use client";

import { CardStyle } from "@/lib/validation/product";

interface CardStylePickerProps {
  value: CardStyle;
  onChange: (value: CardStyle) => void;
}

const cardStyles: { value: CardStyle; label: string; description: string; preview: string }[] = [
  {
    value: "featured",
    label: "Featured",
    description: "2 columns, image on right",
    preview: "bg-gradient-to-r from-emerald-100 to-emerald-50",
  },
  {
    value: "standard",
    label: "Standard",
    description: "1 column, compact card",
    preview: "bg-white",
  },
  {
    value: "highlight",
    label: "Highlight",
    description: "1 column, dark theme",
    preview: "bg-slate-900",
  },
  {
    value: "showcase",
    label: "Showcase",
    description: "2 columns, centered icon",
    preview: "bg-gradient-to-br from-saffron-50 to-white",
  },
];

export function CardStylePicker({ value, onChange }: CardStylePickerProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cardStyles.map((style) => (
        <button
          key={style.value}
          type="button"
          onClick={() => onChange(style.value)}
          className={`p-4 rounded-xl border-2 transition-all text-left ${
            value === style.value
              ? "border-emerald-500 ring-2 ring-emerald-100"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div
            className={`h-16 rounded-lg mb-3 ${style.preview} ${
              style.value === "highlight" ? "" : "border border-slate-200"
            }`}
          />
          <div className="font-medium text-slate-800">{style.label}</div>
          <div className="text-xs text-slate-500">{style.description}</div>
        </button>
      ))}
    </div>
  );
}
