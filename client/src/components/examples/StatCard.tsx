import StatCard from '../StatCard';
import { FileText, CheckCircle, Clock, DollarSign } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total TCO Records"
        value={156}
        icon={FileText}
        trend={{ value: "12%", isPositive: true }}
      />
      <StatCard
        title="Active Golden Records"
        value={42}
        icon={CheckCircle}
        subtitle="Published versions"
      />
      <StatCard
        title="Pending Approvals"
        value={8}
        icon={Clock}
        trend={{ value: "3", isPositive: false }}
      />
      <StatCard
        title="Avg. TCO Value"
        value="$2.4M"
        icon={DollarSign}
      />
    </div>
  );
}
