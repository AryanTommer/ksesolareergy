"use client";

import { useState } from "react";
import { FaPlus, FaTrash, FaGripVertical, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FAQ } from "@/lib/validation/service";

interface FAQEditorProps {
  value: FAQ[];
  onChange: (faqs: FAQ[]) => void;
  maxItems?: number;
}

export function FAQEditor({ value, onChange, maxItems = 15 }: FAQEditorProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addFAQ = () => {
    if (value.length >= maxItems) return;
    onChange([...value, { question: "", answer: "" }]);
    setExpandedIndex(value.length);
  };

  const updateFAQ = (index: number, field: keyof FAQ, newValue: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  const removeFAQ = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(null);
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
      {value.map((faq, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`bg-slate-50 rounded-xl border border-slate-200 overflow-hidden ${
            dragIndex === index ? "opacity-50" : ""
          }`}
        >
          <div className="flex items-center gap-3 p-3">
            <div className="cursor-grab text-slate-400 hover:text-slate-600">
              <FaGripVertical />
            </div>

            <button
              type="button"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="flex-1 text-left font-medium text-slate-700 truncate"
            >
              {faq.question || "New Question..."}
            </button>

            <button
              type="button"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="p-1 text-slate-400"
            >
              {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            <button
              type="button"
              onClick={() => removeFAQ(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove FAQ"
            >
              <FaTrash />
            </button>
          </div>

          {expandedIndex === index && (
            <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-200">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFAQ(index, "question", e.target.value)}
                  placeholder="Enter question..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  maxLength={200}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Answer
                </label>
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                  placeholder="Enter answer..."
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  maxLength={1000}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {value.length < maxItems && (
        <button
          type="button"
          onClick={addFAQ}
          className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <FaPlus /> Add FAQ
        </button>
      )}
    </div>
  );
}
