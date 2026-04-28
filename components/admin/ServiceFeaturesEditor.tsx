"use client";

import { useState } from "react";
import { FaPlus, FaTrash, FaGripVertical } from "react-icons/fa";
import { ServiceFeature } from "@/lib/validation/service";

interface ServiceFeaturesEditorProps {
  value: ServiceFeature[];
  onChange: (features: ServiceFeature[]) => void;
  maxItems?: number;
}

export function ServiceFeaturesEditor({ value, onChange, maxItems = 10 }: ServiceFeaturesEditorProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const addFeature = () => {
    if (value.length >= maxItems) return;
    onChange([...value, { title: "", description: "" }]);
  };

  const updateFeature = (index: number, field: keyof ServiceFeature, newValue: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
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
    <div className="space-y-3">
      {value.map((feature, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`p-4 bg-slate-50 rounded-xl border border-slate-200 ${
            dragIndex === index ? "opacity-50" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="cursor-grab text-slate-400 hover:text-slate-600 pt-2">
              <FaGripVertical />
            </div>

            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={feature.title}
                onChange={(e) => updateFeature(index, "title", e.target.value)}
                placeholder="Feature title"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
                maxLength={100}
              />
              <textarea
                value={feature.description || ""}
                onChange={(e) => updateFeature(index, "description", e.target.value)}
                placeholder="Feature description (optional)"
                rows={2}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-sm"
                maxLength={300}
              />
            </div>

            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove feature"
            >
              <FaTrash />
            </button>
          </div>
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
