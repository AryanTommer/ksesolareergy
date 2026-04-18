"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaSave,
  FaSpinner,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaHome,
  FaIdCard,
  FaCalendar,
  FaTrash,
} from "react-icons/fa";

interface Application {
  id: string;
  name: string;
  mobile: string;
  district: string;
  roofType: string;
  consumerId: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ApplicationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const res = await fetch(`/api/applications/${id}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setApplication(data);
      setStatus(data.status);
      setNotes(data.notes || "");
    } catch {
      router.push("/admin/applications");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });

      if (res.ok) {
        setMessage("सफलतापूर्वक सेव हो गया!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch {
      setMessage("सेव करने में त्रुटि");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/admin/applications");
      } else {
        setMessage("डिलीट करने में त्रुटि");
        setShowDeleteConfirm(false);
      }
    } catch {
      setMessage("डिलीट करने में त्रुटि");
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-3xl text-saffron-500" />
      </div>
    );
  }

  if (!application) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/applications"
          className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <FaArrowLeft className="text-slate-600" />
        </Link>
        <h1 className="text-2xl lg:text-3xl font-black text-slate-800">
          आवेदन विवरण
        </h1>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl font-medium ${message.includes("त्रुटि") ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}
        >
          {message}
        </div>
      )}

      {/* Application Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          आवेदक की जानकारी
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-saffron-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaUser className="text-saffron-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">नाम</p>
              <p className="font-bold text-slate-800">{application.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaPhone className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">मोबाइल</p>
              <p className="font-bold text-slate-800">{application.mobile}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">ज़िला</p>
              <p className="font-bold text-slate-800">{application.district}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaHome className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">छत का प्रकार</p>
              <p className="font-bold text-slate-800">{application.roofType}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaIdCard className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">उपभोक्ता संख्या</p>
              <p className="font-bold text-slate-800">
                {application.consumerId || "उपलब्ध नहीं"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaCalendar className="text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">आवेदन तिथि</p>
              <p className="font-bold text-slate-800">
                {new Date(application.createdAt).toLocaleDateString("hi-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status & Notes Update */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Status अपडेट करें
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 bg-white"
            >
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              नोट्स
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="कोई नोट्स जोड़ें..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-saffron-500 to-saffron-600 hover:shadow-lg hover:shadow-saffron-500/30 transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <FaSpinner className="animate-spin" /> सेव हो रहा है...
                </>
              ) : (
                <>
                  <FaSave /> सेव करें
                </>
              )}
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-red-600 border-2 border-red-200 hover:bg-red-50 transition-all"
            >
              <FaTrash /> डिलीट करें
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              क्या आप वाकई डिलीट करना चाहते हैं?
            </h3>
            <p className="text-slate-600 mb-6">
              यह क्रिया पूर्ववत नहीं की जा सकती। आवेदन स्थायी रूप से हटा दिया जाएगा।
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 px-4 py-3 rounded-xl font-bold border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50"
              >
                रद्द करें
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <FaSpinner className="animate-spin" /> डिलीट हो रहा है...
                  </>
                ) : (
                  "हाँ, डिलीट करें"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
