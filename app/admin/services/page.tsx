"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaGripVertical,
  FaSearch,
  FaSpinner,
} from "react-icons/fa";

interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  iconColor: string;
  image: string | null;
  blurDataUrl: string | null;
  status: string;
  order: number;
  isFeatured: boolean;
  createdAt: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);

      const response = await fetch(`/api/admin/services?${params}`);
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      setServices(services.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const updated = [...services];
    const item = updated.splice(dragIndex, 1)[0];
    updated.splice(index, 0, item);
    setServices(updated);
    setDragIndex(index);
  };

  const handleDragEnd = async () => {
    setDragIndex(null);

    const items = services.map((s, i) => ({ id: s.id, order: i }));
    try {
      await fetch("/api/admin/services/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
    } catch (error) {
      console.error("Failed to reorder:", error);
      fetchServices();
    }
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      published: "bg-emerald-100 text-emerald-700",
      draft: "bg-slate-100 text-slate-700",
      archived: "bg-red-100 text-red-700",
    };
    return styles[status] || styles.draft;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">सेवाएं प्रबंधन</h1>
          <p className="text-slate-600">Manage your services</p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors"
        >
          <FaPlus /> नई सेवा
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <FaSpinner className="animate-spin text-3xl text-emerald-500 mx-auto mb-4" />
            <p className="text-slate-600">Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-600 mb-4">No services found</p>
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:underline"
            >
              <FaPlus /> Add your first service
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
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

                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-2xl">{service.icon}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 truncate">
                      {service.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${statusBadge(
                        service.status
                      )}`}
                    >
                      {service.status}
                    </span>
                    {service.isFeatured && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-saffron-100 text-saffron-700">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">/{service.slug}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/services/${service.id}`}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(service.id)}
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
