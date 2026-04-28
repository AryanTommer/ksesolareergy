"use client";

import { useState } from "react";
import { FaPlus, FaTrash, FaGripVertical } from "react-icons/fa";
import { Spec } from "@/lib/validation/product";

interface SpecsEditorProps {
  value: Spec[];
  onChange: (specs: Spec[]) => void;
  maxItems?: number;
}

export function SpecsEditor({ value, onChange, maxItems = 10 }: SpecsEditorProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const addSpec = () => {
    if (value.length >= maxItems) return;
    onChange([...value, { label: "", value: "" }]);
  };

  const updateSpec = (index: number, field: keyof Spec, newValue: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  const removeSpec = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const updated = [...value];
    const item = updated.splice(dragIndex, 1)[0];
    updated.splice(index, 0, item);
    onChange(updated);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  return (
    <div className="space-y-3">
      {value.map((spec, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 ${
            dragIndex === index ? "opacity-50" : ""
          }`}
        >
          <div className="cursor-grab text-slate-400 hover:text-slate-600">
            <FaGripVertical />
          </div>

          <div className="flex-1 grid grid-cols-2 gap-3">
            <input
              type="text"
              value={spec.label}
              onChange={(e) => updateSpec(index, "label", e.target.value)}
              placeholder="Label (e.g., Power)"
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              maxLength={50}
            />
            <input
              type="text"
              value={spec.value}
              onChange={(e) => updateSpec(index, "value", e.target.value)}
              placeholder="Value (e.g., 540W)"
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              maxLength={100}
            />
          </div>

          <button
            type="button"
            onClick={() => removeSpec(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove spec"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      {value.length < maxItems && (
        <button
          type="button"
          onClick={addSpec}
          className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <FaPlus /> Add Specification
        </button>
      )}

      {value.length >= maxItems && (
        <p className="text-sm text-slate-500">Maximum {maxItems} specifications reached</p>
      )}
    </div>
  );
}
