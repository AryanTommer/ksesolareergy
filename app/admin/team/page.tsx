"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaSpinner,
  FaGripVertical,
} from "react-icons/fa";
import { ImageUploader } from "@/components/admin";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image: string | null;
  imageAlt: string | null;
  blurDataUrl: string | null;
  linkedin: string | null;
  email: string | null;
  order: number;
  isActive: boolean;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: null as { url: string; blurDataUrl?: string } | null,
    imageAlt: "",
    linkedin: "",
    email: "",
  });

  const fetchMembers = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/team");
      const data = await response.json();
      setMembers(data || []);
    } catch (error) {
      console.error("Failed to fetch team:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: null,
      imageAlt: "",
      linkedin: "",
      email: "",
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || "",
      image: member.image ? { url: member.image, blurDataUrl: member.blurDataUrl || undefined } : null,
      imageAlt: member.imageAlt || "",
      linkedin: member.linkedin || "",
      email: member.email || "",
    });
    setEditingId(member.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role) return;

    setSaving(true);
    try {
      const url = editingId ? `/api/admin/team/${editingId}` : "/api/admin/team";
      const method = editingId ? "PATCH" : "POST";

      const payload = {
        ...formData,
        image: formData.image?.url || null,
        blurDataUrl: formData.image?.blurDataUrl || null,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save");

      await fetchMembers();
      resetForm();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save team member");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      setMembers(members.filter((m) => m.id !== id));
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

    const updated = [...members];
    const item = updated.splice(dragIndex, 1)[0];
    updated.splice(index, 0, item);
    setMembers(updated);
    setDragIndex(index);
  };

  const handleDragEnd = async () => {
    setDragIndex(null);
    const items = members.map((m, i) => ({ id: m.id, order: i }));
    try {
      await fetch("/api/admin/team/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
    } catch (error) {
      console.error("Reorder error:", error);
      fetchMembers();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">टीम प्रबंधन</h1>
          <p className="text-slate-600">Manage team members for About page</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors"
          >
            <FaPlus /> नया सदस्य
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            {editingId ? "Edit Team Member" : "Add New Team Member"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Role/Position *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none"
              rows={3}
              placeholder="Brief introduction about this team member..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Photo
            </label>
            <ImageUploader
              value={formData.image}
              onChange={(data) => setFormData({ ...formData, image: data })}
              folder="team"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !formData.name || !formData.role}
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
            <p className="text-slate-600">Loading team members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-600 mb-4">No team members found</p>
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:underline"
            >
              <FaPlus /> Add your first team member
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {members.map((member, index) => (
              <div
                key={member.id}
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

                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                      placeholder={member.blurDataUrl ? "blur" : "empty"}
                      blurDataURL={member.blurDataUrl || undefined}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-lg font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800">{member.name}</h3>
                  <p className="text-sm text-slate-500">{member.role}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
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
