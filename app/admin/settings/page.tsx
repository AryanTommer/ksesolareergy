"use client";

import { useState, useEffect } from "react";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaSave,
  FaSpinner,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

interface Settings {
  phone: string;
  whatsapp: string;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    phone: "",
    whatsapp: "",
    email: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings({
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        youtube: data.youtube || "",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage("सेटिंग्स सफलतापूर्वक अपडेट हो गई!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      setMessage("सेव करने में त्रुटि");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-3xl text-saffron-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl lg:text-3xl font-black text-slate-800">
        साइट सेटिंग्स
      </h1>
      <p className="text-slate-500">
        यहाँ से आप वेबसाइट पर दिखने वाली संपर्क जानकारी अपडेट कर सकते हैं।
      </p>

      {message && (
        <div
          className={`p-4 rounded-xl font-medium ${message.includes("त्रुटि") ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}
        >
          {message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          संपर्क जानकारी
        </h2>

        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <FaPhone className="text-emerald-500" /> फ़ोन नंबर
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) =>
                setSettings({ ...settings, phone: e.target.value })
              }
              placeholder="1800-XXX-XXXX"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <FaWhatsapp className="text-green-500" /> WhatsApp नंबर
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp: e.target.value })
              }
              placeholder="+91 99999-99999"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <FaEnvelope className="text-saffron-500" /> ईमेल
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
              placeholder="info@suryagharup.in"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <FaFacebook className="text-blue-600" /> Facebook URL
            </label>
            <input
              type="url"
              value={settings.facebook}
              onChange={(e) =>
                setSettings({ ...settings, facebook: e.target.value })
              }
              placeholder="https://facebook.com/yourpage"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <FaInstagram className="text-pink-600" /> Instagram URL
            </label>
            <input
              type="url"
              value={settings.instagram}
              onChange={(e) =>
                setSettings({ ...settings, instagram: e.target.value })
              }
              placeholder="https://instagram.com/yourpage"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <FaYoutube className="text-red-600" /> YouTube Channel URL
            </label>
            <input
              type="url"
              value={settings.youtube}
              onChange={(e) =>
                setSettings({ ...settings, youtube: e.target.value })
              }
              placeholder="https://youtube.com/@yourchannel"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-saffron-500 to-saffron-600 hover:shadow-lg hover:shadow-saffron-500/30 transition-all disabled:opacity-50 w-full sm:w-auto"
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
        </div>
      </div>
    </div>
  );
}
