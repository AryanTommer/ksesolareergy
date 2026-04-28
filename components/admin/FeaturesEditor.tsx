"use client";

import { useState } from "react";
import { FaPlus, FaTrash, FaGripVertical } from "react-icons/fa";
import { Feature } from "@/lib/validation/product";

interface FeaturesEditorProps {
  value: Feature[];
  onChange: (features: Feature[]) => void;
  maxItems?: number;
}

export function FeaturesEditor({ value, onChange, maxItems = 15 }: FeaturesEditorProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const addFeature = () => {
    if (value.length >= maxItems) return;
    onChange([...value, { text: "" }]);
  };

  const updateFeature = (index: number, text: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], text };
    onChange(updated);
  };

  const removeFeature = (index: number) => {
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
    <div className="space-y-2">
      {value.map((feature, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200 ${
            dragIndex === index ? "opacity-50" : ""
          }`}
        >
          <div className="cursor-grab text-slate-400 hover:text-slate-600">
            <FaGripVertical />
          </div>

          <input
            type="text"
            value={feature.text}
            onChange={(e) => updateFeature(index, e.target.value)}
            placeholder="Feature description"
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            maxLength={200}
          />

          <button
            type="button"
            onClick={() => removeFeature(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove feature"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      {value.length < maxItems && (
        <button
          type="button"
          onClick={addFeature}
          className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <FaPlus /> Add Feature
        </button>
      )}
    </div>
  );
}
