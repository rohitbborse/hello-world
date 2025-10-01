import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, CheckCircle, Clock, DollarSign, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";
import TCOChart from "@/components/TCOChart";
import TCODataTable from "@/components/TCODataTable";
import WorklistCard from "@/components/WorklistCard";
import TCOWizardDialog from "@/components/TCOWizardDialog";

export default function Dashboard() {
  const [wizardOpen, setWizardOpen] = useState(false);

  // Mock data - TODO: remove mock functionality
  const mockChartData = [
    { year: 1, acquisition: 2450000, energy: 120000, maintenance: 85000, retrofits: 0, total: 2655000 },
    { year: 2, acquisition: 0, energy: 125000, maintenance: 90000, retrofits: 0, total: 215000 },
    { year: 3, acquisition: 0, energy: 130000, maintenance: 95000, retrofits: 150000, total: 375000 },
    { year: 4, acquisition: 0, energy: 135000, maintenance: 100000, retrofits: 0, total: 235000 },
    { year: 5, acquisition: 0, energy: 140000, maintenance: 105000, retrofits: 200000, total: 445000 },
  ];

  const mockTableData = [
    { id: "TCO-001", version: 1, terminal: "APM Terminals Rotterdam", equipmentType: "Quay Crane", oem: "ZPMC", model: "QC-400", tcoValue: 2450000, status: "published" as const, creator: "John Smith", date: "2024-01-15" },
    { id: "TCO-002", version: 2, terminal: "Maersk Newark", equipmentType: "RTG", oem: "Konecranes", model: "RTG-E", tcoValue: 1850000, status: "pending_approval" as const, creator: "Sarah Chen", date: "2024-02-20" },
    { id: "TCO-003", version: 1, terminal: "APM Terminals LA", equipmentType: "Ship-to-Shore", oem: "Liebherr", model: "STS-600", tcoValue: 3200000, status: "approved" as const, creator: "Mike Johnson", date: "2024-03-05" },
  ];

  const mockWorklistItems = [
    {
      id: "1",
      tcoId: "TCO-005",
      assetType: "Quay Crane",
      terminal: "APM Terminals Mumbai",
      requestor: "Raj Patel",
      submittedDate: "2024-03-18",
      slaHoursLeft: 18,
      status: "pending_approval" as const,
    },
    {
      id: "2",
      tcoId: "TCO-006",
      assetType: "RTG",
      terminal: "Maersk Singapore",
      requestor: "Li Wei",
      submittedDate: "2024-03-15",
      slaHoursLeft: 96,
      status: "pending_clarification" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">TCO Dashboard</h1>
          <p className="text-muted-foreground mt-1">Total Cost of Ownership Analysis</p>
        </div>
        <Button onClick={() => setWizardOpen(true)} size="lg" data-testid="button-create-tco">
          <Plus className="mr-2 h-5 w-5" />
          Create New TCO Analysis
        </Button>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TCOChart data={mockChartData} type="area" title="TCO Cost Breakdown - Year by Year" />
        </div>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">This Month</span>
                <span className="font-semibold">12 TCO Created</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg. Approval Time</span>
                <span className="font-semibold">4.2 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Auto-Approvals</span>
                <span className="font-semibold">3 this week</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Top Terminals</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>APM Rotterdam</span>
                  <span className="text-muted-foreground">24 TCO</span>
                </div>
                <div className="flex justify-between">
                  <span>Maersk Newark</span>
                  <span className="text-muted-foreground">18 TCO</span>
                </div>
                <div className="flex justify-between">
                  <span>Hamburg Terminal</span>
                  <span className="text-muted-foreground">15 TCO</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Worklist Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockWorklistItems.slice(0, 2).map((item) => (
            <WorklistCard
              key={item.id}
              item={item}
              onApprove={(id) => console.log('Approve:', id)}
              onRequestClarification={(id) => console.log('Request clarification:', id)}
              onView={(id) => console.log('View:', id)}
            />
          ))}
          <Button variant="outline" className="w-full" data-testid="button-view-all-worklist">
            View All Worklist Items
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent TCO Records</CardTitle>
        </CardHeader>
        <CardContent>
          <TCODataTable
            data={mockTableData}
            onEdit={(id) => console.log('Edit:', id)}
            onCopy={(id) => console.log('Copy:', id)}
            onDelete={(id) => console.log('Delete:', id)}
          />
        </CardContent>
      </Card>

      <TCOWizardDialog
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        onComplete={(data) => console.log('TCO Created:', data)}
      />
    </div>
  );
}
