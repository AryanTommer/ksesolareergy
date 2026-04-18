import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaCalendarWeek,
} from "react-icons/fa";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const dynamic = "force-dynamic";

async function getStats() {
  const [total, pending, contacted, thisWeek] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { status: "pending" } }),
    prisma.application.count({ where: { status: "contacted" } }),
    prisma.application.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);
  return { total, pending, contacted, thisWeek };
}

async function getRecentApplications() {
  return prisma.application.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentApplications = await getRecentApplications();

  const statCards = [
    {
      label: "कुल आवेदन",
      value: stats.total,
      icon: FaClipboardList,
      color: "bg-blue-500",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: FaClock,
      color: "bg-yellow-500",
    },
    {
      label: "Contacted",
      value: stats.contacted,
      icon: FaCheckCircle,
      color: "bg-emerald-500",
    },
    {
      label: "इस सप्ताह",
      value: stats.thisWeek,
      icon: FaCalendarWeek,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl lg:text-3xl font-black text-slate-800">
        डैशबोर्ड
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div
              className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}
            >
              <stat.icon className="text-white text-xl" />
            </div>
            <p className="text-3xl font-black text-slate-800">{stat.value}</p>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">हाल के आवेदन</h2>
          <Link
            href="/admin/applications"
            className="text-saffron-600 font-semibold hover:underline"
          >
            सभी देखें →
          </Link>
        </div>

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
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  तारीख
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    कोई आवेदन नहीं मिला
                  </td>
                </tr>
              ) : (
                recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {app.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{app.mobile}</td>
                    <td className="px-6 py-4 text-slate-600">{app.district}</td>
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
      </div>
    </div>
  );
}

