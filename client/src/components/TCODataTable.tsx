import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreVertical, Search } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface TCORecord {
  id: string;
  version: number;
  terminal: string;
  equipmentType: string;
  oem: string;
  model: string;
  tcoValue: number;
  status: "draft" | "pending_approval" | "approved" | "published" | "retired" | "pending_clarification";
  creator: string;
  date: string;
}

interface TCODataTableProps {
  data: TCORecord[];
  onEdit?: (id: string) => void;
  onCopy?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function TCODataTable({ data, onEdit, onCopy, onDelete }: TCODataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof TCORecord | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof TCORecord) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredData = data.filter(record =>
    Object.values(record).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
    : filteredData;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-testid="input-search-records"
          />
        </div>
      </div>

      <div className="rounded-md border shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-card z-10 min-w-[120px]">
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
                <TableHead>
                  <Button variant="ghost" size="sm" className="hover-elevate" onClick={() => handleSort("version")}>
                    Version
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="hover-elevate" onClick={() => handleSort("terminal")}>
                    Terminal
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Equipment Type</TableHead>
                <TableHead>OEM</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="hover-elevate" onClick={() => handleSort("tcoValue")}>
                    TCO Value (USD)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((record) => (
                <TableRow key={record.id} className="hover-elevate" data-testid={`row-tco-${record.id}`}>
                  <TableCell className="sticky left-0 bg-card font-mono font-medium" data-testid={`text-id-${record.id}`}>
                    {record.id}
                  </TableCell>
                  <TableCell className="font-mono">v{record.version}</TableCell>
                  <TableCell>{record.terminal}</TableCell>
                  <TableCell>{record.equipmentType}</TableCell>
                  <TableCell>{record.oem}</TableCell>
                  <TableCell>{record.model}</TableCell>
                  <TableCell className="font-mono font-semibold" data-testid={`text-tco-${record.id}`}>
                    ${record.tcoValue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={record.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{record.creator}</TableCell>
                  <TableCell className="text-muted-foreground">{record.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`button-actions-${record.id}`}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="shadow-lg">
                        <DropdownMenuItem onClick={() => onEdit?.(record.id)} data-testid="button-edit">
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCopy?.(record.id)} data-testid="button-copy">
                          Copy Version
                        </DropdownMenuItem>
                        {record.status === "draft" && (
                          <DropdownMenuItem onClick={() => onDelete?.(record.id)} className="text-destructive" data-testid="button-delete">
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
      </div>
    </div>
  );
}
