interface StatusBadgeProps {
  status: string;
}

const styles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
};

const labels: Record<string, string> = {
  pending: "Pending",
  contacted: "Contacted",
  approved: "Approved",
  rejected: "Rejected",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || styles.pending}`}
    >
      {labels[status] || status}
    </span>
  );
}
