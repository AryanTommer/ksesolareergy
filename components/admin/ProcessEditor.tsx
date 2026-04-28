"use client";

import { useState } from "react";
import { FaPlus, FaTrash, FaGripVertical } from "react-icons/fa";
import { ProcessStep } from "@/lib/validation/service";

interface ProcessEditorProps {
  value: ProcessStep[];
  onChange: (steps: ProcessStep[]) => void;
  maxItems?: number;
}

export function ProcessEditor({ value, onChange, maxItems = 8 }: ProcessEditorProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const addStep = () => {
    if (value.length >= maxItems) return;
    onChange([
      ...value,
      { step: value.length + 1, title: "", description: "" },
    ]);
  };

  const updateStep = (index: number, field: keyof ProcessStep, newValue: string | number) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  const removeStep = (index: number) => {
    const updated = value.filter((_, i) => i !== index).map((step, i) => ({
      ...step,
      step: i + 1,
    }));
    onChange(updated);
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
    onChange(updated.map((step, i) => ({ ...step, step: i + 1 })));
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  return (
    <div className="space-y-4">
      {value.map((step, index) => (
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

            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0">
              {step.step}
            </div>

            <div className="flex-1 space-y-3">
              <input
                type="text"
                value={step.title}
                onChange={(e) => updateStep(index, "title", e.target.value)}
                placeholder="Step title"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
                maxLength={100}
              />
              <textarea
                value={step.description}
                onChange={(e) => updateStep(index, "description", e.target.value)}
                placeholder="Step description"
                rows={2}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                maxLength={500}
              />
              <input
                type="text"
                value={step.duration || ""}
                onChange={(e) => updateStep(index, "duration", e.target.value)}
                placeholder="Duration (e.g., 2-3 days)"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                maxLength={50}
              />
            </div>

            <button
              type="button"
              onClick={() => removeStep(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove step"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {value.length < maxItems && (
        <button
          type="button"
          onClick={addStep}
          className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <FaPlus /> Add Step
        </button>
      )}
    </div>
  );
}
