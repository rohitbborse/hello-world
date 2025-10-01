import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "draft" | "pending_approval" | "approved" | "published" | "retired" | "pending_clarification";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    draft: { label: "Draft", className: "bg-status-draft text-white" },
    pending_approval: { label: "Pending Approval", className: "bg-status-pending text-white" },
    approved: { label: "Approved", className: "bg-status-approved text-white" },
    published: { label: "Published", className: "bg-status-published text-white" },
    retired: { label: "Retired", className: "bg-status-retired text-white" },
    pending_clarification: { label: "Pending Clarification", className: "bg-status-clarification text-white" },
  };

  const config = statusConfig[status];

  return (
    <Badge className={config.className} data-testid={`badge-status-${status}`}>
      {config.label}
    </Badge>
  );
}
