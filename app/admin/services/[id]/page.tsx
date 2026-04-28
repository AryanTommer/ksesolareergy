"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaArrowLeft, FaSpinner, FaTrash } from "react-icons/fa";
import {
  RichTextEditor,
  ImageUploader,
  ServiceFeaturesEditor,
  ProcessEditor,
  FAQEditor,
} from "@/components/admin";
import { ServiceFeature, ProcessStep, FAQ } from "@/lib/validation/service";

const iconOptions = ["🔧", "⚡", "🏠", "📋", "💡", "🛠️", "📊", "🔌", "☀️", "🔋"];
const colorOptions = ["saffron", "emerald", "blue", "slate", "rose", "purple"];

export default function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    slug: "",
    tagline: "",
    description: "",
    excerpt: "",
    icon: "⚡",
    iconColor: "saffron",
    image: null as { url: string; width?: number; height?: number; blurDataUrl?: string } | null,
    imageAlt: "",
    features: [] as ServiceFeature[],
    process: [] as ProcessStep[],
    faqs: [] as FAQ[],
    priceDisplay: "",
    ctaText: "",
    ctaLink: "",
    status: "draft",
    isFeatured: false,
  });

  useEffect(() => {
    fetch(`/api/admin/services/${id}`)
      .then((res) => res.json())
      .then((service) => {
        setFormData({
          title: service.title || "",
          titleEn: service.titleEn || "",
          slug: service.slug || "",
          tagline: service.tagline || "",
          description: service.description || "",
          excerpt: service.excerpt || "",
          icon: service.icon || "⚡",
          iconColor: service.iconColor || "saffron",
          image: service.image
            ? {
                url: service.image,
                width: service.imageWidth,
                height: service.imageHeight,
                blurDataUrl: service.blurDataUrl,
              }
            : null,
          imageAlt: service.imageAlt || "",
          features: service.features || [],
          process: service.process || [],
          faqs: service.faqs || [],
          priceDisplay: service.priceDisplay || "",
          ctaText: service.ctaText || "",
          ctaLink: service.ctaLink || "",
          status: service.status || "draft",
          isFeatured: service.isFeatured || false,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load service:", error);
        router.push("/admin/services");
      });
  }, [id, router]);

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
      };

      const response = await fetch(`/api/admin/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update service");
      }

      router.push("/admin/services");
    } catch (error) {
      console.error("Save error:", error);
      alert(error instanceof Error ? error.message : "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      router.push("/admin/services");
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-3xl text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800">सेवा संपादित करें</h1>
            <p className="text-slate-600">Edit service details</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <FaTrash /> Delete
        </button>
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
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Short catchy tagline"
                maxLength={200}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description *
            </label>
            <RichTextEditor
              content={formData.description}
              onChange={(html) => setFormData({ ...formData, description: html })}
              placeholder="Enter service description..."
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Icon & Image</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Icon *
              </label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`w-12 h-12 text-2xl rounded-xl border-2 transition-all ${
                      formData.icon === icon
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Icon Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, iconColor: color })}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      formData.iconColor === color
                        ? "ring-2 ring-offset-2 ring-slate-400"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        color === "saffron" ? "#f59e0b" :
                        color === "emerald" ? "#10b981" :
                        color === "blue" ? "#3b82f6" :
                        color === "slate" ? "#64748b" :
                        color === "rose" ? "#f43f5e" :
                        "#a855f7",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Featured Image
            </label>
            <ImageUploader
              value={formData.image}
              onChange={(data) => setFormData({ ...formData, image: data })}
              folder="services"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Service Features</h2>
          <ServiceFeaturesEditor
            value={formData.features}
            onChange={(features) => setFormData({ ...formData, features })}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Process Steps</h2>
          <ProcessEditor
            value={formData.process}
            onChange={(process) => setFormData({ ...formData, process })}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">FAQs</h2>
          <FAQEditor
            value={formData.faqs}
            onChange={(faqs) => setFormData({ ...formData, faqs })}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Pricing & CTA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price Display
              </label>
              <input
                type="text"
                value={formData.priceDisplay}
                onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Free consultation"
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
                placeholder="e.g., Get Started"
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
                Featured Service
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
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
