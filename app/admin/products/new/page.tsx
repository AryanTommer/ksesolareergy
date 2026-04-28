"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";
import {
  RichTextEditor,
  ImageUploader,
  CardStylePicker,
  SpecsEditor,
  BadgeEditor,
  FeaturesEditor,
} from "@/components/admin";
import { CardStyle, Badge, Spec, Feature } from "@/lib/validation/product";
import { slugify } from "@/lib/sanitize";
import { useAutosave } from "@/hooks/useAutosave";

interface Category {
  id: string;
  name: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [autoSlug, setAutoSlug] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    slug: "",
    subtitle: "",
    description: "",
    excerpt: "",
    cardStyle: "standard" as CardStyle,
    image: null as { url: string; width?: number; height?: number; blurDataUrl?: string } | null,
    imageAlt: "",
    badges: [] as Badge[],
    specs: [] as Spec[],
    features: [] as Feature[],
    priceDisplay: "",
    priceNote: "",
    ctaText: "",
    ctaLink: "",
    ctaStyle: "primary",
    categoryId: "",
    status: "draft",
    isFeatured: false,
    metaTitle: "",
    metaDescription: "",
  });

  const handleRestore = useCallback((restored: typeof formData) => {
    setFormData(restored);
    if (restored.slug) setAutoSlug(false);
  }, []);

  const { clearAutosave } = useAutosave({
    key: "product-new",
    data: formData,
    onRestore: handleRestore,
  });

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (autoSlug && formData.title) {
      setFormData((prev) => ({ ...prev, slug: slugify(formData.title) }));
    }
  }, [formData.title, autoSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        image: formData.image?.url || null,
        imageWidth: formData.image?.width,
        imageHeight: formData.image?.height,
        blurDataUrl: formData.image?.blurDataUrl,
        categoryId: formData.categoryId || null,
      };

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create product");
      }

      clearAutosave();
      router.push("/admin/products");
    } catch (error) {
      console.error("Save error:", error);
      alert(error instanceof Error ? error.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800">नया उत्पाद</h1>
          <p className="text-slate-600">Create a new product</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title (Hindi) *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title (English)
              </label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Slug *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setFormData({ ...formData, slug: e.target.value });
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setAutoSlug(true)}
                  className="px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg"
                >
                  Auto
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description *
            </label>
            <RichTextEditor
              content={formData.description}
              onChange={(html) => setFormData({ ...formData, description: html })}
              placeholder="Enter product description..."
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Card Style</h2>
          <CardStylePicker
            value={formData.cardStyle}
            onChange={(value) => setFormData({ ...formData, cardStyle: value })}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Image</h2>
          <ImageUploader
            value={formData.image}
            onChange={(data) => setFormData({ ...formData, image: data })}
            folder="products"
          />
          {formData.image && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                value={formData.imageAlt}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Describe the image for accessibility"
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Badges</h2>
          <BadgeEditor
            value={formData.badges}
            onChange={(badges) => setFormData({ ...formData, badges })}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Specifications</h2>
          <SpecsEditor
            value={formData.specs}
            onChange={(specs) => setFormData({ ...formData, specs })}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Features</h2>
          <FeaturesEditor
            value={formData.features}
            onChange={(features) => setFormData({ ...formData, features })}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Pricing & CTA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price Display
              </label>
              <input
                type="text"
                value={formData.priceDisplay}
                onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., ₹35,000/kW"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price Note
              </label>
              <input
                type="text"
                value={formData.priceNote}
                onChange={(e) => setFormData({ ...formData, priceNote: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., after subsidy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                CTA Text
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Get Quote"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                CTA Link
              </label>
              <input
                type="text"
                value={formData.ctaLink}
                onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., /contact"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Meta Title <span className="text-slate-400">(max 60 chars)</span>
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Custom title for search engines"
                maxLength={60}
              />
              <p className="text-xs text-slate-400 mt-1">{formData.metaTitle.length}/60</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Meta Description <span className="text-slate-400">(max 160 chars)</span>
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none"
                placeholder="Custom description for search engines"
                maxLength={160}
                rows={2}
              />
              <p className="text-xs text-slate-400 mt-1">{formData.metaDescription.length}/160</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Publishing</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700">
                Featured Product
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
