"use client";

import { FaPlus, FaTrash } from "react-icons/fa";
import { Badge } from "@/lib/validation/product";

interface BadgeEditorProps {
  value: Badge[];
  onChange: (badges: Badge[]) => void;
  maxItems?: number;
}

const colorOptions: { value: Badge["color"]; label: string; className: string }[] = [
  { value: "emerald", label: "Green", className: "bg-emerald-100 text-emerald-700" },
  { value: "saffron", label: "Orange", className: "bg-saffron-100 text-saffron-700" },
  { value: "blue", label: "Blue", className: "bg-blue-100 text-blue-700" },
  { value: "slate", label: "Gray", className: "bg-slate-100 text-slate-700" },
];

export function BadgeEditor({ value, onChange, maxItems = 4 }: BadgeEditorProps) {
  const addBadge = () => {
    if (value.length >= maxItems) return;
    onChange([...value, { text: "", color: "emerald" }]);
  };

  const updateBadge = (index: number, field: keyof Badge, newValue: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  const removeBadge = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {value.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
        >
          <input
            type="text"
            value={badge.text}
            onChange={(e) => updateBadge(index, "text", e.target.value)}
            placeholder="Badge text"
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            maxLength={30}
          />

          <select
            value={badge.color}
            onChange={(e) => updateBadge(index, "color", e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              colorOptions.find((c) => c.value === badge.color)?.className || ""
            }`}
          >
            {badge.text || "Preview"}
          </div>

          <button
            type="button"
            onClick={() => removeBadge(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove badge"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      {value.length < maxItems && (
        <button
          type="button"
          onClick={addBadge}
          className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <FaPlus /> Add Badge
        </button>
      )}

      {value.length >= maxItems && (
        <p className="text-sm text-slate-500">Maximum {maxItems} badges reached</p>
      )}
    </div>
  );
}
