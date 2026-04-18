"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface Application {
  id: string;
  name: string;
  mobile: string;
  district: string;
  roofType: string;
  status: string;
  createdAt: string;
}

interface ApiResponse {
  applications: Application[];
  total: number;
  page: number;
  totalPages: number;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function ApplicationsList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const debouncedSearch = useDebounce(search, 300);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (status !== "all") params.append("status", status);
      if (debouncedSearch) params.append("search", debouncedSearch);

      const res = await fetch(`/api/applications?${params}`);
      const data: ApiResponse = await res.json();

      setApplications(data.applications);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, page]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-black text-slate-800">
        आवेदन सूची
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="नाम, मोबाइल या ज़िला खोजें..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20"
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-saffron-500 bg-white"
        >
          <option value="all">सभी Status</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500">
        कुल {total} आवेदन मिले
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  नाम
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  मोबाइल
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  ज़िला
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  छत
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  तारीख
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="animate-pulse text-slate-400">
                      लोड हो रहा है...
                    </div>
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    कोई आवेदन नहीं मिला
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="font-medium text-saffron-600 hover:underline"
                      >
                        {app.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{app.mobile}</td>
                    <td className="px-6 py-4 text-slate-600">{app.district}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {app.roofType}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {new Date(app.createdAt).toLocaleDateString("hi-IN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft /> पिछला
            </button>
            <span className="text-sm text-slate-500">
              पेज {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              अगला <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

