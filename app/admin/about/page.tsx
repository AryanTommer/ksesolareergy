"use client";

import { useState, useEffect, useCallback } from "react";
import { FaSave, FaSpinner, FaChevronDown, FaChevronUp, FaPlus, FaTrash } from "react-icons/fa";
import { RichTextEditor, ImageUploader } from "@/components/admin";
import { Stat, Value } from "@/lib/validation/about";
import { useAutosave } from "@/hooks/useAutosave";

interface AboutPageData {
  heroEnabled: boolean;
  heroTagline: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage: string | null;
  heroImageAlt: string;
  statsEnabled: boolean;
  statsTitle: string;
  stats: Stat[];
  missionEnabled: boolean;
  missionTitle: string;
  missionContent: string;
  missionImage: string | null;
  missionImageAlt: string;
  valuesEnabled: boolean;
  valuesTitle: string;
  valuesSubtitle: string;
  values: Value[];
  teamEnabled: boolean;
  teamTitle: string;
  teamSubtitle: string;
  ctaEnabled: boolean;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  metaTitle: string;
  metaDescription: string;
}

const defaultData: AboutPageData = {
  heroEnabled: true,
  heroTagline: "",
  heroTitle: "",
  heroHighlight: "",
  heroDescription: "",
  heroImage: null,
  heroImageAlt: "",
  statsEnabled: true,
  statsTitle: "",
  stats: [],
  missionEnabled: true,
  missionTitle: "",
  missionContent: "",
  missionImage: null,
  missionImageAlt: "",
  valuesEnabled: true,
  valuesTitle: "",
  valuesSubtitle: "",
  values: [],
  teamEnabled: false,
  teamTitle: "",
  teamSubtitle: "",
  ctaEnabled: true,
  ctaTitle: "",
  ctaDescription: "",
  ctaButtonText: "",
  ctaButtonLink: "",
  metaTitle: "",
  metaDescription: "",
};

const colorOptions = ["saffron", "emerald", "blue", "slate"] as const;

export default function AboutEditorPage() {
  const [data, setData] = useState<AboutPageData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    hero: true,
    stats: false,
    mission: false,
    values: false,
    team: false,
    cta: false,
  });

  const handleRestore = useCallback((restored: AboutPageData) => {
    setData(restored);
  }, []);

  const { clearAutosave } = useAutosave({
    key: "about-page",
    data,
    onRestore: handleRestore,
    enabled: !loading,
  });

  useEffect(() => {
    fetch("/api/admin/about")
      .then((res) => res.json())
      .then((pageData) => {
        setData({
          ...defaultData,
          ...pageData,
          stats: pageData.stats || [],
          values: pageData.values || [],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load about page:", error);
        setLoading(false);
      });
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/about", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      clearAutosave();
      setMessage("सफलतापूर्वक सेव हो गया!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Save error:", error);
      setMessage("सेव करने में त्रुटि");
    } finally {
      setSaving(false);
    }
  };

  const addStat = () => {
    setData({
      ...data,
      stats: [...data.stats, { value: "", label: "", suffix: "" }],
    });
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const updated = [...data.stats];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, stats: updated });
  };

  const removeStat = (index: number) => {
    setData({ ...data, stats: data.stats.filter((_, i) => i !== index) });
  };

  const addValue = () => {
    setData({
      ...data,
      values: [...data.values, { title: "", description: "", icon: "⭐", color: "saffron" }],
    });
  };

  const updateValue = (index: number, field: keyof Value, value: string) => {
    const updated = [...data.values];
    updated[index] = { ...updated[index], [field]: value } as Value;
    setData({ ...data, values: updated });
  };

  const removeValue = (index: number) => {
    setData({ ...data, values: data.values.filter((_, i) => i !== index) });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-3xl text-emerald-500" />
      </div>
    );
  }

  const SectionHeader = ({
    title,
    section,
    enabled,
    onToggle,
  }: {
    title: string;
    section: string;
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <div
      className="flex items-center justify-between p-4 cursor-pointer"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={onToggle}
            className="w-4 h-4 text-emerald-500 rounded"
          />
        </label>
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        {!enabled && <span className="text-xs text-slate-400">(Disabled)</span>}
      </div>
      {expandedSections[section] ? <FaChevronUp /> : <FaChevronDown />}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">About Page Editor</h1>
          <p className="text-slate-600">Manage your about page sections</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
        >
          {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-xl font-medium ${
            message.includes("त्रुटि") ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-4">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <SectionHeader
            title="Hero Section"
            section="hero"
            enabled={data.heroEnabled}
            onToggle={() => setData({ ...data, heroEnabled: !data.heroEnabled })}
          />
          {expandedSections.hero && (
            <div className="p-6 pt-0 space-y-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={data.heroTagline}
                    onChange={(e) => setData({ ...data, heroTagline: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                    maxLength={50}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Highlight Text</label>
                  <input
                    type="text"
                    value={data.heroHighlight}
                    onChange={(e) => setData({ ...data, heroHighlight: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                    maxLength={50}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={data.heroTitle}
                  onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <RichTextEditor
                  content={data.heroDescription}
                  onChange={(html) => setData({ ...data, heroDescription: html })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hero Image</label>
                <ImageUploader
                  value={data.heroImage ? { url: data.heroImage } : null}
                  onChange={(img) => setData({ ...data, heroImage: img?.url || null })}
                  folder="about"
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <SectionHeader
            title="Stats Section"
            section="stats"
            enabled={data.statsEnabled}
            onToggle={() => setData({ ...data, statsEnabled: !data.statsEnabled })}
          />
          {expandedSections.stats && (
            <div className="p-6 pt-0 space-y-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={data.statsTitle}
                  onChange={(e) => setData({ ...data, statsTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="space-y-3">
                {data.stats.map((stat, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => updateStat(index, "value", e.target.value)}
                      placeholder="Value (e.g., 500)"
                      className="w-24 px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={stat.suffix || ""}
                      onChange={(e) => updateStat(index, "suffix", e.target.value)}
                      placeholder="Suffix (+, %)"
                      className="w-16 px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(index, "label", e.target.value)}
                      placeholder="Label"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <button onClick={() => removeStat(index)} className="p-2 text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button onClick={addStat} className="flex items-center gap-2 text-emerald-600">
                  <FaPlus /> Add Stat
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <SectionHeader
            title="Mission Section"
            section="mission"
            enabled={data.missionEnabled}
            onToggle={() => setData({ ...data, missionEnabled: !data.missionEnabled })}
          />
          {expandedSections.mission && (
            <div className="p-6 pt-0 space-y-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={data.missionTitle}
                  onChange={(e) => setData({ ...data, missionTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                <RichTextEditor
                  content={data.missionContent}
                  onChange={(html) => setData({ ...data, missionContent: html })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image</label>
                <ImageUploader
                  value={data.missionImage ? { url: data.missionImage } : null}
                  onChange={(img) => setData({ ...data, missionImage: img?.url || null })}
                  folder="about"
                />
              </div>
            </div>
          )}
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <SectionHeader
            title="Values Section"
            section="values"
            enabled={data.valuesEnabled}
            onToggle={() => setData({ ...data, valuesEnabled: !data.valuesEnabled })}
          />
          {expandedSections.values && (
            <div className="p-6 pt-0 space-y-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={data.valuesTitle}
                    onChange={(e) => setData({ ...data, valuesTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={data.valuesSubtitle}
                    onChange={(e) => setData({ ...data, valuesSubtitle: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {data.values.map((value, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg space-y-3">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={value.icon}
                        onChange={(e) => updateValue(index, "icon", e.target.value)}
                        className="w-16 px-3 py-2 border border-slate-300 rounded-lg text-center text-xl"
                        maxLength={2}
                      />
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => updateValue(index, "title", e.target.value)}
                        placeholder="Value title"
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg font-medium"
                      />
                      <select
                        value={value.color}
                        onChange={(e) => updateValue(index, "color", e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                      >
                        {colorOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <button onClick={() => removeValue(index)} className="p-2 text-red-500">
                        <FaTrash />
                      </button>
                    </div>
                    <textarea
                      value={value.description}
                      onChange={(e) => updateValue(index, "description", e.target.value)}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-none"
                    />
                  </div>
                ))}
                <button onClick={addValue} className="flex items-center gap-2 text-emerald-600">
                  <FaPlus /> Add Value
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <SectionHeader
            title="Team Section"
            section="team"
            enabled={data.teamEnabled}
            onToggle={() => setData({ ...data, teamEnabled: !data.teamEnabled })}
          />
          {expandedSections.team && (
            <div className="p-6 pt-0 space-y-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={data.teamTitle}
                    onChange={(e) => setData({ ...data, teamTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={data.teamSubtitle}
                    onChange={(e) => setData({ ...data, teamSubtitle: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
              <p className="text-sm text-slate-500">
                Team members are managed separately. Enable this section to display them on the About page.
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <SectionHeader
            title="CTA Section"
            section="cta"
            enabled={data.ctaEnabled}
            onToggle={() => setData({ ...data, ctaEnabled: !data.ctaEnabled })}
          />
          {expandedSections.cta && (
            <div className="p-6 pt-0 space-y-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={data.ctaTitle}
                  onChange={(e) => setData({ ...data, ctaTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={data.ctaDescription}
                  onChange={(e) => setData({ ...data, ctaDescription: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={data.ctaButtonText}
                    onChange={(e) => setData({ ...data, ctaButtonText: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={data.ctaButtonLink}
                    onChange={(e) => setData({ ...data, ctaButtonLink: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SEO Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Meta Title <span className="text-slate-400">(max 60 chars)</span>
              </label>
              <input
                type="text"
                value={data.metaTitle}
                onChange={(e) => setData({ ...data, metaTitle: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                placeholder="Custom title for search engines"
                maxLength={60}
              />
              <p className="text-xs text-slate-400 mt-1">{data.metaTitle.length}/60</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Meta Description <span className="text-slate-400">(max 160 chars)</span>
              </label>
              <textarea
                value={data.metaDescription}
                onChange={(e) => setData({ ...data, metaDescription: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg resize-none"
                placeholder="Custom description for search engines"
                maxLength={160}
                rows={2}
              />
              <p className="text-xs text-slate-400 mt-1">{data.metaDescription.length}/160</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
