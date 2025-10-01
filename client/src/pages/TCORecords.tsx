import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import TCOWizardDialog from "@/components/TCOWizardDialog";
import {
  Plus,
  Search,
  Filter,
  Download,
  Columns3,
  ArrowUpDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TCORecord {
  id: string;
  version: number;
  terminal: string;
  region: string;
  equipmentType: string;
  oem: string;
  model: string;
  technicalLife: number;
  assetCost: number;
  operatingCost: number;
  maintenanceCost: number;
  tcoValue: number;
  status: "draft" | "pending_approval" | "approved" | "published" | "retired" | "pending_clarification";
  creator: string;
  createdDate: string;
  lastModified: string;
  approver1: string;
  approver2: string;
}

const baseSampleData: TCORecord[] = [
  {
    id: "TCO-2024-001",
    version: 3,
    terminal: "APM Terminal Rotterdam",
    region: "Europe",
    equipmentType: "RTG Crane",
    oem: "Konecranes",
    model: "RTG-E3000",
    technicalLife: 25,
    assetCost: 2500000,
    operatingCost: 180000,
    maintenanceCost: 95000,
    tcoValue: 7375000,
    status: "approved",
    creator: "Sarah Chen",
    createdDate: "2024-01-15",
    lastModified: "2024-09-20",
    approver1: "Michael Berg",
    approver2: "Lisa Anderson",
  },
  {
    id: "TCO-2024-002",
    version: 1,
    terminal: "Port Elizabeth Terminal",
    region: "Africa",
    equipmentType: "STS Crane",
    oem: "ZPMC",
    model: "STS-9000",
    technicalLife: 30,
    assetCost: 15000000,
    operatingCost: 425000,
    maintenanceCost: 280000,
    tcoValue: 36150000,
    status: "pending_approval",
    creator: "David Kim",
    createdDate: "2024-09-25",
    lastModified: "2024-09-28",
    approver1: "Pending",
    approver2: "Pending",
  },
  {
    id: "TCO-2024-003",
    version: 2,
    terminal: "Mumbai Gateway Terminal",
    region: "Asia",
    equipmentType: "Reach Stacker",
    oem: "Kalmar",
    model: "DRG450",
    technicalLife: 15,
    assetCost: 850000,
    operatingCost: 65000,
    maintenanceCost: 42000,
    tcoValue: 2455000,
    status: "published",
    creator: "Priya Sharma",
    createdDate: "2024-02-10",
    lastModified: "2024-08-15",
    approver1: "John Williams",
    approver2: "Emma Thompson",
  },
  {
    id: "TCO-2024-004",
    version: 1,
    terminal: "Los Angeles Terminal",
    region: "Americas",
    equipmentType: "AGV",
    oem: "Toyota",
    model: "AGV-T500",
    technicalLife: 20,
    assetCost: 3200000,
    operatingCost: 95000,
    maintenanceCost: 68000,
    tcoValue: 6460000,
    status: "draft",
    creator: "Carlos Rodriguez",
    createdDate: "2024-09-30",
    lastModified: "2024-09-30",
    approver1: "N/A",
    approver2: "N/A",
  },
  {
    id: "TCO-2024-005",
    version: 1,
    terminal: "Singapore Terminal",
    region: "Asia",
    equipmentType: "Straddle Carrier",
    oem: "Kalmar",
    model: "SC-600",
    technicalLife: 18,
    assetCost: 1800000,
    operatingCost: 125000,
    maintenanceCost: 72000,
    tcoValue: 5346000,
    status: "pending_clarification",
    creator: "Wei Zhang",
    createdDate: "2024-09-18",
    lastModified: "2024-09-29",
    approver1: "Michael Berg",
    approver2: "Pending",
  },
];

const sampleData: TCORecord[] = Array.from({ length: 25 }, (_, i) => {
  const baseIndex = i % baseSampleData.length;
  const base = baseSampleData[baseIndex];
  const num = String(i + 1).padStart(3, '0');
  return {
    ...base,
    id: `TCO-2024-${num}`,
    version: Math.floor(Math.random() * 4) + 1,
    createdDate: `2024-${String(Math.floor(Math.random() * 9) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    lastModified: `2024-${String(Math.floor(Math.random() * 3) + 7).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  };
});

export default function TCORecords() {
  const [showWizard, setShowWizard] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [equipmentFilter, setEquipmentFilter] = useState<string>("all");
  const [sortColumn, setSortColumn] = useState<keyof TCORecord | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(100);

  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    version: true,
    terminal: true,
    region: true,
    equipmentType: true,
    oem: true,
    model: true,
    technicalLife: true,
    assetCost: true,
    operatingCost: false,
    maintenanceCost: false,
    tcoValue: true,
    status: true,
    creator: true,
    createdDate: true,
    lastModified: false,
    approver1: false,
    approver2: false,
  });

  const handleSort = (column: keyof TCORecord) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const regions = Array.from(new Set(sampleData.map((r) => r.region)));
  const equipmentTypes = Array.from(new Set(sampleData.map((r) => r.equipmentType)));

  let filteredData = sampleData.filter((record) => {
    const matchesSearch = Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesRegion = regionFilter === "all" || record.region === regionFilter;
    const matchesEquipment = equipmentFilter === "all" || record.equipmentType === equipmentFilter;

    return matchesSearch && matchesStatus && matchesRegion && matchesEquipment;
  });

  if (sortColumn) {
    filteredData = [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const handleColumnToggle = (column: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">TCO Records</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track Total Cost of Ownership calculations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExport}
            data-testid="button-export"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowWizard(true)} data-testid="button-create-tco">
            <Plus className="h-4 w-4 mr-2" />
            Create TCO
          </Button>
        </div>
      </div>

      {/* Filters and Controls */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by TCO ID, terminal, equipment, or creator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-tco"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              data-testid="button-toggle-filters"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" data-testid="button-columns">
                  <Columns3 className="h-4 w-4 mr-2" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-lg">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(visibleColumns).map(([key, value]) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={value}
                    onCheckedChange={() => handleColumnToggle(key as keyof typeof visibleColumns)}
                    data-testid={`checkbox-column-${key}`}
                  >
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {showFilters && (
            <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/50 rounded-md">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger data-testid="select-status-filter">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending_approval">Pending Approval</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending_clarification">Pending Clarification</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Region
                </label>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger data-testid="select-region-filter">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Equipment Type
                </label>
                <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
                  <SelectTrigger data-testid="select-equipment-filter">
                    <SelectValue placeholder="All Equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Equipment</SelectItem>
                    {equipmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStatusFilter("all");
                    setRegionFilter("all");
                    setEquipmentFilter("all");
                    setSearchTerm("");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p data-testid="text-results-summary">
          Showing {paginatedData.length} of {filteredData.length} records
        </p>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Data Table */}
      <Card className="shadow-lg">
        <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-card border-b-2">
              <TableRow className="hover:bg-transparent">
                {visibleColumns.id && (
                  <TableHead className="sticky left-0 bg-card z-30 min-w-[140px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover-elevate"
                      onClick={() => handleSort("id")}
                      data-testid="button-sort-id"
                    >
                      TCO ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.version && (
                  <TableHead className="min-w-[90px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover-elevate"
                      onClick={() => handleSort("version")}
                    >
                      Version
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.terminal && (
                  <TableHead className="min-w-[200px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover-elevate"
                      onClick={() => handleSort("terminal")}
                    >
                      Terminal
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.region && <TableHead className="min-w-[120px]">Region</TableHead>}
                {visibleColumns.equipmentType && <TableHead className="min-w-[140px]">Equipment</TableHead>}
                {visibleColumns.oem && <TableHead className="min-w-[120px]">OEM</TableHead>}
                {visibleColumns.model && <TableHead className="min-w-[130px]">Model</TableHead>}
                {visibleColumns.technicalLife && (
                  <TableHead className="min-w-[120px]">Tech Life (Yrs)</TableHead>
                )}
                {visibleColumns.assetCost && (
                  <TableHead className="min-w-[140px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover-elevate"
                      onClick={() => handleSort("assetCost")}
                    >
                      Asset Cost
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.operatingCost && (
                  <TableHead className="min-w-[140px]">Operating Cost</TableHead>
                )}
                {visibleColumns.maintenanceCost && (
                  <TableHead className="min-w-[150px]">Maintenance Cost</TableHead>
                )}
                {visibleColumns.tcoValue && (
                  <TableHead className="min-w-[150px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover-elevate"
                      onClick={() => handleSort("tcoValue")}
                    >
                      TCO Value
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.status && <TableHead className="min-w-[160px]">Status</TableHead>}
                {visibleColumns.creator && <TableHead className="min-w-[140px]">Creator</TableHead>}
                {visibleColumns.createdDate && (
                  <TableHead className="min-w-[120px]">Created</TableHead>
                )}
                {visibleColumns.lastModified && (
                  <TableHead className="min-w-[130px]">Last Modified</TableHead>
                )}
                {visibleColumns.approver1 && (
                  <TableHead className="min-w-[140px]">Approver L1</TableHead>
                )}
                {visibleColumns.approver2 && (
                  <TableHead className="min-w-[140px]">Approver L2</TableHead>
                )}
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((record) => (
                <TableRow
                  key={record.id}
                  className="hover-elevate cursor-pointer"
                  data-testid={`row-tco-${record.id}`}
                >
                  {visibleColumns.id && (
                    <TableCell
                      className="sticky left-0 bg-card font-mono font-semibold"
                      data-testid={`text-id-${record.id}`}
                    >
                      {record.id}
                    </TableCell>
                  )}
                  {visibleColumns.version && (
                    <TableCell className="font-mono">v{record.version}</TableCell>
                  )}
                  {visibleColumns.terminal && <TableCell>{record.terminal}</TableCell>}
                  {visibleColumns.region && (
                    <TableCell className="text-muted-foreground">{record.region}</TableCell>
                  )}
                  {visibleColumns.equipmentType && <TableCell>{record.equipmentType}</TableCell>}
                  {visibleColumns.oem && (
                    <TableCell className="text-muted-foreground">{record.oem}</TableCell>
                  )}
                  {visibleColumns.model && (
                    <TableCell className="font-mono text-sm">{record.model}</TableCell>
                  )}
                  {visibleColumns.technicalLife && (
                    <TableCell className="font-mono">{record.technicalLife}</TableCell>
                  )}
                  {visibleColumns.assetCost && (
                    <TableCell className="font-mono font-semibold">
                      ${record.assetCost.toLocaleString()}
                    </TableCell>
                  )}
                  {visibleColumns.operatingCost && (
                    <TableCell className="font-mono">
                      ${record.operatingCost.toLocaleString()}
                    </TableCell>
                  )}
                  {visibleColumns.maintenanceCost && (
                    <TableCell className="font-mono">
                      ${record.maintenanceCost.toLocaleString()}
                    </TableCell>
                  )}
                  {visibleColumns.tcoValue && (
                    <TableCell
                      className="font-mono font-bold text-lg"
                      data-testid={`text-tco-${record.id}`}
                    >
                      ${record.tcoValue.toLocaleString()}
                    </TableCell>
                  )}
                  {visibleColumns.status && (
                    <TableCell>
                      <StatusBadge status={record.status} />
                    </TableCell>
                  )}
                  {visibleColumns.creator && (
                    <TableCell className="text-muted-foreground">{record.creator}</TableCell>
                  )}
                  {visibleColumns.createdDate && (
                    <TableCell className="text-muted-foreground">{record.createdDate}</TableCell>
                  )}
                  {visibleColumns.lastModified && (
                    <TableCell className="text-muted-foreground">{record.lastModified}</TableCell>
                  )}
                  {visibleColumns.approver1 && (
                    <TableCell className="text-muted-foreground">{record.approver1}</TableCell>
                  )}
                  {visibleColumns.approver2 && (
                    <TableCell className="text-muted-foreground">{record.approver2}</TableCell>
                  )}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          data-testid={`button-actions-${record.id}`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="shadow-lg">
                        <DropdownMenuItem data-testid="button-view">View Details</DropdownMenuItem>
                        <DropdownMenuItem data-testid="button-edit">Edit</DropdownMenuItem>
                        <DropdownMenuItem data-testid="button-copy">
                          Copy Version
                        </DropdownMenuItem>
                        <DropdownMenuItem data-testid="button-compare">
                          Compare Versions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {record.status === "draft" && (
                          <DropdownMenuItem
                            className="text-destructive"
                            data-testid="button-delete"
                          >
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} records
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            data-testid="button-prev-page"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                );
              })
              .map((page, index, array) => (
                <>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span key={`ellipsis-${page}`} className="px-2">
                      ...
                    </span>
                  )}
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[40px]"
                    data-testid={`button-page-${page}`}
                  >
                    {page}
                  </Button>
                </>
              ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            data-testid="button-next-page"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* TCO Wizard Dialog */}
      <TCOWizardDialog open={showWizard} onOpenChange={setShowWizard} />
    </div>
  );
}
