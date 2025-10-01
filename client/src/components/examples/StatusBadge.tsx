import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="draft" />
      <StatusBadge status="pending_approval" />
      <StatusBadge status="approved" />
      <StatusBadge status="published" />
      <StatusBadge status="retired" />
      <StatusBadge status="pending_clarification" />
    </div>
  );
}
