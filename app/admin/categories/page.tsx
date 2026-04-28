"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaSpinner,
  FaGripVertical,
} from "react-icons/fa";
import { slugify } from "@/lib/sanitize";

interface Category {
  id: string;
  name: string;
  nameEn: string | null;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string;
  order: number;
  isActive: boolean;
  _count: { products: number };
}

const colorOptions = ["emerald", "saffron", "blue", "slate", "rose", "purple"];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    slug: "",
    description: "",
    icon: "",
    color: "emerald",
  });

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/categories");
      const data = await response.json();
      setCategories(data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const resetForm = () => {
    setFormData({
      name: "",
      nameEn: "",
      slug: "",
      description: "",
      icon: "",
      color: "emerald",
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      nameEn: category.nameEn || "",
      slug: category.slug,
      description: category.description || "",
      icon: category.icon || "",
      color: category.color,
    });
    setEditingId(category.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.slug) return;

    setSaving(true);
    try {
      const url = editingId
        ? `/api/admin/categories/${editingId}`
        : "/api/admin/categories";
      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save");

      await fetchCategories();
      resetForm();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, productCount: number) => {
    if (productCount > 0) {
      alert(`Cannot delete category with ${productCount} products. Remove products first.`);
      return;
    }

    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      setCategories(categories.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const updated = [...categories];
    const item = updated.splice(dragIndex, 1)[0];
    updated.splice(index, 0, item);
    setCategories(updated);
    setDragIndex(index);
  };

  const handleDragEnd = async () => {
    setDragIndex(null);
    const items = categories.map((c, i) => ({ id: c.id, order: i }));
    try {
      await fetch("/api/admin/categories/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
    } catch (error) {
      console.error("Reorder error:", error);
      fetchCategories();
    }
  };

  const colorBg = (color: string) => {
    const colors: Record<string, string> = {
      emerald: "bg-emerald-100 text-emerald-700",
      saffron: "bg-saffron-100 text-saffron-700",
      blue: "bg-blue-100 text-blue-700",
      slate: "bg-slate-100 text-slate-700",
      rose: "bg-rose-100 text-rose-700",
      purple: "bg-purple-100 text-purple-700",
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">श्रेणी प्रबंधन</h1>
          <p className="text-slate-600">Manage product categories</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors"
          >
            <FaPlus /> नई श्रेणी
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            {editingId ? "Edit Category" : "Add New Category"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name (Hindi) *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    slug: isAdding ? slugify(e.target.value) : formData.slug,
                  });
                }}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name (English)
              </label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Icon (emoji)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., ☀️"
                maxLength={4}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Color
            </label>
            <div className="flex gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    formData.color === color ? "ring-2 ring-offset-2 ring-slate-400" : ""
                  }`}
                  style={{
                    backgroundColor:
                      color === "emerald" ? "#10b981" :
                      color === "saffron" ? "#f59e0b" :
                      color === "blue" ? "#3b82f6" :
                      color === "slate" ? "#64748b" :
                      color === "rose" ? "#f43f5e" :
                      "#a855f7",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none"
              rows={2}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !formData.name || !formData.slug}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
              Save
            </button>
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <FaSpinner className="animate-spin text-3xl text-emerald-500 mx-auto mb-4" />
            <p className="text-slate-600">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-600 mb-4">No categories found</p>
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:underline"
            >
              <FaPlus /> Add your first category
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {categories.map((category, index) => (
              <div
                key={category.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors ${
                  dragIndex === index ? "opacity-50" : ""
                }`}
              >
                <div className="cursor-grab text-slate-400 hover:text-slate-600">
                  <FaGripVertical />
                </div>

                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-slate-50 border border-slate-100">
                  {category.icon || "📦"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800">{category.name}</h3>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${colorBg(category.color)}`}>
                      {category.color}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    {category._count.products} products • /{category.slug}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id, category._count.products)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
